import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class ApplicationIdParamDto {
    @ApiProperty({type: String, description:'Application Id'})
    @IsString()
    @MinLength(10)
    @MaxLength(200)
    application_id: string;
}
