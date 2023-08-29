import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { RoomTypeEnum } from 'src/common/enums/hotel/room-type.enum';
import { CommonEntity } from '../../common.entity';
import { HotelDetailsEntity } from './hotel-details.entity';
import { HotelRoomDetailPhotoEntity } from './hotel-room-photos.entity';
import { HotelRoomNumberEntity } from './hotel-room-numbers.entity';

@Entity('hotel_room_details')
export class HotelRoomDetailsEntity extends CommonEntity{
  @Column({ type: String, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: String, nullable: true, default: RoomTypeEnum.FAMILY })
  room_type: string;

  @Column({ type:Number, default: 0 })
  is_featured: number;

  @Column({ type:Number, default: 0 })
  free_wifi: number;

  @Column({ type:Number, default: 0 })
  has_swimming_pool: number;

  @Column({ type:Number, default: 0 })
  rating: number;

  @Column({ type:Number, default: 0 })
  price: number;

  @Column({ type:Number, default: 0 })
  max_people: number;

  @Column({
    type: String,
    name: 'hotel_id',
    nullable: true,
    length: 36
  })
  hotel_id: string;

  @ManyToOne((type) => HotelDetailsEntity, (hotel) => hotel.id)
  @JoinColumn({ name: 'hotel_id' })
  hotel_info: HotelDetailsEntity;

  @OneToMany((type)=>HotelRoomDetailPhotoEntity, photo=>photo.room_info)
  room_photos: HotelRoomDetailPhotoEntity[]

  @OneToMany((type)=>HotelRoomNumberEntity, room_number=>room_number.room_info)
  room_number_infos: HotelRoomNumberEntity[]

}
