import { ApiProperty } from "@nestjs/swagger";
import PaginationBaseDTO from "src/common/dto/pagination-base.dto";

export class HotelListDto extends PaginationBaseDTO{
    @ApiProperty({type: String, description:'Status', default: '', required: false})
    status: string;

    @ApiProperty({type: String, description:'full_name', default: '', required: false})
    name: string;

    @ApiProperty({type: String, description:'city', default: '', required: false})
    city: string;
}
