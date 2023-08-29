import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, MaxLength, MinLength} from 'class-validator';
import { RoomTypeEnum } from 'src/common/enums/hotel/room-type.enum';

export class CreateHotelRoomDto {
    @ApiProperty({type: String, description:'Hotel Name', default: 'Md Salman Sajib'})
    @IsString()
    @MinLength(3)
    @MaxLength(200)
    name: string;

    @ApiProperty({type: String, description:'description', default: 'Dhaka'})
    @MaxLength(250)
    @MinLength(1)
    @IsString()
    description: string;

    @ApiProperty({type: String, description:'room_type', default: RoomTypeEnum.FAMILY})
    @IsString()
    room_type: string;

    @ApiProperty({type: Number, description:'Description', default: 500})
    @IsNumber()
    price: number;

    @ApiProperty({type: Number, description:'max_people', default: 3})
    @IsNumber()
    max_people: number;

    @ApiProperty({
        type: Array,
        description: 'Room Numbers',
        default: ['201', '202', '203'],
        required: false,
    })
    @IsOptional()
    room_numbers: string[];

    @ApiProperty({
        type: Array,
        description: 'Room Photos',
        default: ['1693306066533-1f20efbc-25bc-428c-883c-4d70473eef61.jpg', '1693306066533-1f20efbc-25bc-428c-883c-4d70473eef61.jpg'],
        required: false,
    })
    @IsOptional()
    room_photos: string[];

}
