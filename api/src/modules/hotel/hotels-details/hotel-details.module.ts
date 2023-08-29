import { MailSendingService } from '../../../common/services/mai-service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileUploadService } from '../../../common/services/file-upload.service';
import { HotelEntity } from 'src/common/entities/hotel/user/hotel.entity';
import { HotelsService } from './services/hotel-details.service';
import { HotelsController } from './controllers/hotel-details.controller';
import { HotelDetailsEntity } from 'src/common/entities/shared/hotel-details/hotel-details.entity';
import { HotelRoomDetailsEntity } from 'src/common/entities/shared/hotel-details/hotel-rooms.entity';
import { HotelRoomDetailPhotoEntity } from 'src/common/entities/shared/hotel-details/hotel-room-photos.entity';
import { HotelRoomNumberEntity } from 'src/common/entities/shared/hotel-details/hotel-room-numbers.entity';
import { HotelRoomsController } from './controllers/hotel-detail-rooms.controller';
import { HotelRoomsService } from './services/hotel-detail-rooms.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([HotelEntity, HotelDetailsEntity, HotelRoomDetailsEntity, HotelRoomDetailPhotoEntity, HotelRoomNumberEntity]),
  ],
  controllers: [HotelsController, HotelRoomsController],
  providers: [HotelsService, HotelRoomsService, MailSendingService, FileUploadService]
})
export class HotelDetailsModule {}
