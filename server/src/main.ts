import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './config/config';
import { ValidationPipe } from '@nestjs/common';

const {
  common: { appPort },
} = config;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(appPort);
}
bootstrap();
