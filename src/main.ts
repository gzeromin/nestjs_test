import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const serverConfig = config.get('server');
  const port = process.env.PORT || serverConfig.port;
  
  const swaggerConfig = new DocumentBuilder()
    .setTitle('nestjs Board CRUD test')
    .setDescription('basic CRUD server for Board module')
    .setVersion('1.0')
    .build();
  
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  Logger.log(`Application running on port ${port}`);

}
bootstrap();
