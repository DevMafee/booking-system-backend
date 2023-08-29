import { EmailService } from './../../services/email.service';
import { CompanyRegistrationToSubSuperAdminEvent } from './../../event/company-auth/company-registration-to-sub-super-admin.event';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

export const COMPANY_REGISTRATION_TO_SUB_SUPER_ADMIN_LISTENER = 'company.registration.to.sub.super.admin';

@Injectable()
export class CompanyRegistrationToSubSuperAdminListener {
  constructor(public readonly emailService: EmailService) {}

  @OnEvent(COMPANY_REGISTRATION_TO_SUB_SUPER_ADMIN_LISTENER)
  handleCompanyRegistrationToSubSuperAdminEvent(event: CompanyRegistrationToSubSuperAdminEvent) {
    this.emailService.companyRegistrationToSubSuperAdminMail(
      event.receiver_email,
      event.receiver_name,
      event.company_name,
      event.company_address,
      event.mobile,
      event.country,
      event.owner_name,
      event.email,
      event.username,
      event.standards_name,
      event.postal_code,
    );
  }
}
