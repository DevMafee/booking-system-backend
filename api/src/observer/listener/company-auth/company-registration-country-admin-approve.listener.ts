import { EmailService } from './../../services/email.service';
import { CompanyRegistrationCountryAdminApproveEvent } from './../../event/company-auth/company-registration-country-admin-approve.event';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

export const COMPANY_REGISTRATION_COUNTRY_ADMIN_APPROVE_LISTENER = 'company.registration.country.admin.approve';

@Injectable()
export class CompanyRegistrationCountryAdminApproveListener {
  constructor(public readonly emailService: EmailService) {}

  @OnEvent(COMPANY_REGISTRATION_COUNTRY_ADMIN_APPROVE_LISTENER)
  handleCompanyRegistrationCountryAdminApproveEvent(event: CompanyRegistrationCountryAdminApproveEvent) {
    this.emailService.companyRegistrationCountryAdminApproveEventMail(
      event.receiver_email,
      event.receiver_name,
      event.sender_name,
      event.sender_mobile,
      event.username
    );
  }
}
