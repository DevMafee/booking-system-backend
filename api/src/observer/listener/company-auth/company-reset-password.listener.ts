import { EmailService } from './../../services/email.service';
import { CompanyResetPasswordEvent } from './../../event/company-auth/company-reset-password.event';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

export const COMPANY_RESET_PASSWORD_LISTENER = 'company.reset.password';

@Injectable()
export class CompanyResetPasswordListener {
  constructor(public readonly emailService: EmailService) {}

  @OnEvent(COMPANY_RESET_PASSWORD_LISTENER)
  handleCompanyResetPasswordEvent(event: CompanyResetPasswordEvent) {
    this.emailService.companyResetPasswordMail(
      event.id,
      event.receiver_email,
      event.receiver_name,
      event.reset_code
    );
  }
}
