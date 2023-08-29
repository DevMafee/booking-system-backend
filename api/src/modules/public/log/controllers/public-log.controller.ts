import {Body, Controller, Get, HttpStatus, Post,} from '@nestjs/common';
import {ApiQuery, ApiResponse, ApiTags} from '@nestjs/swagger';
import {PayloadResponseDTO} from '../../../../common/dto/payload-response.dto';
import {PublicLogService} from "../services/public-log.service";
import {Pagination} from "../../../../common/decorators/pagination.decorator";
import {PaginationDto} from "../../../../common/dto/Pagination.dto";
import PaginationBaseDTO from "../../../../common/dto/pagination-base.dto";
import {MailTestDto} from "../dto/mail-test.dto";

@Controller('v1/public/log')
@ApiTags('Log')
export class PublicLogController {
  constructor(private readonly publicLogService: PublicLogService ) {}

  @Get('/api-gateway')
  @ApiQuery({ type: PaginationBaseDTO})
  @ApiResponse({ description: 'Gateway log', status: HttpStatus.OK})
  async findApiGatewayLog(
    @Pagination() pagination: PaginationDto,
  ) {
    const [apiGatewayLog, total] = await this.publicLogService.findApiGatewayLog(pagination);
    return new PayloadResponseDTO({
      statusCode: HttpStatus.OK,
      message: 'Gateway log',
      metadata: {
        page: pagination.page,
        totalCount: total,
        limit: pagination.limit,
      },
      data: {apiGatewayLog}
    });
  }

  @Get('/api-microservice')
  @ApiQuery({ type: PaginationBaseDTO})
  @ApiResponse({ description: 'Microservice log', status: HttpStatus.OK})
  async findApiMicroserviceLog(
    @Pagination() pagination: PaginationDto
  ) {
    const [apiMicroserviceLog, total] = await this.publicLogService.findApiMicroserviceLog(pagination);
    return new PayloadResponseDTO({
      statusCode: HttpStatus.OK,
      message: 'Microservice log',
      metadata: {
        page: pagination.page,
        totalCount: total,
        limit: pagination.limit,
      },
      data: {apiMicroserviceLog}
    });
  }

  @Post('/mail-test')
  @ApiResponse({ description: 'Microservice log', status: HttpStatus.OK})
  async mailTest(
    @Body() mailTestDto:MailTestDto,
  ) {
    const mail = await this.publicLogService.mailTest(mailTestDto);
    return new PayloadResponseDTO({
      statusCode: HttpStatus.OK,
      message: 'Mail send successfully',
      data: { mail }
    });
  }
}
