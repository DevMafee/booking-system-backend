import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { DtoValidationPipe } from 'src/common/pipes/dtoValidation.pipe';
import { Pagination } from 'src/common/decorators/pagination.decorator';
import { PaginationDto } from 'src/common/dto/Pagination.dto';
import { PayloadResponseDTO } from 'src/common/dto/payload-response.dto';
import { EntityManager, TransactionManager } from 'typeorm';
import { HotelListDto } from '../dto/hotel-details-list.dto';
import { HotelAuthGuard } from 'src/common/guard/hotel/auth.guard';
import { HotelUser } from 'src/common/decorators/Hotel/hotel-user.decorator';
import { HotelUserDto } from 'src/common/dto/hotel-user.dto';
import { CreateHotelDto } from '../dto/create-hotel-details.dto';
import { IdParamDto } from '../dto/id-param.dto';
import { HotelRoomsService } from '../services/hotel-detail-rooms.service';
import { CreateHotelRoomDto } from '../dto/room-detail-create.dto';

@Controller('v1/hotel/rooms')
@ApiTags('Hotel Rooms')
@UseGuards(HotelAuthGuard)
@ApiBearerAuth('JWT')
@ApiUnauthorizedResponse({ description: 'Invalid Credential' })
export class HotelRoomsController {
  constructor(private readonly hotelRoomService: HotelRoomsService) {}

  // Fetch Only Active Data
  @Post('/:id')
  @ApiResponse({ description: 'Create Hotel Room Details', status: HttpStatus.OK})
  async createHotelRoomDetails(
    @Param() param: IdParamDto,
    @Body(new DtoValidationPipe()) createHotelRoomDto: CreateHotelRoomDto,
    @HotelUser() hotelUserDto: HotelUserDto,
  ) {    
    const hotelDetail = await this.hotelRoomService.createHotelRoomDetails(param, hotelUserDto, createHotelRoomDto);
    return new PayloadResponseDTO({
      statusCode: HttpStatus.OK,
      message: 'Create Hotel Details',
      data: { hotelDetail }
    });
  }
}
