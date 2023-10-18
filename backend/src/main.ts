import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule, {
      cors:{
        origin: "*",
        methods: ["GET","POST", "PUT", "DELETE", "PATCH"],
        credentials: true,
        allowedHeaders: "*",
      }
  });
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
