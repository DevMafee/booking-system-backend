import {EmailService} from './../../services/email.service';
import {Injectable} from '@nestjs/common';
import {OnEvent} from '@nestjs/event-emitter';
import {AdminResetPasswordEvent} from "../../event/admin-auth/admin-reset-password.event";

export const ADMIN_RESET_PASSWORD_LISTENER = 'admin.reset.password';

@Injectable()
export class AdminResetPasswordListener {
  constructor(public readonly emailService: EmailService) {}

  @OnEvent(ADMIN_RESET_PASSWORD_LISTENER)
  handleAdminResetPasswordEvent(event: AdminResetPasswordEvent) {
    this.emailService.adminResetPasswordMail(
      event.id,
      event.receiver_email,
      event.receiver_name,
      event.reset_code
    );
  }
}
