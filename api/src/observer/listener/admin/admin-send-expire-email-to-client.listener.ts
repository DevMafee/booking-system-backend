import {EmailService} from './../../services/email.service';
import {Injectable} from '@nestjs/common';
import {OnEvent} from '@nestjs/event-emitter';
import { AdminExpireEmailToClientEvent } from '../../event/admin/admin-expire-email-to-client.event'

export const ADMIN_SEND_EXPIRE_EMAIL_TO_CLIENT_LISTENER = 'admin.expire.email.client';

@Injectable()
export class AdminExpireEmailToClientListener {
  constructor(public readonly emailService: EmailService) {}

  @OnEvent(ADMIN_SEND_EXPIRE_EMAIL_TO_CLIENT_LISTENER)
  handleAdminExpireEmailToClientEvent(event: AdminExpireEmailToClientEvent) {
    this.emailService.adminExpireMessageSendToClientMail(
      event.receiver_email,
      event.company_name,
      event.valid_till,
      event.receiver_name,
      event.standard,
      event.is_gots,
    );
  }
}
