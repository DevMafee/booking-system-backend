import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AdminAuthMiddleware} from '../../../common/middlewares/admin/admin-auth.middleware';
import {PublicLogController} from "./controllers/public-log.controller";
import {PublicLogService} from "./services/public-log.service";
import {LogApiGatewayRequestResponseEntity} from "../../../common/entities/shared/_log/log-api-gateway-request-response.entity";
import {LogMicroserviceRequestResponseEntity} from "../../../common/entities/shared/_log/log-microservice-request-response.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([LogApiGatewayRequestResponseEntity, LogMicroserviceRequestResponseEntity]),
  ],
  controllers: [PublicLogController],
  providers: [PublicLogService]
})
export class PublicLogModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AdminAuthMiddleware)
  }
}

