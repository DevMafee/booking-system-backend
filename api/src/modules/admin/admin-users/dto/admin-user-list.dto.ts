import { ApiProperty } from "@nestjs/swagger";
import PaginationBaseDTO from "src/common/dto/pagination-base.dto";
import { AdminUserTypeEnum } from '../../../../common/enums/admin/user-type.enum';

export class AdminUserListDto extends PaginationBaseDTO{
    @ApiProperty({type: String, description:'Status', default: '', required: false})
    status: string;

    @ApiProperty({type: AdminUserTypeEnum, description:'User type', default: '', required: false})
    user_type: AdminUserTypeEnum;
    
    @ApiProperty({type: String, description:'full_name', default: '', required: false})
    full_name: string;

    @ApiProperty({type: String, description:'Phone', default: '', required: false})
    phone: string;

    @ApiProperty({type: String, description:'Email', default: '', required: false})
    email: string;
}
