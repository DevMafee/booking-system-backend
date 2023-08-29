import { Module } from '@nestjs/common';
import { AdminAuthModule } from './auth/auth.module';
import { PasswordResetModule } from './password-reset-code/password-reset-code.module';
import { AdminFrontUserModule } from './users/admin-front-user.module';
import { AdminHotelsModule } from './hotels/hotels.module';
import { AdminUsersModule } from './admin-users/admin-users.module';

export const AdminModuleList = [
  AdminAuthModule,
  AdminUsersModule,
  AdminHotelsModule,
  AdminFrontUserModule,
  PasswordResetModule,
];
@Module({
  imports: AdminModuleList,
})
export class AdminModule {}
