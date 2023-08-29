import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import * as cli_color from 'cli-color';
import * as winston from 'winston';
import { IPayloadMSG } from '../interfaces/payload-msg.interface';
import { ValidationException } from '../exceptions/validationException';
import { CustomInternalServerException } from '../exceptions/customInternalServerException';
import { ParamValidationException } from '../exceptions/paramValidationException';
import { InjectRepository } from '@nestjs/typeorm';
import { LogApiGatewayRequestResponseEntity } from '../entities/shared/_log/log-api-gateway-request-response.entity';
import { Repository } from 'typeorm';

/**
 * HttpExceptionFilter user for All error payload responce format
 *
 * @example add to app.module
 * @date 2020-10-09T12:11:13.305Z
 * @class HttpExceptionFilter
 * @since 1.0.0
 * @version 1.0.0
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    /**
     * logger variable
     *
     * @date 2020-10-08T12:11:13.305Z
     * @access private
     * @since 1.0.0
     * @name logger
     * @private
     * @constant
     */
    private readonly logger: winston.Logger;
    private readonly serverErrorLog: winston.Logger;

    /**
     * `getErrorBGC` use for background color
     *
     * @date 2020-10-09T12:11:13.305Z
     * @example
     * // returns {cli_color->Object}
     * `this.getErrorBGC(+err.statusCode);`
     *
     * @method getErrorBGC
     * @access private
     * @private
     * @description use for background color
     * @author asraful
     * @version 1.0.0
     * @since 1.0.0
     * @param  {number} status default 500
     * @returns {Object} cli_color Object
     */
    private getErrorBGC(status: number = 500) : any {

        if(Math.round(status/10) === 40) {
            return cli_color.bgXterm(5)
        } else {
            return cli_color.bgXterm(9);

        }
    }

    /**
     * init logger
     *
     * @constructor
     * @author asraful
     * @since 1.0.0
     * @version 1.0.0
     * @date 2020-10-07T12:11:13.305Z
     */
    constructor (
      @InjectRepository(LogApiGatewayRequestResponseEntity) private readonly logService: Repository<LogApiGatewayRequestResponseEntity>
    ){}

    /**
     * `catch` override method
     *
     * @date 2020-10-08T12:11:13.305Z
     * @since 1.0.0
     * @version 1.0.0
     * @override
     * @param  {HttpException} exception
     * @param  {ArgumentsHost} host
     */
    catch(exception: HttpException, host: ArgumentsHost) {
        const httpStatus = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        const ctx         = host.switchToHttp();
        const response    = ctx.getResponse<Response>();
        let errors = [];
        const request     = ctx.getRequest<Request>();
        const status      = httpStatus || 500; //exception?.getStatus() || 500;
        let errMsg      = ""
        const errDecs     = exception.getResponse()["error"] || "Internal error";
        const processTime = exception["processTime"] || "0";
        const context     = exception["context"] || "-/-";
        const { rawHeaders, httpVersion, method, socket, url } = request;
        const { remoteAddress, remoteFamily } = socket;
        const systemError  = [];
        const internalServerError = JSON.stringify(exception);
        if(exception instanceof ParamValidationException){
            exception.getResponse()['errors'].forEach(ele=>{
                systemError.push({
                    domain: "url",
                    value: `${url}`,
                    message: `${ele}`
                })
            })
        }else if(exception instanceof ValidationException){
            errors = (exception.getResponse()?.['errors']??[])
        }else if(exception instanceof CustomInternalServerException){
            errMsg      = "Failed. Please try again!";
            systemError.push({
                domain: "url",
                value: `${url}`,
                message: `${errMsg}`
            })

        }else{
            errMsg      = exception.message || "Internal error";
            systemError.push({
                domain: "url",
                value: `${url}`,
                message: `${errMsg}`
            })
        }
        const payload : IPayloadMSG = {
            nonce   : Date.now(),
            message : `error`,
            status  : status,
            error   : {
                fields: {
                    count  : errors.length,
                    errors : errors
                },
                systems: {
                    count  : systemError.length,
                    errors : systemError
                }
            },
            payload :{
                count : 0,
                items : []
            }
        }
        if( request['_request_id'] ){
          if(method !== 'GET' || String(status).startsWith("5")){
            this.logService.update({ request_id: request['_request_id'] },{
              response_json: JSON.stringify(payload),
              response_code: status,
              responded_at: new Date().toJSON(),
              host_internal_error_json: internalServerError,
            }).then().catch()
          } else {
            this.logService.delete({ request_id: request['_request_id'] }).then().catch()
          }
        }
        response.status(status).json(payload);
    }
}
