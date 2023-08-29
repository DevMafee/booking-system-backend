import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class IdParamDto {
    @ApiProperty({type: String, description:'Id'})
    @IsString()
    id: string;
}
