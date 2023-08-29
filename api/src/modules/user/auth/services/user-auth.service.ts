import { UserEntity } from '../../../../common/entities/front/user/user.entity';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {  TraineeAuthDto } from '../dto/auth.dto';
import { CustomException } from '../../../../common/exceptions/customException';
import * as jwt from 'jsonwebtoken';
import { USER_JWT_SECRET } from '../../../../common/configs/config';
import * as bcrypt from 'bcrypt';
import { PasswordForgotDto } from "../dto/password-forgot.dto";
import { PasswordResetsEntity } from "../../../../common/entities/shared/password-reset/password-resets.entity";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { COMPANY_RESET_PASSWORD_LISTENER } from "../../../../observer/listener/brand/company-reset-password.listener";
import { CompanyResetPasswordEvent } from "../../../../observer/event/brand/company-reset-password.event";
import { PasswordRestDto } from "../dto/password-rest.dto";
import currentDate from "../../../../common/utilities/currentDate";

@Injectable()
export class UserAuthService {
  constructor(
    @InjectRepository(UserEntity) private readonly traineeRepository: Repository<UserEntity>,
    @InjectRepository(PasswordResetsEntity) private readonly passwordResetsRepository: Repository<PasswordResetsEntity>,
    private eventEmitter: EventEmitter2,
  ) {
  }

  async auth(auth: TraineeAuthDto): Promise<{ id: string, token: string }> {
    try {
      //find trainee with identifier
      const trainee = await this.traineeRepository.findOne({email: auth.identifier});

      //if not found throw an error
      if (!trainee) throw new ForbiddenException('Invalid Credentials');

      //if inactive then throw an error
      if (trainee.status === 0) throw new ForbiddenException('You are inactive, please contact with admin');

      //check password is valid
      const match = await bcrypt.compare(auth.password, trainee.password)

      //if not match then throw an error
      if (!match) throw new ForbiddenException('Invalid Credentials');

      //token generate
      const token = this.login(trainee);
      const id = trainee.id;

      //return userType & token
      return {
        id: trainee.id,
        token
      }
    } catch (error) {
      // throw the error to custom exception
      throw new CustomException(error);
    }
  }

  login(trainee: UserEntity): string {
    const payload = {id: trainee.id};
    return jwt.sign(payload, USER_JWT_SECRET);
  }

  async passwordForgot(passwordForgotDto: PasswordForgotDto) {

    try {
      const {identifier} = passwordForgotDto;
      const trainee = await this.traineeRepository.findOne({email: identifier});
      const date = currentDate();

      if (trainee) {
        // user_type = 1 is company user
        const findResetCode = await this.passwordResetsRepository.findOne({
          is_used: 0,
          userId: trainee.id,
          user_type: 1
        });

        if (findResetCode) {
          await this.passwordResetsRepository.update(
            {id: findResetCode.id}, {
              created_at: date,
              updated_at: date
            }
          );

          // send reset password OTP
          this.eventEmitter.emit(
            COMPANY_RESET_PASSWORD_LISTENER,
            new CompanyResetPasswordEvent({
              id: findResetCode.id,
              receiver_email: trainee.email,
              receiver_name: trainee.name,
              reset_code: findResetCode.reset_code,
            }),
          );

          return findResetCode.id;
        } else {
          const code = Math.floor(100000 + Math.random() * 900000);
          const resetCode = await this.passwordResetsRepository.save({
            userId: trainee.id,
            user_type: 1,
            is_used: 0,
            reset_code: code,
            created_at: date
          });

          // send reset password OTP
          this.eventEmitter.emit(
            COMPANY_RESET_PASSWORD_LISTENER,
            new CompanyResetPasswordEvent({
              id: resetCode.id,
              receiver_email: trainee.email,
              receiver_name: trainee.name,
              reset_code: code,
            }),
          );

          return resetCode.id;
        }
      } else {
        throw new ForbiddenException('User not found');
      }
    } catch (error) {
      throw new CustomException(error);
    }
  }

  async passwordReset(passwordRestDto: PasswordRestDto) {

    try {
      const {id, reset_code, password} = passwordRestDto;
      const findUser = await this.passwordResetsRepository.findOne({id: id, user_type: 1, is_used: 0});

      if (!findUser) {
        throw new ForbiddenException('User not found');
      }

      if (findUser.reset_code != reset_code) {
        throw new ForbiddenException('OTP not matched. please try another');
      }

      const resetCodeTimeVerification = await this.passwordResetsRepository.findOne({
       where: {
         id: id,
         user_type: 1,
        //  created_at: Raw(alias=> `${alias} >= 'NOW() - INTERVAL 10 MINUTE'`)
       }
      });

      if (resetCodeTimeVerification) {
        const salt = bcrypt.genSaltSync(10);
        const passwordBcrypt = bcrypt.hashSync(password, salt);
        await this.traineeRepository.update(
          {id: findUser.userId}, {password: passwordBcrypt}
        );
        await this.passwordResetsRepository.update(
          {id: id}, {is_used: 1}
        );

        const user = await this.traineeRepository.findOne({
          where: {id: findUser.userId}
        });

        return {
          username: user.email
        }
      } else {
        throw new ForbiddenException('Reset code expired');
      }

      throw new ForbiddenException('Something went wrong found. please Try again');
    } catch (error) {
      throw new CustomException(error);
    }
  }


}
