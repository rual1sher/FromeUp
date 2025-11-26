import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { env } from './config/env.config';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  app.enableCors({
    credentials: true,
    origin: env.whiteList.split(','),
  });

  const port = env.port || 7000;

  await app.listen(port);
  console.log(`🚀🚀🚀 Listening on port ${port} 🚀🚀🚀`);
}
bootstrap();
