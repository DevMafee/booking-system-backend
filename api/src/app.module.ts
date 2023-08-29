import { ObserverModule } from './observer/observer.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import { PayloadLoggingInterceptor } from './common/interceptors/payload-logging.interceptor';
import { AdminModule } from './modules/admin/admin.module';
import { HotelModule } from './modules/hotel/hotel.module';
import { PublicModule } from './modules/public/public.module';
import { MulterModule } from '@nestjs/platform-express';
import { RedisModule } from 'nestjs-redis';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MailerModule } from '@nestjs-modules/mailer';
import { TwingAdapter } from './adapters/twing.adapter';
import { MicroserviceModule } from './common/microservices/request/microservice-module';
import { LogApiGatewayRequestResponseEntity } from './common/entities/shared/_log/log-api-gateway-request-response.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { UserModule } from './modules/user/user.module';
@Module({
  imports: [
    MicroserviceModule,
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      insecureAuth: false,
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DB,
      synchronize:
        process.env.SYNCHRONIZE && process.env.SYNCHRONIZE === 'true',
      logging: ['error'], // IF true THEN WILL LOG DATABASE SCHEMA
      dropSchema: false,
      entities: ['dist/**/*.entity.js'],
      extra: {
        charset: 'utf8_general_ci',
      },
    }),
    TypeOrmModule.forFeature([LogApiGatewayRequestResponseEntity]),
    RedisModule.register([
      {
        url: process.env.REDIS_SESSION,
        name: 'REDIS_SESSION',
      },
      {
        url: process.env.REDIS_TMP_FILE,
        name: 'REDIS_TMP_FILE',
      },
    ]),
    AdminModule,
    PublicModule,
    HotelModule,
    UserModule,
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: process.env.MAIL_HOST,
          port: Number(process.env.MAIL_PORT),
          secure: process.env.SECURE === 'true',
          auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
          },
        },
        defaults: {
          from: process.env.MAIL_FROM_NAME,
        },
        template: {
          dir: `${process.cwd()}/templates/`,
          adapter: new TwingAdapter(),
        },
      }),
    }),
    ObserverModule,
    MulterModule.register({
      dest: './uploads/certificates',
    }),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: PayloadLoggingInterceptor,
    },
  ],
})
export class AppModule {}
