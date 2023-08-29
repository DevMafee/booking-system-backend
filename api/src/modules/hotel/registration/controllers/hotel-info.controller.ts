import { Controller, Get, HttpStatus, UseGuards,} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags} from '@nestjs/swagger';
import { HotelAuthGuard} from 'src/common/guard/hotel/auth.guard';
import { HotelUser} from "../../../../common/decorators/Hotel/hotel-user.decorator";
import { HotelUserDto } from "../../../../common/dto/hotel-user.dto";
import { PayloadResponseDTO} from "../../../../common/dto/payload-response.dto";
import { HotelInfoService} from "../services/hotel-info.service";

@Controller('v1/hotel/info')
@ApiTags('Hotel Information')
@UseGuards(HotelAuthGuard)
@ApiBearerAuth('JWT')
export class HotelInfoController {
  constructor(private readonly hotelInfoService: HotelInfoService) {}

  // Fetch All Buyer
  @Get()
  @ApiResponse({ description: 'Get Branch information', status: HttpStatus.OK})
  async branchInformation(
    @HotelUser() hotelUserDto: HotelUserDto,
  ) {
    const companyInfo = await this.hotelInfoService.branchInformation(hotelUserDto);
    return new PayloadResponseDTO({
      statusCode: HttpStatus.OK,
      message: 'Company information',
      data: {companyInfo}
    });
  }
}
