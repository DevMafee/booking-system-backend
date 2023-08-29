import {Body, Controller, HttpStatus, Post} from "@nestjs/common";
import {HotelRegisterDTO} from "../dto/hotel-register.dto";
import {HotelRegisterService} from "../services/hotel-register.service";
import {ApiTags} from '@nestjs/swagger';
import {PayloadResponseDTO} from "src/common/dto/payload-response.dto";


@Controller('v1/hotel')
@ApiTags('Hotel Registration')
export class HotelRegisterController {
  constructor(private readonly hotelRegisterService: HotelRegisterService) {}
  @Post('/register')
  async registerNewCompany(@Body() hotelRegisterDTO: HotelRegisterDTO) {
    const addedData = await this.hotelRegisterService.registerCompany(hotelRegisterDTO);
    return new PayloadResponseDTO({
      statusCode: HttpStatus.OK,
      message: 'Successfully Registered',
      data: {addedData}
    });
  }
}
