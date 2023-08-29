import { Module } from '@nestjs/common';
import { AdminAuthService } from './services/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminUserEntity } from '../../../common/entities/admin/users/admin-user.entity';
import { AdminAuthController } from './controllers/auth.controller';
import {PasswordResetsEntity} from "../../../common/entities/shared/password-reset/password-resets.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminUserEntity, PasswordResetsEntity]),
  ],
  controllers: [AdminAuthController],
  providers: [AdminAuthService,]
})
export class AdminAuthModule {}
