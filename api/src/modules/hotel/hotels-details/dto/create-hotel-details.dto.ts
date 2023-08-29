import { HotelTypeEnum } from 'src/common/enums/hotel/hotel-type.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength} from 'class-validator';

export class CreateHotelDto {
    @ApiProperty({type: String, description:'Hotel Name', default: 'Md Salman Sajib'})
    @IsString()
    @MinLength(3)
    @MaxLength(200)
    name: string;

    @ApiProperty({type: String, description:'city', default: 'Dhaka'})
    @MaxLength(250)
    @MinLength(1)
    @IsString()
    city: string;

    @ApiProperty({type: String, description:'address', default: 'Cecilia Chapman, 711-2880 Nulla St'})
    @MaxLength(250)
    @MinLength(5)
    @IsString()
    address: string;

    @ApiProperty({type: String, description:'Description', default: 'Hola! Hola! Hola! The Hosteller Goa Candolim is here. A haven of charm and allure, this beachy hostel is nestled in the heart of the upbeat Candolim district and beckons with its unique design inspired by the sun-kissed beaches and sandy turfs that draw tourists from afar. As you step inside, you are greeted by wave murals that adorn the common areas, serving as a reminder of the proximity to the azure waters just a kilometer away. Local jute baskets hang from the ceiling, casting a warm glow, signifying the lightness of spirit and the welcoming embrace of Goan hospitality. The entrance exudes Portuguese style, with glazing windows and bamboo accents, transporting you to a bygone era of colonial charm.'})
    @IsString()
    description: string;

    @ApiProperty({type: String, description:'Email', default: 'kamrul@simecsystem.com'})
    @IsString()
    @MinLength(5)
    @MaxLength(200)
    email: string;

    @ApiProperty({ type: String, description: 'mobile_number', default: 'mobile_number', required: false })
    @IsString()
    @IsOptional()
    mobile_number: string;

    @ApiProperty({ type: String, description: 'hotel_type', default: HotelTypeEnum.THREE_STAR, required: false })
    @IsString()
    @IsOptional()
    hotel_type: string;

}
