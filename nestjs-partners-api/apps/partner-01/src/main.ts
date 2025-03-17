import { NestFactory } from '@nestjs/core';
import { Partner01Module } from './partner-01.module';

async function bootstrap() {
  const app = await NestFactory.create(Partner01Module);
  await app.listen(process.env.port ?? 3333);
}
bootstrap();
