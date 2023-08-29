import { Module } from "@nestjs/common";
import { UserAuthModule } from "./auth/user-auth.module";
import { UserRegistrationModule } from "./registration/user-registration.module";


export const UserModuleList = [
  UserAuthModule,
  UserRegistrationModule
];
@Module({
  imports: UserModuleList,
})
export class UserModule {}
