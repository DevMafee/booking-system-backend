import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { CommonEntity } from '../../common.entity';
import { HotelDetailsEntity } from './hotel-details.entity';
import { HotelRoomDetailsEntity } from './hotel-rooms.entity';

@Entity('hotel_room_numbers')
export class HotelRoomNumberEntity extends CommonEntity{
  @Column({ type: String, nullable: false })
  room_number: string;

  @Column({ type: Boolean, nullable: false, default: false })
  is_booked: boolean;

  @Column({ type: String, nullable: true, default: null })
  booked_dates: string;

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

  @Column({
    type: String,
    name: 'room_id',
    nullable: true,
    length: 36
  })
  room_id: string;

  @ManyToOne((type) => HotelRoomDetailsEntity, (room) => room.id)
  @JoinColumn({ name: 'room_id' })
  room_info: HotelRoomDetailsEntity;

}
