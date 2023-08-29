import { PartialType } from '@nestjs/mapped-types';
import { TraineeRegisterDTO } from './register.dto';

export class UpdateTrainerDto extends PartialType(TraineeRegisterDTO) {}
