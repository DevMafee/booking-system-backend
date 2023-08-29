import { Body, Controller, HttpStatus, Post } from "@nestjs/common";
import { TraineeRegisterDTO } from "../dto/register.dto";
import { UserRegistrationService } from "../services/user-register.service";
import { ApiTags } from '@nestjs/swagger';
import { PayloadResponseDTO } from "src/common/dto/payload-response.dto";


@Controller('v1/user')
@ApiTags('User Registration')
export class UserRegistrationController {
  constructor(private readonly trainerRegisterService: UserRegistrationService) {}

  @Post('/register')
  async registerTrainee(@Body() traineeRegisterDTO: TraineeRegisterDTO) {
    const addedData = await this.trainerRegisterService.registerTrainee(traineeRegisterDTO);
    return new PayloadResponseDTO({
      statusCode: HttpStatus.OK,
      message: 'Successfully Registered',
      data: {addedData}
    });
  }
}
