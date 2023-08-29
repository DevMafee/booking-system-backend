import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class IdParamDto {
    @ApiProperty({type: String, description:'ID', required:true})
    @IsString()
    @MinLength(10)
    @MaxLength(200)
    @IsNotEmpty()
    id: string;

    @ApiProperty({type: String, description:'Audit ID', required:false})
    @IsString()
    @IsOptional()
    audit_id: string;
}
