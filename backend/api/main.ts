import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule, {
      cors:{
        origin: "*",
        methods: ["GET","POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        credentials: true,
        allowedHeaders:'Access-Control-Allow-Origin',
      }

  
  });
  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();


