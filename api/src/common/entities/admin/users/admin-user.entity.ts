import {
  Column,
  Entity,
  ManyToOne,
} from 'typeorm';
import { AdminUserTypeEnum } from '../../../enums/admin/user-type.enum';
import { CommonEntity } from '../../common.entity';

@Entity('admin_users')
export class AdminUserEntity extends CommonEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  phone: string;

  @Column({ type: String, nullable: true })
  email: string;

  @Column({ type: String, nullable: true })
  profile_pic: string;

  @Column({ nullable: true })
  password: string;

  @Column({
    type: String,
    default: AdminUserTypeEnum.GENERAL_EMPLOYEE,
  })
  user_type: string;
}
