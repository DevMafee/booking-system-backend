import {
  Column,
  Entity,
  JoinColumn
} from 'typeorm';
import { CommonEntity } from '../../common.entity';

@Entity('users')
export class UserEntity extends CommonEntity{
  @Column({ type:String, nullable:false })
  name: string;

  @Column({ type:String, nullable:true })
  address: string;

  @Column({type:String, nullable:false, unique: true})
  email: string;

  @Column({ type:String, nullable:false })
  password: string;

  @Column({ type:String, nullable:true })
  mobile_number: string;

  @Column({ type: String, nullable: true })
  profile_pic: string;

}
