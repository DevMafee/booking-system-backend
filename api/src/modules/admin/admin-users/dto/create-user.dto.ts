import { ApiProperty } from '@nestjs/swagger';
import {IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength} from 'class-validator';
import { adminUserSerialize, AdminUserTypeEnum } from '../../../../common/enums/admin/user-type.enum';
import { Transform } from 'class-transformer';

export class CreateAdminUserDto {
    @ApiProperty({type: String, description:'User Name', default: 'Md Salman Sajib'})
    @IsString()
    @MinLength(3)
    @MaxLength(200)
    name: string;

    @ApiProperty({type: String, description:'Mobile Number', default: '01971033730'})
    @IsString()
    @MaxLength(200)
    phone: string;

    @ApiProperty({type: String, description:'Email', default: 'kamrul@simecsystem.com'})
    @IsString()
    @MinLength(5)
    @MaxLength(200)
    email: string;

    @ApiProperty({ type: String, description: 'profile_pic', default: 'profile.png', required: false })
    @IsString()
    profile_pic: string;

    @ApiProperty({type: String, description:'Password', default: '123456'})
    @IsString()
    @MinLength(6)
    @MaxLength(200)
    password: string;

    @ApiProperty({type: String, description:'User Type', default: 'COUNTRY_ADMIN'})
    @IsString()
    user_type: string;

}
