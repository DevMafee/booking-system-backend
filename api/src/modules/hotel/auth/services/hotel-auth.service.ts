import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { HotelAuthDto } from '../dto/auth.dto';
import { CustomException } from '../../../../common/exceptions/customException';
import * as jwt from 'jsonwebtoken';
import { HOTEL_JWT_SECRET } from '../../../../common/configs/config';
import * as bcrypt from 'bcrypt';
import { PasswordForgotDto } from "../dto/password-forgot.dto";
import { PasswordResetsEntity } from "../../../../common/entities/shared/password-reset/password-resets.entity";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { COMPANY_RESET_PASSWORD_LISTENER } from "../../../../observer/listener/company-auth/company-reset-password.listener";
import { CompanyResetPasswordEvent } from "../../../../observer/event/company-auth/company-reset-password.event";
import { PasswordRestDto } from "../dto/password-rest.dto";
import currentDate from "../../../../common/utilities/currentDate";
import { HotelEntity } from 'src/common/entities/hotel/user/hotel.entity';

@Injectable()
export class HotelAuthService {
  constructor(
    @InjectRepository(HotelEntity) private readonly hotelRepository: Repository<HotelEntity>,
    @InjectRepository(PasswordResetsEntity) private readonly passwordResetsRepository: Repository<PasswordResetsEntity>,
    private eventEmitter: EventEmitter2,
  ) {
  }

  async auth(auth: HotelAuthDto): Promise<{ id: string, token: string }> {
    try {
      //find user with identifier
      const user = await this.hotelRepository.findOne({email: auth.identifier});

      //if not found throw an error
      if (!user) throw new ForbiddenException('Invalid Credentials');

      //if inactive then throw an error
      if (user.status === 0) throw new ForbiddenException('You are inactive, please contact with admin');

      //check password is valid
      const match = await bcrypt.compare(auth.password, user.password)

      //if not match then throw an error
      if (!match) throw new ForbiddenException('Invalid Credentials');

      //token generate
      const token = this.login(user);
      const id = user.id;

      //return userType & token
      return {
        id,
        token
      }
    } catch (error) {
      // throw the error to custom exception
      throw new CustomException(error);
    }
  }

  login(user: HotelEntity): string {
    const payload = {id: user.id, hotel_id: user.id, user_type: 'hotel'};
    return jwt.sign(payload, HOTEL_JWT_SECRET);
  }

  async passwordForgot(passwordForgotDto: PasswordForgotDto) {

    try {
      const {identifier} = passwordForgotDto;
      const findUser = await this.hotelRepository.findOne({email: identifier});
      const date = currentDate();

      if (findUser) {
        // user_type = 1 is company user
        const findResetCode = await this.passwordResetsRepository.findOne({
          is_used: 0,
          userId: findUser.id,
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
              receiver_email: findUser.email,
              receiver_name: findUser.name,
              reset_code: findResetCode.reset_code,
            }),
          );

          return findResetCode.id;
        } else {
          const code = Math.floor(100000 + Math.random() * 900000);
          const resetCode = await this.passwordResetsRepository.save({
            userId: findUser.id,
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
              receiver_email: findUser.email,
              receiver_name: findUser.name,
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
        await this.hotelRepository.update(
          {id: findUser.userId}, {password: passwordBcrypt}
        );
        await this.passwordResetsRepository.update(
          {id: id}, {is_used: 1}
        );

        const user = await this.hotelRepository.findOne({
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
