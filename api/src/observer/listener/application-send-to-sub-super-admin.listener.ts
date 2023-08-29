import { EmailService } from './../services/email.service';
import { ApplicationSendToSubSuperAdminEvent } from './../event/application-send-to-sub-super-admin.event';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

export const APPLICATION_SEND_TO_SUB_SUPER_ADMIN_LISTENER = 'application.send.to.sub.super.admin';

@Injectable()
export class ApplicationSendToSubSuperAdminListener {
  constructor(public readonly emailService: EmailService) {}

  @OnEvent(APPLICATION_SEND_TO_SUB_SUPER_ADMIN_LISTENER)
  handleApplicationSendToSubSuperAdminEvent(event: ApplicationSendToSubSuperAdminEvent) {
    this.emailService.applicationSendToSubSuperAdminMail(
      event.application_id,
      event.receiver_email,
      event.receiver_name,
      event.company_name,
      event.company_address,
      event.mobile,
    );
  }
}
