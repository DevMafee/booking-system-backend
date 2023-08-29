import { MailSendingService } from '../../../common/services/mai-service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileUploadService } from '../../../common/services/file-upload.service';
import { HotelEntity } from 'src/common/entities/hotel/user/hotel.entity';
import { AdminHotelsService } from './services/hotels.service';
import { AdminHotelsController } from './controllers/hotels.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([HotelEntity]),
  ],
  controllers: [AdminHotelsController],
  providers: [AdminHotelsService, MailSendingService, FileUploadService]
})
export class AdminHotelsModule {}
