import { NestFactory } from '@nestjs/core';
import { EmailModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(EmailModule, { cors: true });
  await app.listen(3001);
}
bootstrap();
