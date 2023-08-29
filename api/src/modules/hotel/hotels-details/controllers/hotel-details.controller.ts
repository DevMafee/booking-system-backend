import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { DtoValidationPipe } from 'src/common/pipes/dtoValidation.pipe';
import { Pagination } from 'src/common/decorators/pagination.decorator';
import { PaginationDto } from 'src/common/dto/Pagination.dto';
import { PayloadResponseDTO } from 'src/common/dto/payload-response.dto';
import { EntityManager, TransactionManager } from 'typeorm';
import { HotelsService } from '../services/hotel-details.service';
import { HotelListDto } from '../dto/hotel-details-list.dto';
import { HotelAuthGuard } from 'src/common/guard/hotel/auth.guard';
import { HotelUser } from 'src/common/decorators/Hotel/hotel-user.decorator';
import { HotelUserDto } from 'src/common/dto/hotel-user.dto';
import { CreateHotelDto } from '../dto/create-hotel-details.dto';

@Controller('v1/hotel/hotels')
@ApiTags('Hotels')
@UseGuards(HotelAuthGuard)
@ApiBearerAuth('JWT')
@ApiUnauthorizedResponse({ description: 'Invalid Credential' })
export class HotelsController {
  constructor(private readonly hotelService: HotelsService) {}

  // Fetch All Hotels
  @Get()
  @ApiResponse({ description: 'Get All Hotels', status: HttpStatus.OK})
  async findAll(
    @HotelUser() hotelUserDto: HotelUserDto,
    @Query() filter: HotelListDto,
    @Pagination() pagination: PaginationDto
  ) {
    const [hotels, total] = await this.hotelService.findAll(filter, pagination);
    return new PayloadResponseDTO({
      statusCode: HttpStatus.OK,
      message: 'All Hotels Fetched',
      metadata: {
        page: pagination.page,
        totalCount: total,
        limit: pagination.limit,
      },
      data: { hotels }
    });
  }

  // Fetch Only Active Data
  @Get('/list')
  @ApiResponse({ description: 'Get Only Active Hotels', status: HttpStatus.OK})
  async findAllList() {
    const hotels = await this.hotelService.findAllList();
    return new PayloadResponseDTO({
      statusCode: HttpStatus.OK,
      message: 'All Active Hotels',
      data: { hotels }
    });
  }

  // Fetch Only Active Data
  @Post()
  @ApiResponse({ description: 'Create Hotel Details', status: HttpStatus.OK})
  async createHotelDetails(
    @Body(new DtoValidationPipe()) createHotelDto: CreateHotelDto,
    @HotelUser() hotelUserDto: HotelUserDto,
  ) {    
    const hotelDetail = await this.hotelService.createHotelDetails(hotelUserDto, createHotelDto);
    return new PayloadResponseDTO({
      statusCode: HttpStatus.OK,
      message: 'Create Hotel Details',
      data: { hotelDetail }
    });
  }
}
