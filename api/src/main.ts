import 'dotenv/config';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataTransformGlobalPipe } from './common/pipes/dataTransformGlobalPipe';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import swagger from './swagger/swagger';


async function bootstrap() {
  const port = process.env.PORT;
  const host = process.env.SYSTEM_HOST;
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new DataTransformGlobalPipe());
  app.setGlobalPrefix('api');
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Booking App Application')
    .setDescription('The Booking App API description')
    .setVersion('1.0')
    // .addTag('Example')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', },
      'JWT',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-doc/', app, document,{
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await swagger(app)

  await app.listen(port);
  Logger.log(
    `Server is Running(🔥) on http://${host}:${port}/api/v1/`,
    'BookingApp',
  );
}
bootstrap();