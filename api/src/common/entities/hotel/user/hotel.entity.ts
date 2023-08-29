import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { AdminUserEntity } from '../../admin/users/admin-user.entity';
import { CommonEntity } from '../../common.entity';

@Entity('hotels')
export class HotelEntity extends CommonEntity{
  @Column({ type: String, nullable: false })
  owner_name: string;

  @Column({ type: String, nullable: false })
  name: string;

  @Column({ type: String, nullable: false })
  address: string;

  @Column({ type: String, nullable: false, unique: true })
  email: string;

  @Column({ type: String, nullable: false })
  password: string;

  @Column({ type: String, nullable: true })
  profile_pic: string;

  @Column()
  mobile_number: string;

  @Column({ default: null })
  approve_status: number;

  @Column({ default: null })
  approved_at: Date;

  @Column({ default: null })
  rejected_at: Date;

  @Column({
    type: String,
    name: 'action_by',
    nullable: true,
  })
  action_by: string;

  @Column({
    type: String,
    name: 'action_comment',
    nullable: true,
  })
  action_comment: string;

  @ManyToOne((type) => AdminUserEntity, (admin) => admin.id)
  @JoinColumn({ name: 'action_by' })
  admin_info: AdminUserEntity;
}
