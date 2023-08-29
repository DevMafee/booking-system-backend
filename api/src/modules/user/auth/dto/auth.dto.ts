import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class TraineeAuthDto{
  @ApiProperty({type: String, description:'Login identifier', default: 'email@gmail.com'})
  @MaxLength(200)
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  identifier: string;

  @ApiProperty({type: String, description:'User Password', default: '123456'})
  @MaxLength(200)
  @MinLength(6)
  @IsString()
  @IsNotEmpty()
  password: string;
}
