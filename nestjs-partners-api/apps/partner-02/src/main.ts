import { NestFactory } from '@nestjs/core';
import { Partner02Module } from './partner-02.module';

async function bootstrap() {
  const app = await NestFactory.create(Partner02Module);
  await app.listen(process.env.port ?? 3334);
}
bootstrap();
