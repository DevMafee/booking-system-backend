import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength} from "class-validator";

export class TraineeRegisterDTO {
    @ApiProperty({type: String, description:'Trainer Name', default: 'Owner'})
    @MaxLength(200)
    @MinLength(3)
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({type: String, description:'Trainer Address', default: '55 Shah Mokhdum Avenue'})
    @MaxLength(250)
    @MinLength(3)
    @IsString()
    @IsNotEmpty()
    address: string;

    @ApiProperty({type: String, description:'Trainer Email', default: 'email@gmail.com'})
    @MaxLength(250)
    @MinLength(3)
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({type: String, description:'User Name', default: 'username001'})
    @MaxLength(250)
    @MinLength(3)
    @IsString()
    password: string;

    @ApiProperty({type: String, description:'Company Mobile Number', default: '881911033730'})
    @MaxLength(250)
    @MinLength(3)
    @IsString()
    @IsNotEmpty()
    mobile_number: string;
}
