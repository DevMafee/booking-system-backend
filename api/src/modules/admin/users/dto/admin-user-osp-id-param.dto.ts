import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class AdminUserOspIdParamDto {
    @ApiProperty({type: String, description:'User OSP Id'})
    @IsString()
    @MinLength(10)
    @MaxLength(200)
    osp_id: string;
}
