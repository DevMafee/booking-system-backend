import { AuthGuard } from 'src/common/guard/admin/auth.guard';
import {
  Controller,
  Get, HttpStatus
} from '@nestjs/common';
import { UserTypesService } from '../services/user-types.service';
import { ApiResponse, ApiTags, ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { PayloadResponseDTO } from 'src/common/dto/payload-response.dto';

@Controller('v1/public/user-types')
@ApiTags('Admin User Types')
@ApiBearerAuth('JWT')
@ApiUnauthorizedResponse({description: 'Invalid Credential'})
export class UserTypesController {
  constructor(private readonly userTypesService: UserTypesService) {}

  // Fetch Only Active User Type
  @Get('')
  @ApiResponse({ description: 'Get Only Active User Type', status: HttpStatus.OK})
  async findForDropdown() {
    const usertypes = await this.userTypesService.findAllList();
    return new PayloadResponseDTO({
      statusCode: HttpStatus.OK,
      message: 'All Active User Type Fetched',
      data: { usertypes }
    });
  }
}
