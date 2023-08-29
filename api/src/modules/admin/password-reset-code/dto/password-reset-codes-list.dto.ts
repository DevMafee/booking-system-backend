import { ApiProperty } from '@nestjs/swagger';
import PaginationBaseDTO from 'src/common/dto/pagination-base.dto';

export class RoleListDto extends PaginationBaseDTO{
    @ApiProperty(
        {
            type: Number,
            description:'Active/Inactive',
            default: '',
            required: false
        }
    )
    is_used: number;

}
