import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dto/Pagination.dto';
import { CustomException } from 'src/common/exceptions/customException';
import { Connection, EntityManager, Equal, In, Like, Not, Raw, Repository } from 'typeorm';
import { CreateHotelDto } from '../dto/create-hotel-details.dto';
import { FileUploadService } from '../../../../common/services/file-upload.service';
import { HotelEntity } from 'src/common/entities/hotel/user/hotel.entity';
import { HotelListDto } from '../dto/hotel-details-list.dto';
import { HotelDetailsEntity } from 'src/common/entities/shared/hotel-details/hotel-details.entity';
import { HotelRoomDetailsEntity } from 'src/common/entities/shared/hotel-details/hotel-rooms.entity';
import { HotelRoomNumberEntity } from 'src/common/entities/shared/hotel-details/hotel-room-numbers.entity';
import { HotelRoomDetailPhotoEntity } from 'src/common/entities/shared/hotel-details/hotel-room-photos.entity';
import { HotelUserDto } from 'src/common/dto/hotel-user.dto';
import { IdParamDto } from '../dto/id-param.dto';
import { CreateHotelRoomDto } from '../dto/room-detail-create.dto';

@Injectable()
export class HotelRoomsService {
  constructor (
    @InjectRepository(HotelEntity) private readonly hotelRepository: Repository<HotelEntity>,
    @InjectRepository(HotelDetailsEntity) private readonly hotelDetailRepository: Repository<HotelDetailsEntity>,
    @InjectRepository(HotelRoomDetailsEntity) private readonly roomDetailRepository: Repository<HotelRoomDetailsEntity>,
    @InjectRepository(HotelRoomNumberEntity) private readonly roomNumberRepository: Repository<HotelRoomNumberEntity>,
    @InjectRepository(HotelRoomDetailPhotoEntity) private readonly roomPhotoRepository: Repository<HotelRoomDetailPhotoEntity>,
    private fileUploadService: FileUploadService,
    private connection: Connection,
  ){}

  async createHotelRoomDetails(param: IdParamDto, hotelUserDto: HotelUserDto, createHotelRoomDto: CreateHotelRoomDto) {
    try {
      const details = new HotelRoomDetailsEntity();
      details.name = createHotelRoomDto.name;
      details.room_type = createHotelRoomDto.room_type;
      details.description = createHotelRoomDto.description;
      details.max_people = createHotelRoomDto.max_people;
      details.price = createHotelRoomDto.price;
      details.hotel_id = param.id;
      details.created_by = hotelUserDto.id;
      const data = await this.connection.transaction(async (manager:EntityManager) => {
        const hotelRoom = await manager.getRepository<HotelRoomDetailsEntity>(this.connection.getMetadata(HotelRoomDetailsEntity).tableName).save(details);
        const roomNumbers = createHotelRoomDto.room_numbers
        if(roomNumbers.length>0){
          await Promise.all(roomNumbers.map(async roomNumber=>{
            const number = new HotelRoomNumberEntity();
            number.room_number = roomNumber;
            number.hotel_id = param.id;
            number.room_id = hotelRoom.id;
            await manager.getRepository<HotelRoomNumberEntity>(this.connection.getMetadata(HotelRoomNumberEntity).tableName).save(number);
          }))
        }
        const roomPhotos = createHotelRoomDto.room_photos
        if(roomPhotos.length>0){
          await Promise.all(roomPhotos.map(async roomPhoto=>{
            const photo = new HotelRoomDetailPhotoEntity();
            photo.photo = roomPhoto;
            photo.hotel_id = param.id;
            photo.room_id = hotelRoom.id;
            const savedPhoto = await manager.getRepository<HotelRoomDetailPhotoEntity>(this.connection.getMetadata(HotelRoomDetailPhotoEntity).tableName).save(photo);
            if(savedPhoto){
              const exist = this.fileUploadService.IsExistsTempFile(roomPhoto);
              console.log('exist', exist);
              
            }
          }))
        }

        return hotelRoom;
      })

      // Return Fetched Data
      return data;
    } catch (error) {
      console.log('Error', error);
      throw new CustomException(error);
    }
  }
}
