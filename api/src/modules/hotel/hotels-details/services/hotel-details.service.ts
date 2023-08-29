import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dto/Pagination.dto';
import { CustomException } from 'src/common/exceptions/customException';
import { Connection, Equal, In, Like, Not, Raw, Repository } from 'typeorm';
import { CreateHotelDto } from '../dto/create-hotel-details.dto';
import { FileUploadService } from '../../../../common/services/file-upload.service';
import { HotelEntity } from 'src/common/entities/hotel/user/hotel.entity';
import { HotelListDto } from '../dto/hotel-details-list.dto';
import { HotelDetailsEntity } from 'src/common/entities/shared/hotel-details/hotel-details.entity';
import { HotelRoomDetailsEntity } from 'src/common/entities/shared/hotel-details/hotel-rooms.entity';
import { HotelRoomNumberEntity } from 'src/common/entities/shared/hotel-details/hotel-room-numbers.entity';
import { HotelRoomDetailPhotoEntity } from 'src/common/entities/shared/hotel-details/hotel-room-photos.entity';
import { HotelUserDto } from 'src/common/dto/hotel-user.dto';

@Injectable()
export class HotelsService {
  constructor (
    @InjectRepository(HotelEntity) private readonly hotelRepository: Repository<HotelEntity>,
    @InjectRepository(HotelDetailsEntity) private readonly hotelDetailRepository: Repository<HotelDetailsEntity>,
    @InjectRepository(HotelRoomDetailsEntity) private readonly roomDetailRepository: Repository<HotelRoomDetailsEntity>,
    @InjectRepository(HotelRoomNumberEntity) private readonly roomNumberRepository: Repository<HotelRoomNumberEntity>,
    @InjectRepository(HotelRoomDetailPhotoEntity) private readonly roomPhotoRepository: Repository<HotelRoomDetailPhotoEntity>,
    private connection: Connection,
  ){}

  async findAll(filter: HotelListDto, pagination: PaginationDto): Promise<[ HotelDetailsEntity[], number ]> {
    try {
      const whereCondition = {};
      //filter
      if (filter.status) whereCondition['status'] = Equal(filter.status);
      if (filter.name) whereCondition['name'] = Like(`%${filter.name}%`);
      if (filter.city) whereCondition['city'] = Equal(filter.city);

      const hotels = await this.hotelDetailRepository.find({
        order: { created_at: "DESC" },
        skip: pagination.skip,
        take: pagination.limit,
      });

      const total  = await this.hotelDetailRepository.count();

      return [hotels, total];
    } catch (error) {
      throw new CustomException(error);
    }
  }

  async findAllList() {
    try {
      // All Active Data Fetch
      return await this.hotelDetailRepository.find({ 'status':1 });
    } catch (error) {
      throw new CustomException(error);
    }
  }

  async createHotelDetails(hotelUserDto: HotelUserDto, createHotelDto: CreateHotelDto) {
    try {
      const details = new HotelDetailsEntity();
      details.name = createHotelDto.name;
      details.city = createHotelDto.city;
      details.email = createHotelDto.email;
      details.address = createHotelDto.address;
      details.mobile_number = createHotelDto.mobile_number;
      details.description = createHotelDto.description;
      details.hotel_type = createHotelDto.hotel_type;
      details.created_by = hotelUserDto.id;
      const hotelDetail = await this.hotelDetailRepository.save(details);

      // Return Fetched Data
      return hotelDetail;
    } catch (error) {
      console.log('Error', error);
      throw new CustomException(error);
    }
  }
}
