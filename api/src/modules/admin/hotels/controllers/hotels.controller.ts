import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guard/admin/auth.guard';
import { DtoValidationPipe } from 'src/common/pipes/dtoValidation.pipe';
import { Pagination } from 'src/common/decorators/pagination.decorator';
import { PaginationDto } from 'src/common/dto/Pagination.dto';
import { PayloadResponseDTO } from 'src/common/dto/payload-response.dto';
import { AdminUserDto } from 'src/common/dto/admin-user.dto';
import { AdminUser } from 'src/common/decorators/Admin/admin-user.decorator';
import { EntityManager, TransactionManager } from 'typeorm';
import { AdminHotelsService } from '../services/hotels.service';
import { AdminBranchsListDto } from '../dto/branch-list.dto';

@Controller('v1/admin/hotels')
@ApiTags('Admin Hotels')
@UseGuards(AuthGuard)
@ApiBearerAuth('JWT')
@ApiUnauthorizedResponse({ description: 'Invalid Credential' })
export class AdminHotelsController {
  constructor(private readonly adminBranchesService: AdminHotelsService) {}

  // Fetch All users
  @Get()
  @ApiResponse({ description: 'Get All Users', status: HttpStatus.OK})
  async findAll(
    @AdminUser() adminUser: AdminUserDto,
    @Query() filter: AdminBranchsListDto,
    @Pagination() pagination: PaginationDto
  ) {
    const [branches, total] = await this.adminBranchesService.findAll(filter, pagination);
    return new PayloadResponseDTO({
      statusCode: HttpStatus.OK,
      message: 'All Branche Fetched',
      metadata: {
        page: pagination.page,
        totalCount: total,
        limit: pagination.limit,
      },
      data: { branches }
    });
  }

  // Fetch Only Active Data
  @Get('/list')
  @ApiResponse({ description: 'Get Only Active Users', status: HttpStatus.OK})
  async findAllList() {
    const [branches, c] = await this.adminBranchesService.findAllList();
    return new PayloadResponseDTO({
      statusCode: HttpStatus.OK,
      message: 'All Active Branche Fetched',
      data: { branches }
    });
  }
}
