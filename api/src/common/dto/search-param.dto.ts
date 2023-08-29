import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class SearchParamDto {
    @ApiProperty({type: String, description:'ID', required:true})
    @IsString()
    @MinLength(10)
    @MaxLength(200)
    @IsNotEmpty()
    id: string;

    @ApiProperty({type: String, description:'Product Category ID', required:false})
    @IsString()
    @IsOptional()
    product_category_id: string;
}
