import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.use('/files', express.static('./files'));
  app.useGlobalPipes(new ValidationPipe());

  if (configService.get('ALLOW_DOCS')) {
    const swaggerConfig = new DocumentBuilder()
      .setTitle(`Pekelná kuchařka - API Docs`)
      .addBearerAuth()
      .build();

    const doc = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('docs', app, doc);
  }
  await app.listen(3333);
}
bootstrap();
