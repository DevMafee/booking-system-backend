import { AdminUserTypeEnum } from '../../../../common/enums/admin/user-type.enum';

export class AdminAuthReturnDto{
  user_id:  string;
  userType: string;
  name: string;
  email:  string;
  profile_pic:  string;
  token:  string;
}
