import { UserEntity } from '../../../common/entities/front/user/user.entity';
import { Module } from '@nestjs/common';
import { UserAuthService } from './services/user-auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAuthController } from './controllers/user-auth.controller';
import {PasswordResetsEntity} from "../../../common/entities/shared/password-reset/password-resets.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, PasswordResetsEntity]),
  ],
  controllers: [UserAuthController],
  providers: [UserAuthService,]
})
export class UserAuthModule {}
