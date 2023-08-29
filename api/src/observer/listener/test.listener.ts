import { EmailService } from './../services/email.service';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { TestEvent } from '../event/test.event';

export const TEST_LISTENER = 'test';

@Injectable()
export class TestListener {
  constructor(
    public readonly emailService: EmailService,
  ) {}

  @OnEvent(TEST_LISTENER)
  handleTestEvent(event: TestEvent) {
    this.emailService.testMail(
      event.receiver_email,
      event.message,
    );
  }
}
