import { EmailService } from './../../services/email.service';
import { CompanyRegistrationWelcomeEvent } from './../../event/company-auth/company-registration-welcome.event';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

export const COMPANY_REGISTRATION_WELCOME_LISTENER = 'company.registration.welcome';

@Injectable()
export class CompanyRegistrationWelcomeListener {
  constructor(public readonly emailService: EmailService) {}

  @OnEvent(COMPANY_REGISTRATION_WELCOME_LISTENER)
  handleCompanyRegistrationToSubSuperAdminEvent(event: CompanyRegistrationWelcomeEvent) {
    this.emailService.companyRegistrationWelcomeMail(
      event.receiver_email,
      event.receiver_name
    );
  }
}
