import {EmailService} from './../../services/email.service';
import {Injectable} from '@nestjs/common';
import {OnEvent} from '@nestjs/event-emitter';
import {CompanyEmailUserNameChangeEvent} from "../../event/company-auth/company-email-username-change.event";

export const COMPANY_EMAIL_USERNAME_CHANGE_LISTENER = 'company.email.username.change';

@Injectable()
export class CompanyEmailUserNameChangeListener {
  constructor(public readonly emailService: EmailService) {}

  @OnEvent(COMPANY_EMAIL_USERNAME_CHANGE_LISTENER)
  handleCompanyEmailUserNameChangeEvent(event: CompanyEmailUserNameChangeEvent) {
    this.emailService.companyEmailUserNameChangeMail(
      event.receiver_email,
      event.email_update,
      event.username_update,
      event.new_email,
      event.new_username
    );
  }
}
