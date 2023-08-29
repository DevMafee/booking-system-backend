import { Controller, Get, Post, Body, Put, Patch, Param, Delete, UseGuards, HttpStatus, Query} from '@nestjs/common';
import { AuthGuard } from '../../../../common/guard/admin/auth.guard';
import { ApiBearerAuth, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { PayloadResponseDTO } from 'src/common/dto/payload-response.dto';
import { Pagination } from 'src/common/decorators/pagination.decorator';
import { PaginationDto } from 'src/common/dto/Pagination.dto';
import { PasswordResetService } from "../services/password-reset-code.service";
import { RoleListDto } from "../dto/password-reset-codes-list.dto";

@Controller('v1/admin/resetcodes')
@ApiTags('Password Reset Codes')
@UseGuards(AuthGuard)
@ApiBearerAuth('JWT')
@ApiUnauthorizedResponse({description: 'Invalid Credential'})
export class PasswordResetController {
  constructor(private readonly passwordResetService: PasswordResetService) {}

  // Fetch All Password Reset Codes
  @Get()
  @ApiResponse({ description: 'Get All Role', status: HttpStatus.OK})
  async findAll() {
    const resetcodes = await this.passwordResetService.findAll();
    
    return new PayloadResponseDTO({
      statusCode: HttpStatus.OK,
      message: 'All Password Reset Codes Fetched',
      data: { resetcodes }
    });
  }
}
