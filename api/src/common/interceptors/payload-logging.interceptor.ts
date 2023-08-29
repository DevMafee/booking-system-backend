import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Inject } from '@nestjs/common';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import * as cli_color from 'cli-color';
import * as winston from 'winston';
import { LogApiGatewayRequestResponseEntity } from '../entities/shared/_log/log-api-gateway-request-response.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EnumMicroserviceRequestForm } from '../entities/shared/_log/log-microservice-request-response.entity';
import { v4 as uuidv4 } from 'uuid';
const skipLogUrl = [
  'GET:/api/v1/company/register'
];
/**
 * LoggingInterceptor Use for log every request
 * @class
 * @version 1.0.0
 * @since 1.0.0
 * @author asraful Islam <asraful009@gmail.com>
 * @copyright SIMEC System Ltd 2020
 * @global
 */
@Injectable()
export class PayloadLoggingInterceptor implements NestInterceptor {

    /**
     * @since 1.0.0
     * @name logger
     * @private
     * @constant
     */
    private readonly logger: winston.Logger;

    constructor (
      @InjectRepository(LogApiGatewayRequestResponseEntity) private readonly logService: Repository<LogApiGatewayRequestResponseEntity>
    ){}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const className  = context.getClass().name;
        const methodName = context.getHandler().name;
        const ctx        = context.switchToHttp();
        const statusCode = context.switchToHttp().getResponse()["statusCode"];
        const request    = ctx.getRequest();
        console.log('\x1b[36m%s\x1b[0m', `${className}@${methodName} -> ${request.originalUrl}`);
        const _request_id = uuidv4();
        request['_request_id'] = _request_id;
        const body = {...request['body']};
        if(body.password) body.password="•••••••••••••"
        if(body.confirm_password) body.confirm_password="•••••••••••••"
        this.logService.insert({
            request_id: _request_id,
            url: request['originalUrl'],
            method: request['method'],
            request_json: JSON.stringify(body),
            host_internal_info_json: JSON.stringify({ className, methodName }),
        }).then(()=>{})


        const response   = ctx.getResponse<Response>();
        const { rawHeaders, httpVersion, method, socket, url } = request;
        const { remoteAddress, remoteFamily } = socket;
        const now = Date.now();
        // console.log(`${now} - before`);

        return next
        .handle()
        .pipe(
            tap((s) => {

            }),
            map(payload => {
                const _request_id = request['_request_id'];
                context.switchToHttp().getResponse()["statusCode"] = payload.statusCode;
                const statusCode = payload.statusCode || 200;
                const responseObject ={
                    nonce : new Date().getTime(),
                    error   : {
                        fields : {
                            count : 0,
                            errors: []
                        },
                        systems : {
                            count : 0,
                            errors: []
                        }
                    },
                    status: statusCode,
                    message: payload.message,
                    metadata: payload.metadata ,
                    payload : payload.data
                }
                if( _request_id ){
                  if ( request['method'] == 'GET') {
                    this.logService.delete({ request_id: _request_id }).then().catch()
                  } else {
                    this.logService.update({ request_id: _request_id },{
                      response_json: JSON.stringify(responseObject),
                      responded_at: new Date().toJSON()
                    }).then().catch()
                  }
                }

                return responseObject;
            }),
            catchError(err => {
                // console.log(`${now} - after`);
                err["processTime"] = `${Date.now() - now}`;
                err["context"]     = `${className}/${methodName}`;
                return throwError(err);
            })

        );
    }
}
