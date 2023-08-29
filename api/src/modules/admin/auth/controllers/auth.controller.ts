import { Body, Controller, Get, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AdminAuthService } from '../services/auth.service';
import { PayloadResponseDTO } from '../../../../common/dto/payload-response.dto';
import { AdminAuthDto } from '../dto/auth.dto';
import { DtoValidationPipe } from '../../../../common/pipes/dtoValidation.pipe';
import {
  ApiBadRequestResponse, ApiBearerAuth,
  ApiBody,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { AuthGuard } from '../../../../common/guard/admin/auth.guard';
import { AdminUser } from '../../../../common/decorators/Admin/admin-user.decorator';
import { AdminUserDto } from '../../../../common/dto/admin-user.dto';
import { AdminAuthSwitchDto } from '../dto/auth-switch.dto';
import {PasswordForgotDto} from "../dto/password-forgot.dto";
import {PasswordRestDto} from "../dto/password-rest.dto";

@ApiTags('auth')
@Controller('v1/admin/auth')
export class AdminAuthController {
  constructor(private readonly authService: AdminAuthService) {}

  @Get('/seeder')
  async Seeder() {
    const auth = await this.authService.AllSeeder();

    return new PayloadResponseDTO({
      statusCode: HttpStatus.OK,
      message: 'Successfully logged in',
      data: { auth }
    });
  }

  @Post('/')
  @ApiResponse({ description: 'Successfully loggedin.', status: HttpStatus.OK})
  @ApiBadRequestResponse({ description:'Validation error'})
  @ApiForbiddenResponse({ description:'Invalid credentials / inactive'})
  @ApiInternalServerErrorResponse({ description:'Internal Server Error.'})
  @ApiBody({type: AdminAuthDto})
  async auth(
    @Body(new DtoValidationPipe()) authData: AdminAuthDto,
  ) {
    const auth = await this.authService.auth(authData);

    return new PayloadResponseDTO({
      statusCode: HttpStatus.OK,
      message: 'Successfully logged in',
      data: { auth }
    });
  }

  @Post('/switch')
  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard)
  @ApiResponse({ description: 'Authentication has successfully switched', status: HttpStatus.OK})
  @ApiBadRequestResponse({ description:'Validation error'})
  @ApiForbiddenResponse({ description:'Invalid credentials / inactive'})
  @ApiInternalServerErrorResponse({ description:'Internal Server Error.'})
  @ApiBody({type: AdminAuthSwitchDto})
  async authSwitch(
    @Body(new DtoValidationPipe()) authData: AdminAuthSwitchDto,
    @AdminUser() adminUser: AdminUserDto,
  ) {
    const auth = await this.authService.authSwitch(authData, adminUser);

    return new PayloadResponseDTO({
      statusCode: HttpStatus.OK,
      message: 'Authentication has successfully switched',
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
