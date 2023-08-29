import {Body, Controller, HttpStatus, Post} from '@nestjs/common';
import {HotelAuthService} from '../services/hotel-auth.service';
import {PayloadResponseDTO} from '../../../../common/dto/payload-response.dto';
import {DtoValidationPipe} from '../../../../common/pipes/dtoValidation.pipe';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {PasswordForgotDto} from "../dto/password-forgot.dto";
import {PasswordRestDto} from "../dto/password-rest.dto";
import { HotelAuthDto } from '../dto/auth.dto';

@ApiTags('Hotel Auth')
@Controller('v1/hotel/auth')
export class HotelAuthController {
  constructor(private readonly authService: HotelAuthService) {}

  @Post('/')
  @ApiResponse({ description: 'Successfully loggedin.', status: HttpStatus.OK})
  @ApiBadRequestResponse({ description:'Validation error'})
  @ApiForbiddenResponse({ description:'Invalid credentials / inactive'})
  @ApiInternalServerErrorResponse({ description:'Internal Server Error.'})
  @ApiBody({type: HotelAuthDto})
  async auth(
    @Body(new DtoValidationPipe()) authData: HotelAuthDto,
  ) {
    const auth = await this.authService.auth(authData);

    return new PayloadResponseDTO({
      statusCode: HttpStatus.OK,
      message: 'Successfully logged in',
      data: { auth }
    });
  }

  @Post('/password_forgot')
  @ApiResponse({ description: 'We have e-mailed your password reset link.', status: HttpStatus.OK})
  async passwordForgot(
    @Body(new DtoValidationPipe()) passwordForgotDto: PasswordForgotDto,
  ) {
    const passwordForgot = await this.authService.passwordForgot(passwordForgotDto);

    return new PayloadResponseDTO({
      statusCode: HttpStatus.OK,
      message: 'We have e-mailed your password reset link',
      data: { id: passwordForgot }
    });
  }

  @Post('/password_reset')
  @ApiResponse({ description: 'Password reset success.', status: HttpStatus.OK})
  async passwordReset(
    @Body(new DtoValidationPipe()) passwordRestDto: PasswordRestDto,
  ) {
    const passwordRest = await this.authService.passwordReset(passwordRestDto);

    return new PayloadResponseDTO({
      statusCode: HttpStatus.OK,
      message: 'Password reset success',
      data: { passwordRest }
    });
  }




}
