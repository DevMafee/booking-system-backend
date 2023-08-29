import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LogMicroserviceRequestResponseEntity } from '../../entities/shared/_log/log-microservice-request-response.entity';

export class MicroserviceLogService{
  constructor (
    @InjectRepository(LogMicroserviceRequestResponseEntity) private readonly logMicroservice: Repository<LogMicroserviceRequestResponseEntity>,
  ){}
  async requestLogStore(){
    console.log('Hello ->>>>>>>>>>>>>>>>>>>> LogMicroserviceRequestResponseEntity');
  }
}
