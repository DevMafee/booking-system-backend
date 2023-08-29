import { ApiProperty } from "@nestjs/swagger";
import {IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength} from 'class-validator';
import { Transform } from 'class-transformer';
import { adminUserSerialize, AdminUserTypeEnum } from '../../../../common/enums/admin/user-type.enum';

export class UpdateAdminUserDto {
    @ApiProperty({type: String, description:'User Full Name', default: 'Md Salman Sajib'})
    @IsString()
    @IsOptional()
    full_name: string;

    @ApiProperty({type: String, description:'Mobile Number', default: '01971033730'})
    @IsString()
    @IsOptional()
    phone: string;

    @ApiProperty({type: String, description:'Email', default: 'kamrul@simecsystem.com'})
    @IsString()
    @IsOptional()
    email: string;

    @ApiProperty({ type: String, description: 'profile_pic', default: 'profile.png', required: false })
    @IsString()
    @IsOptional()
    profile_pic: string;

    @ApiProperty({type: String, description:'User Type', default: 'COUNTRY_ADMIN'})
    @IsString()
    @IsOptional()
    user_type: string;
}
