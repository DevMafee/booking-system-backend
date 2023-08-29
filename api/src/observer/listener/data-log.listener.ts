import { DataLogService } from './../services/data-log.service';
import { DataLogEvent } from './../event/data-log.event';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

export const DATA_LOG_LISTENER = 'data.log';

@Injectable()
export class DataLogEventListener {
  constructor(public readonly dataLogService: DataLogService) {}

  @OnEvent(DATA_LOG_LISTENER)
  handleQuotationSendToCompanyEvent(event: DataLogEvent) {
    this.dataLogService.dataLog(
      event.log_id,
      event.sub_log_id,
      event.action_type,
      event.action_for,
      event.action_user_type,
      event.created_by,
      event.company_user_created_by,
      event.data,
    );
  }
}
