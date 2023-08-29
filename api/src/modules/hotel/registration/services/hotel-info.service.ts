import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { HotelUserDto } from "../../../../common/dto/hotel-user.dto";
import { CustomException } from "../../../../common/exceptions/customException";
import { HotelEntity } from "src/common/entities/hotel/user/hotel.entity";

@Injectable()
export class HotelInfoService {
  constructor (
    @InjectRepository(HotelEntity) private readonly companyRepository: Repository<HotelEntity>,
  ){}
  async branchInformation(hotelUserDto: HotelUserDto): Promise<HotelEntity> {
    try {
      const companyInfo = await this.companyRepository.findOne({id:hotelUserDto.id});
      if (!companyInfo) {
        throw new NotFoundException("Company info not found");
      }

      return companyInfo;
     } catch (error) {
      throw new CustomException(error);
    }
  }

}
