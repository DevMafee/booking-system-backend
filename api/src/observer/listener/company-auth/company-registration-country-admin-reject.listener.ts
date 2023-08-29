import { EmailService } from './../../services/email.service';
import { CompanyRegistrationCountryAdminRejectEvent } from './../../event/company-auth/company-registration-country-admin-reject.event';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

export const COMPANY_REGISTRATION_COUNTRY_ADMIN_REJECT_LISTENER = 'company.registration.country.admin.reject';

@Injectable()
export class CompanyRegistrationCountryAdminRejectListener {
  constructor(public readonly emailService: EmailService) {}

  @OnEvent(COMPANY_REGISTRATION_COUNTRY_ADMIN_REJECT_LISTENER)
  handleCompanyRegistrationCountryAdminRejectEvent(event: CompanyRegistrationCountryAdminRejectEvent) {
    this.emailService.companyRegistrationCountryAdminRejectEventMail(
      event.receiver_email,
      event.receiver_name,
      event.sender_name,
      event.sender_mobile
    );
  }
}
