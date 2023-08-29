import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import { Connection, Repository } from 'typeorm';
import { TraineeRegisterDTO} from "../dto/register.dto";
import {CustomException} from "src/common/exceptions/customException";
import {ValidationException} from "src/common/exceptions/validationException";
import * as bcrypt from 'bcrypt';
import { UserEntity } from "src/common/entities/front/user/user.entity";

@Injectable()
export class UserRegistrationService {
  constructor (
    @InjectRepository(UserEntity) private readonly traineeRepository: Repository<UserEntity>,
    private connection: Connection
  ){}
  async registerTrainee(traineeRegisterDTO: TraineeRegisterDTO) {
    try {
      const { name, address, email, mobile_number, password } = traineeRegisterDTO;
      const hashedPassword = await bcrypt.hash(password, 12);
      const traineeRegister = new UserEntity();
      traineeRegister.name = name;
      traineeRegister.address = address;
      traineeRegister.email = email;
      traineeRegister.mobile_number = mobile_number;
      traineeRegister.password = hashedPassword;

      //find Existing trainee
      const findExistingUserName = await this.traineeRepository.findOne({email});

      if (findExistingUserName){
        // throw an exception
        throw new ValidationException([{
          field: 'email',
          message: "User Name already exists."
        }])
      }


      return await this.connection.transaction(async manager => {
        const trainer = await manager.getRepository<UserEntity>(this.connection.getMetadata(UserEntity).tableName).save(traineeRegister)
        return trainer;
      });
    } catch (error) {
      throw new CustomException(error);
    }
  }

}
