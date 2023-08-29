import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CustomException} from '../../../../common/exceptions/customException';
import {LogApiGatewayRequestResponseEntity} from "../../../../common/entities/shared/_log/log-api-gateway-request-response.entity";
import {PaginationDto} from "../../../../common/dto/Pagination.dto";
import {LogMicroserviceRequestResponseEntity} from "../../../../common/entities/shared/_log/log-microservice-request-response.entity";
import {MailTestDto} from "../dto/mail-test.dto";
import {MailSendingService} from "../../../../common/services/mai-service";
import {APPLICATION_SEND_TO_SUB_SUPER_ADMIN_LISTENER} from "../../../../observer/listener/application-send-to-sub-super-admin.listener";
import {ApplicationSendToSubSuperAdminEvent} from "../../../../observer/event/application-send-to-sub-super-admin.event";
import {TEST_LISTENER, TestListener} from "../../../../observer/listener/test.listener";
import {TestEvent} from "../../../../observer/event/test.event";
import {EventEmitter2} from "@nestjs/event-emitter";

@Injectable()
export class PublicLogService {
  constructor (
    @InjectRepository(LogApiGatewayRequestResponseEntity) private readonly logApiGatewayRepository: Repository<LogApiGatewayRequestResponseEntity>,
    @InjectRepository(LogMicroserviceRequestResponseEntity) private readonly logMicroserviceRepository: Repository<LogMicroserviceRequestResponseEntity>,
    private eventEmitter: EventEmitter2,
    ){}

  async findApiGatewayLog(pagination: PaginationDto): Promise<[LogApiGatewayRequestResponseEntity[], number]> {
    try {

      const apiGatewayLog = await this.logApiGatewayRepository.find({
        order: {requested_at: "DESC"},
        skip: pagination.skip,
        take: pagination.limit,
      });

      const total  = await this.logApiGatewayRepository.count();

      return [apiGatewayLog, total];
    } catch (error) {
      throw new CustomException(error);
    }
  }

  async findApiMicroserviceLog(pagination: PaginationDto): Promise<[LogMicroserviceRequestResponseEntity[], number]> {
    try {

      const apiMicroserviceLog = await this.logMicroserviceRepository.find({
        order: {client_send_request_at: "DESC"},
        skip: pagination.skip,
        take: pagination.limit,
      });

      const total  = await this.logMicroserviceRepository.count();

      return [apiMicroserviceLog, total];
    } catch (error) {
      throw new CustomException(error);
    }
  }

  async mailTest(mailTestDto: MailTestDto) {
    try {
      this.eventEmitter.emit(
        TEST_LISTENER,
        new TestEvent({
          receiver_email: mailTestDto.receiver_email,
          message: mailTestDto.message,
        }),
      );

      return true;
    } catch (error) {
      throw new CustomException(error);
    }
  }
}
