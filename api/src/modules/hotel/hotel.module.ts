import { Module } from '@nestjs/common';
import { HotelAuthModule } from './auth/hotel-auth.module';
import { HotelRegistrationModule } from './registration/hotel-registration.module';
import { HotelDetailsModule } from './hotels-details/hotel-details.module';


export const HotelModuleList = [
  HotelAuthModule,
  HotelRegistrationModule,
  HotelDetailsModule,
];
@Module({
  imports: HotelModuleList,
})
export class HotelModule {}
