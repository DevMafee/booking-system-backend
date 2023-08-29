import { PartialType } from '@nestjs/mapped-types';
import { HotelRegisterDTO } from './hotel-register.dto';

export class UpdateHotelDto extends PartialType(HotelRegisterDTO) {}
