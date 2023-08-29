import { AdminUserTypeEnum } from '../enums/admin/user-type.enum';

export class AdminUserDto {
  readonly id: string;
  readonly user_type: AdminUserTypeEnum;
  readonly country_id: string;
  readonly osp_id: string;
  readonly osp_country_id: string;
}
