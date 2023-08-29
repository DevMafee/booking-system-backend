import { UserModuleList } from '../modules/user/user.module';
import { AdminModuleList } from '../modules/admin/admin.module';
import { HotelModuleList } from '../modules/hotel/hotel.module';
import { PublicModuleList } from '../modules/public/public.module';

const  ModuleList = [
  {
    url: '/admin',
    Module: AdminModuleList
  },
  {
    url: '/hotel',
    Module: HotelModuleList
  },
  {
    url: '/user',
    Module: UserModuleList
  },
  {
    url: '/public',
    Module: PublicModuleList
  }
]
export default ModuleList
