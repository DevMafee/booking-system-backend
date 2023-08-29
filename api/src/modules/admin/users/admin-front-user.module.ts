import { UserEntity } from '../../../common/entities/front/user/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminFrontUserController } from './controllers/admin-front-user.controller';
import { AdminFrontUserService } from './services/admin-front-user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [AdminFrontUserController],
  providers: [AdminFrontUserService]
})
export class AdminFrontUserModule {}
