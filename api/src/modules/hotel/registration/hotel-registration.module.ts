import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelRegisterController } from './controllers/hotel-register.controller';
import { HotelInfoController } from './controllers/hotel-info.controller';
import { HotelRegisterService } from './services/hotel-register.service';
import { HotelInfoService } from './services/hotel-info.service';
import { AdminUserEntity} from "../../../common/entities/admin/users/admin-user.entity";
import { HotelEntity } from 'src/common/entities/hotel/user/hotel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HotelEntity, AdminUserEntity])],
  controllers: [HotelRegisterController, HotelInfoController],
  providers: [HotelInfoService, HotelRegisterService],
})
export class HotelRegistrationModule {}
