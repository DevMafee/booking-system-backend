import { Module } from '@nestjs/common';
import { HotelAuthService} from './services/hotel-auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelAuthController } from './controllers/hotel-auth.controller';
import {PasswordResetsEntity} from "../../../common/entities/shared/password-reset/password-resets.entity";
import { HotelEntity } from 'src/common/entities/hotel/user/hotel.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([HotelEntity, PasswordResetsEntity]),
  ],
  controllers: [HotelAuthController],
  providers: [HotelAuthService]
})
export class HotelAuthModule {}
