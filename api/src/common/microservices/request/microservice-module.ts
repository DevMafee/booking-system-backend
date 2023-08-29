import { Global, Module } from '@nestjs/common';
import { MicroserviceService } from './microservice-service';
import { MicroserviceLogService } from '../log/microservice-log-service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogMicroserviceRequestResponseEntity } from '../../entities/shared/_log/log-microservice-request-response.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Global()
@Module({
  exports: [MicroserviceService],
  imports: [
    ClientsModule.register([
      {
        name: 'FILE_GENERATOR_SERVICE',
        transport: Transport.REDIS,
        options: {
          url: 'redis://localhost:6379',
        },
      },
    ]),
    TypeOrmModule.forFeature([LogMicroserviceRequestResponseEntity]),
  ],
  providers: [
    MicroserviceService,
    MicroserviceLogService,
  ]
})
export class MicroserviceModule {}
