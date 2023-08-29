import { Transport } from '@nestjs/microservices';
import { ClientProviderOptions } from '@nestjs/microservices/module/interfaces/clients-module.interface';

const fileServiceGeneratorConfig: ClientProviderOptions = {
  name: 'FILE_GENERATOR_SERVICE',
  transport: Transport.REDIS,
  options: {
    url: process.env.FILE_GENERATOR_REDIS_QUEUE,
  },
}
export default fileServiceGeneratorConfig;
