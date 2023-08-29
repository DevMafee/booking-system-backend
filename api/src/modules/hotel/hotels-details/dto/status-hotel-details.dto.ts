import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";
import { StatusTypeEnum } from '../../../../common/enums/status/status.enum'

export class StatusChangeDto {
    @ApiProperty({type: Number, description:'Country Status', default: StatusTypeEnum.APPROVE})
    @IsEnum(StatusTypeEnum, {message:"Status Should be 0 or 1"})
    status: number;
}
