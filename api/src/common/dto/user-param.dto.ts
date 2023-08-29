import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class AdminIdParamDto {
    @ApiProperty({type: String, description:'User ID'})
    @IsString()
    @MinLength(10)
    @MaxLength(200)
    @IsNotEmpty()
    user_id: string;
}
