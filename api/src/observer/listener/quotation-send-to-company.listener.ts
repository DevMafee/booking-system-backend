import { EmailService } from './../services/email.service';
import { QuotationSendToCompanyEvent } from './../event/quotation-send-to-company.event';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

export const QUOTATION_SEND_TO_COMPANY_LISTENER = 'quotation.send.to.company';

@Injectable()
export class QuotationSendToCompanyListener {
  constructor(public readonly emailService: EmailService) {}

  @OnEvent(QUOTATION_SEND_TO_COMPANY_LISTENER)
  handleQuotationSendToCompanyEvent(event: QuotationSendToCompanyEvent) {
    this.emailService.quotationSendToCompanyMail(
      event.receiver_email,
      event.attachFile,
    );
  }
}
