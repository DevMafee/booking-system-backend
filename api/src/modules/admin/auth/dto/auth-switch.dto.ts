import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { AdminUserTypeEnum } from '../../../../common/enums/admin/user-type.enum';

export class AdminAuthSwitchDto{
  @ApiProperty({ type: String, description: '', default: "Admin switch role", required: true })
  @IsEnum(AdminUserTypeEnum)
  role: AdminUserTypeEnum;
}
