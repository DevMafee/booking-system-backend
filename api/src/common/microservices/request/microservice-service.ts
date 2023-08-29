import { ClientProxy } from '@nestjs/microservices';
import { MsRequestDto } from '../dto/request.dto';
import { MsResponseDto } from '../dto/response.dto';
import { ValidationException } from '../../exceptions/validationException';
import { HttpException } from '@nestjs/common';
import { CustomInternalServerException } from '../../exceptions/customInternalServerException';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  EnumMicroserviceRequestForm, EnumMicroserviceRequestTo,
  LogMicroserviceRequestResponseEntity,
} from '../../entities/shared/_log/log-microservice-request-response.entity';
import { timeout } from 'rxjs/operators';

type SendOption  = {
  requestTo: EnumMicroserviceRequestTo
  errorTrigger?: boolean;
}
export class MicroserviceService{
  constructor (
    @InjectRepository(LogMicroserviceRequestResponseEntity) private readonly microserviceLog: Repository<LogMicroserviceRequestResponseEntity>
  ){}
  async send(service: ClientProxy, key: string, data: MsRequestDto, option: SendOption): Promise<MsResponseDto>{
    const _request_id = data._request_id;
    const _option = {errorTrigger: true, ...option}
    try{
      this.microserviceLog.insert({
        request_id: data._request_id,
        request_from: EnumMicroserviceRequestForm.MainApi,
        request_to: _option.requestTo,
        request_key: key,
        client_request_json: JSON.stringify(data),
      }).then(()=>{})
      const request: MsResponseDto = await new Promise((resolve, reject)=>{
        service.send(key, data).pipe(timeout(60000)).subscribe(
          res=> {
            this.microserviceLog.update({
              request_id: _request_id
            },{
              client_get_response_json: JSON.stringify(res),
              client_get_response_status: res?.status,
              client_get_response_code: res?.statusCode,
              client_get_response_at: new Date().toJSON(),
            }).then(()=>{})
            resolve(res)
          },
          err=> reject(err)
        );
      })

      return request
    }catch (error){
      console.log('error........', JSON.stringify(error))
      this.microserviceLog.update({
        request_id: _request_id
      },{
        client_get_response_json: JSON.stringify(error),
        client_get_response_status: error?.status,
        client_get_response_code: error?.statusCode,
        client_get_response_at: new Date().toJSON(),
      }).then(()=>{})
      if(_option.errorTrigger){
        if(error?.status === false){
          if(error?.error?.fields?.count > 0){
            throw new ValidationException([...(error?.error?.fields?.errors || [])])
          }
          throw new HttpException((error?.error?.systems?.errors?.[0] || ''),error.statusCode)
        }else{
          throw new CustomInternalServerException('Failed, Please try again!')
        }
      } else{
        return new MsResponseDto({
          status: false,
          statusCode: 500,
          error : {
            fields : {
              count  : 0,
              errors : []
            },
            systems : {
              count  : 1,
              errors : [{
                message: 'Failed, Please try again!'
              }]
            }
          },
          message: "",
          payload : {  }
        })

      }
      console.log('error end........')
    }

  }

}
