import { EmailService } from './../../services/email.service';
import { CompanyRegistrationToCountryAdminForwardEvent } from './../../event/company-auth/company-registration-to-country-admin-forward.event';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

export const COMPANY_REGISTRATION_TO_COUNTRY_ADMIN_FORWARD_LISTENER = 'company.registration.to.country.admin.forward';

@Injectable()
export class CompanyRegistrationToCountryAdminForwardListener {
  constructor(public readonly emailService: EmailService) {}

  @OnEvent(COMPANY_REGISTRATION_TO_COUNTRY_ADMIN_FORWARD_LISTENER)
  handleCompanyRegistrationToCountryAdminForwardEvent(event: CompanyRegistrationToCountryAdminForwardEvent) {
    this.emailService.companyRegistrationToCountryAdminForwardMail(
      event.receiver_email,
      event.receiver_name,
      event.company_name,
      event.company_address,
      event.mobile,
      event.country,
      event.owner_name,
      event.email,
      event.standards_name,
      event.postal_code,
    );
  }
}
