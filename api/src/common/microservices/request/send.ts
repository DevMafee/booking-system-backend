import { ClientProxy } from '@nestjs/microservices';
import { MsRequestDto } from '../dto/request.dto';
import { MsResponseDto } from '../dto/response.dto';
import { HttpException } from '@nestjs/common';
import { ValidationException } from '../../exceptions/validationException';
import { CustomInternalServerException } from '../../exceptions/customInternalServerException';

export default async function clientProxySend(service: ClientProxy, key: string, data: MsRequestDto, errorTrigger=true): Promise<MsResponseDto>{
  try{
    const request: MsResponseDto = await new Promise((resolve, reject)=>{
      service.send(key, data).subscribe(
        res=> resolve(res),
        err=> reject(err)
      );
    })

    return request
  }catch (error){
    if(errorTrigger){
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
  }

}
