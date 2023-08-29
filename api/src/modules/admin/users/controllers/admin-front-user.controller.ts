import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import {ApiResponse, ApiTags, ApiUnauthorizedResponse} from '@nestjs/swagger';
import {Pagination} from 'src/common/decorators/pagination.decorator';
import {PaginationDto} from 'src/common/dto/Pagination.dto';
import {PayloadResponseDTO} from 'src/common/dto/payload-response.dto';
import {AdminUserDto} from 'src/common/dto/admin-user.dto';
import {AdminUser} from 'src/common/decorators/Admin/admin-user.decorator';
import { AdminFrontUserService } from '../services/admin-front-user.service';
import { AdminTraineesListDto } from '../dto/admin-trainee-list.dto';

@Controller('v1/admin/front-users')
@ApiTags('Front Users')
// @UseGuards(AuthGuard)
// @ApiBearerAuth('JWT')
@ApiUnauthorizedResponse({ description: 'Invalid Credential' })
export class AdminFrontUserController {
  constructor(private readonly adminTraineesService: AdminFrontUserService) {}

  // Fetch All users
  @Get()
  @ApiResponse({ description: 'Get All Users', status: HttpStatus.OK})
  async findAll(
    @AdminUser() adminUser: AdminUserDto,
    @Query() filter: AdminTraineesListDto,
    @Pagination() pagination: PaginationDto
  ) {
    const [Trainees, total] = await this.adminTraineesService.findAll(filter, pagination);
    return new PayloadResponseDTO({
      statusCode: HttpStatus.OK,
      message: 'All Trainee Fetched',
      metadata: {
        page: pagination.page,
        totalCount: total,
        limit: pagination.limit,
      },
      data: { Trainees }
    });
  }

  // Fetch Only Active Data
  @Get('/list')
  @ApiResponse({ description: 'Get Only Active Users', status: HttpStatus.OK})
  async findAllList() {
    const [Trainees, c] = await this.adminTraineesService.findAllList();
    return new PayloadResponseDTO({
      statusCode: HttpStatus.OK,
      message: 'All Active Trainee Fetched',
      data: { Trainees }
    });
  }
}
