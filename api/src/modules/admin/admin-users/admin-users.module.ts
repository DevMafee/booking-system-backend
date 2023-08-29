import { MailSendingService } from '../../../common/services/mai-service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminUserEntity } from 'src/common/entities/admin/users/admin-user.entity';
import { UsersController } from './controllers/admin-users.controller';
import { AdminUsersService } from './services/admin-users.service';
import { FileUploadService } from '../../../common/services/file-upload.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminUserEntity]),
  ],
  controllers: [UsersController],
  providers: [AdminUsersService, MailSendingService, FileUploadService]
})
export class AdminUsersModule {}
