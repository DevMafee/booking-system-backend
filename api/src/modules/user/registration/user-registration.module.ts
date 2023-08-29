import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRegistrationController } from './controllers/user-register.controller';
import { UserRegistrationService } from './services/user-register.service';
import { UserEntity } from 'src/common/entities/front/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserRegistrationController],
  providers: [UserRegistrationService],
})
export class UserRegistrationModule {}
