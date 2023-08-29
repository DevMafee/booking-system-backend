import { UserEntity } from '../../../../common/entities/front/user/user.entity';
import {ForbiddenException, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {AdminUserEntity} from '../../../../common/entities/admin/users/admin-user.entity';
import {Connection, Raw, Repository} from 'typeorm';
import {AdminAuthDto} from '../dto/auth.dto';
import {CustomException} from '../../../../common/exceptions/customException';
import {ADMIN_JWT_SECRET} from '../../../../common/configs/config';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import {AdminAuthReturnDto} from '../dto/auth-return.dto';
import {AdminUserDto} from '../../../../common/dto/admin-user.dto';
import {AdminAuthSwitchDto} from '../dto/auth-switch.dto';
import currentDate from "../../../../common/utilities/currentDate";
import {PasswordForgotDto} from "../dto/password-forgot.dto";
import {EventEmitter2} from "@nestjs/event-emitter";
import {PasswordResetsEntity} from "../../../../common/entities/shared/password-reset/password-resets.entity";
import {PasswordRestDto} from "../dto/password-rest.dto";
import {AdminResetPasswordEvent} from "../../../../observer/event/admin-auth/admin-reset-password.event";
import {ADMIN_RESET_PASSWORD_LISTENER} from "../../../../observer/listener/admin/admin-reset-password.listener";
import { AdminUserSeeder, HotelUserSeeder, UserSeeder } from 'src/common/enums/seeder';
import { HotelEntity } from 'src/common/entities/hotel/user/hotel.entity';

@Injectable()
export class AdminAuthService {
  constructor (
    @InjectRepository(AdminUserEntity) private readonly adminUserRepository: Repository<AdminUserEntity>,
    @InjectRepository(PasswordResetsEntity) private readonly passwordResetsRepository: Repository<PasswordResetsEntity>,
    private eventEmitter: EventEmitter2,
    private connection: Connection,
  ){}

  async AllSeeder() {
    try {
      await this.connection.transaction(async manager => {
        // Admin User
        if(AdminUserSeeder.length>0){
          await Promise.all(AdminUserSeeder.map(async(userData)=>{
            const hashedPassword = await bcrypt.hash(userData.Password, 12);
            const adminUser = new AdminUserEntity();
            adminUser.name = userData.Name
            adminUser.email = userData.Email
            adminUser.phone = userData.Mobile
            adminUser.password = hashedPassword
            await manager.getRepository<AdminUserEntity>(this.connection.getMetadata(AdminUserEntity).tableName).save(adminUser);
          }))
        }

        // Branch User
        if(HotelUserSeeder.length>0){
          await Promise.all(HotelUserSeeder.map(async(userData)=>{
            const hashedPassword = await bcrypt.hash(userData.Password, 12);
            const adminUser = new HotelEntity();
            adminUser.owner_name = userData.OwnerName
            adminUser.name = userData.Name
            adminUser.address = userData.Address
            adminUser.email = userData.Email
            adminUser.mobile_number = userData.Mobile
            adminUser.password = hashedPassword
            await manager.getRepository<HotelEntity>(this.connection.getMetadata(HotelEntity).tableName).save(adminUser);
          }))
        }

        // Public User
        if(UserSeeder.length>0){
          await Promise.all(UserSeeder.map(async(userData)=>{
            const hashedPassword = await bcrypt.hash(userData.Password, 12);
            const adminUser = new UserEntity();
            adminUser.name = userData.Name
            adminUser.address = userData.Address
            adminUser.email = userData.Email
            adminUser.mobile_number = userData.Mobile
            adminUser.password = hashedPassword
            await manager.getRepository<UserEntity>(this.connection.getMetadata(UserEntity).tableName).save(adminUser);
          }))
        }
      })
    } catch (error) {
      throw new CustomException(error);
    }
  }
  async auth(auth: AdminAuthDto): Promise<AdminAuthReturnDto> {
    try{
      //find user with identifier
      // const user = await this.adminUserRepository.findOne({ phone: auth.identifier });
      const user = await this.adminUserRepository.findOne({ email: auth.identifier });

      //if not found throw an error
      if(!user) throw new ForbiddenException('Invalid Credentials');

      //if inactive then throw an error
      if(user.status === 0) throw new ForbiddenException('You are inactive, please contact with admin');

      //check password is valid
      const match = await bcrypt.compare(auth.password, user.password)

      //if not match then throw an error
      if(!match) throw new ForbiddenException('Invalid Credentials');

      //token generate
      const token = this.login(user,user.user_type);
      const user_id = user.id;

      //return userType & token
      return {
        user_id,
        userType: user.user_type,
        name: user.name,
        email: user.email,
        profile_pic: user.profile_pic,
        token
      }
    } catch (error) {
      // throw the error to custom exception
      throw new CustomException(error);
    }
  }

  async authSwitch(authSwitchDto: AdminAuthSwitchDto, adminUser: AdminUserDto): Promise<AdminAuthReturnDto> {
    try{
      //find user with identifier
      // const user = await this.adminUserRepository.findOne({ phone: auth.identifier });
      const user = await this.adminUserRepository.findOne({ where:{
          id: adminUser.id,
          user_type: Raw(col=> `FIND_IN_SET('${authSwitchDto.role}', ${col})`)
        }, relations:['osp_info'] });

      //if not found throw an error
      if(!user) throw new ForbiddenException('User not found.');

      //if inactive then throw an error
      if(user.status === 0) throw new ForbiddenException('You are inactive, please contact with admin');


      //token generate
      const token = this.login(user,authSwitchDto.role);
      const user_id = user.id;

      //return userType & token
      return {
        user_id,
        userType: user.user_type,
        name: user.name,
        email: user.email,
        profile_pic: user.profile_pic,
        token
      }
    } catch (error) {
      // throw the error to custom exception
      throw new CustomException(error);
    }
  }

  private login(user: AdminUserEntity, role: string): string {
    const payload = { id: user.id, user_type: role };    
    return  jwt.sign(payload, ADMIN_JWT_SECRET);
  }

  async passwordForgot(passwordForgotDto: PasswordForgotDto) {
    try {
      const {identifier} = passwordForgotDto;
      const findUser = await this.adminUserRepository.findOne({email: identifier});
      const date = currentDate();

      if (findUser) {
        // user_type = 2 is admin user
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
            ADMIN_RESET_PASSWORD_LISTENER,
            new AdminResetPasswordEvent({
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
            user_type: 2,
            is_used: 0,
            reset_code: code,
            created_at: date
          });

          // send reset password OTP
          this.eventEmitter.emit(
            ADMIN_RESET_PASSWORD_LISTENER,
            new AdminResetPasswordEvent({
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
      const findUser = await this.passwordResetsRepository.findOne({id: id, user_type: 2, is_used: 0});

      if (!findUser) {
        throw new ForbiddenException('User not found');
      }

      if (findUser.reset_code != reset_code) {
        throw new ForbiddenException('OTP not matched. please try another');
      }

      const resetCodeTimeVerification = await this.passwordResetsRepository.findOne({
        where: {
          id: id,
          user_type: 2,
          //  created_at: Raw(alias=> `${alias} >= 'NOW() - INTERVAL 10 MINUTE'`)
        }
      });

      if (resetCodeTimeVerification) {
        const salt = bcrypt.genSaltSync(10);
        const passwordBcrypt = bcrypt.hashSync(password, salt);
        await this.adminUserRepository.update(
          {id: findUser.userId}, {password: passwordBcrypt}
        );
        await this.passwordResetsRepository.update(
          {id: id}, {is_used: 1}
        );

        const user = await this.adminUserRepository.findOne({
          where: {id: findUser.userId}
        });

        return {
          email: user.email
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
