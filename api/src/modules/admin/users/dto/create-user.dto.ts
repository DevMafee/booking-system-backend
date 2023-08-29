import { ApiProperty } from '@nestjs/swagger';
import {IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength} from 'class-validator';
import { adminUserSerialize, AdminUserTypeEnum } from '../../../../common/enums/admin/user-type.enum';
import { Transform } from 'class-transformer';

export class CreateAdminUserDto {
    @ApiProperty({type: String, description:'User Full Name', default: 'Md Salman Sajib'})
    @IsString()
    @MinLength(3)
    @MaxLength(200)
    full_name: string;

    @ApiProperty({type: String, description:'Country code', default: '88'})
    @MaxLength(250)
    @MinLength(1)
    @IsString()
    country_code: string;

    @ApiProperty({type: String, description:'Country mobile number', default: '1911033730'})
    @MaxLength(250)
    @MinLength(5)
    @IsString()
    country_mobile_number: string;

    @ApiProperty({type: String, description:'Mobile Number', default: '01971033730'})
    @IsString()
    @MaxLength(200)
    phone: string;

    @ApiProperty({type: String, description:'Email', default: 'kamrul@simecsystem.com'})
    @IsString()
    @MinLength(5)
    @MaxLength(200)
    email: string;

    @ApiProperty({ type: String, description: 'Signature', default: 'signature.png', required: false })
    @IsString()
    signature: string;

    @ApiProperty({ type: String, description: 'user_number', default: '', required: false })
    @IsString()
    @IsOptional()
    user_number: string;

    @ApiProperty({ type: String, description: 'profile_pic', default: 'profile.png', required: false })
    @IsString()
    profile_pic: string;

    @ApiProperty({ type: String, description: 'upload_cv', default: 'cv.doc', required: false })
    @IsString()
    @IsOptional()
    upload_cv: string;

    @ApiProperty({type: String, description:'Country', default: '169cc6d7-6fa9-47dc-b266-8918d4593f01'})
    @IsString()
    @MinLength(20)
    @MaxLength(200)
    country_id: string;

    @ApiProperty({type: String, description:'Password', default: '123456'})
    @IsString()
    @MinLength(6)
    @MaxLength(200)
    password: string;

    @ApiProperty({type: Number, description:'Lead Auditor?', default: 0, required:false})
    @IsNumber()
    @IsOptional()
    is_lead_auditor: number;

    @ApiProperty({type: Number, description:'Team Auditor?', default: 0, required:false})
    @IsNumber()
    @IsOptional()
    is_team_auditor: number;

    @ApiProperty({type: Number, description:'Observer?', default: 0, required:false})
    @IsNumber()
    @IsOptional()
    is_observer: number;

    @ApiProperty({type: Array, description:'User Type', default: 'COUNTRY_ADMIN'})
    @IsEnum(AdminUserTypeEnum,{each:true})
    @IsArray()
    @IsNotEmpty()
    @Transform(({ value }) => {
        return adminUserSerialize(value);
    })
    user_type: AdminUserTypeEnum[];

    @ApiProperty({type: Array, description:'OSP IDS', default: [
        '90b4e826-fec2-4bda-9eca-328c90b90958'
    ]})
    @IsArray()
    @IsNotEmpty()
    osp_ids: string[];

}
