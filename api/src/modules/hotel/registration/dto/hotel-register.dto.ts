import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNotEmpty, IsString, MaxLength, MinLength} from "class-validator";

export class HotelRegisterDTO {
    @ApiProperty({type: String, description:'Hotel Owner Name', default: 'Owner Name'})
    @MaxLength(200)
    @MinLength(3)
    @IsString()
    @IsNotEmpty()
    owner_name: string;

    @ApiProperty({type: String, description:'Hotel Name', default: 'Hotel User'})
    @MaxLength(200)
    @MinLength(3)
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({type: String, description:'Hotel Address', default: '55 Shah Mokhdum Avenue'})
    @MaxLength(250)
    @MinLength(3)
    @IsString()
    @IsNotEmpty()
    address: string;

    @ApiProperty({type: String, description:'Hotel Email', default: 'hotel@gmail.com'})
    @MaxLength(250)
    @MinLength(3)
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({type: String, description:'Hotel mobile number', default: '1911033730'})
    @MaxLength(250)
    @MinLength(11)
    @IsString()
    mobile_number: string;

    @ApiProperty({type: String, description:'Password', default: '123456'})
    @MaxLength(250)
    @MinLength(8)
    @IsString()
    password: string;
}
