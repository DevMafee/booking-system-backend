import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import { Connection, Repository } from 'typeorm';
import {HotelRegisterDTO} from "../dto/hotel-register.dto";
import {CustomException} from "src/common/exceptions/customException";
import {ValidationException} from "src/common/exceptions/validationException";
import { EventEmitter2 } from '@nestjs/event-emitter';
import {AdminUserEntity} from "../../../../common/entities/admin/users/admin-user.entity";
import { HotelEntity } from "src/common/entities/hotel/user/hotel.entity";
import * as bcrypt from 'bcrypt';


@Injectable()
export class HotelRegisterService {
  constructor (
    @InjectRepository(HotelEntity) private readonly companyRepository: Repository<HotelEntity>,
    @InjectRepository(AdminUserEntity) private readonly adminUserRepository: Repository<AdminUserEntity>,
    private connection: Connection,
    private eventEmitter: EventEmitter2

  ){}
  async registerCompany(hotelRegisterDTO: HotelRegisterDTO) {
    try {
      const { owner_name, name, address, email, mobile_number, password } = hotelRegisterDTO;
      const hashedPassword = await bcrypt.hash(password, 12);
      
      const branchRegister = new HotelEntity();
      branchRegister.owner_name = owner_name;
      branchRegister.name = name;
      branchRegister.address = address;
      branchRegister.email = email;
      branchRegister.mobile_number = mobile_number;
      branchRegister.password = hashedPassword;

      //find Existing Company
      const findExistingUserName = await this.companyRepository.findOne({email});
      if (findExistingUserName){
        // throw an exception
        throw new ValidationException([{
          field: 'username',
          message: "User Name already exists."
        }])
      }
      return await this.connection.transaction(async manager => {
        return await manager.getRepository<HotelEntity>(this.connection.getMetadata(HotelEntity).tableName).save(branchRegister)
      });
    } catch (error) {
      throw new CustomException(error);
    }
  }

}
