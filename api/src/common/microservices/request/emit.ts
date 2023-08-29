import { ClientProxy } from '@nestjs/microservices';

export default async function clientProxyEmit(service: ClientProxy, key: string, data: any){
  service.emit(key, data)
}
