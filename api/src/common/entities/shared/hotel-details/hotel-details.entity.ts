import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AdminUserEntity } from '../../admin/users/admin-user.entity';
import { HotelEntity } from '../../hotel/user/hotel.entity';
import { HotelTypeEnum } from 'src/common/enums/hotel/hotel-type.enum';
import { HotelRoomDetailsEntity } from './hotel-rooms.entity';
import { HotelRoomDetailPhotoEntity } from './hotel-room-photos.entity';
import { HotelRoomNumberEntity } from './hotel-room-numbers.entity';

@Entity('hotel_details')
export class HotelDetailsEntity{
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: String, nullable: false })
  name: string;

  @Column({ type: String, nullable: false })
  city: string;

  @Column({ type: String, nullable: false })
  address: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: String, nullable: false })
  email: string;

  @Column({ type: String, nullable: false })
  mobile_number: string;

  @Column({ type: String, nullable: true, default: HotelTypeEnum.NORMAL })
  hotel_type: string;

  @Column({ type:Number, default: 0 })
  is_featured: number;

  @Column({ type:Number, default: 0 })
  rating: number;

  @Column({ type:Number, default: 0 })
  approve_status: number;

  @Column({ default: null })
  approved_at: Date;

  @Column({ default: null })
  rejected_at: Date;

  @Column({
    type: String,
    name: 'action_by',
    nullable: true,
    length: 36
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

  @Index()
  @Column({default:1})
  status: number;

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @DeleteDateColumn()
  deleted_at: Date

  @Column({
    type: String,
    name: 'created_by',
    nullable: true,
    length: 36
  })
  created_by: string;

  @ManyToOne((type) => HotelEntity, (hotel) => hotel.id)
  @JoinColumn({ name: 'created_by' })
  creator_info: HotelEntity;

  @Column({
    type: String,
    name: 'updated_by',
    nullable: true,
    length: 36
  })
  updated_by: string;

  @ManyToOne((type) => HotelEntity, (updateHotel) => updateHotel.id)
  @JoinColumn({ name: 'updated_by' })
  updator_info: HotelEntity;

  @Column({
    type: String,
    name: 'deleted_by',
    nullable: true,
    length: 36
  })
  deleted_by: string;

  @OneToMany((type)=>HotelRoomDetailsEntity, detail=>detail.hotel_info)
  room_infos: HotelRoomDetailsEntity[];

  @OneToMany((type)=>HotelRoomDetailPhotoEntity, photo=>photo.hotel_info)
  hotel_room_photos: HotelRoomDetailPhotoEntity[]

  @OneToMany((type)=>HotelRoomNumberEntity, room_number=>room_number.hotel_info)
  hotel_room_number_infos: HotelRoomNumberEntity[]
}
