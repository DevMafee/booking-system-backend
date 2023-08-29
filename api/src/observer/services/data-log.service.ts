import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {DataLogEntity} from "../../common/entities/shared/_log/data-log.entity";
import CurrentDate from "../../common/utilities/currentDate";

@Injectable()
export class DataLogService {

  constructor(@InjectRepository(DataLogEntity) private readonly dataLogRepository: Repository<DataLogEntity>) { }

  async dataLog(
    log_id: string,
    sub_log_id: string,
    action_type: string,
    action_for: string,
    action_user_type: string,
    created_by: string,
    company_user_created_by: string,
    data = {},
  ) {
    const date = CurrentDate();
    await this.dataLogRepository.save({
      log_id,
      sub_log_id,
      action_type,
      action_for,
      action_user_type,
      created_by,
      company_user_created_by,
      created_at: date,
      data: (Object.keys(data).length !== 0) ?  JSON.stringify(data) : '{}'
    });

  }

}
