import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule, {
      cors:{
        origin: "http://localhost:" + process.env.FE_PORT,
        methods: ["GET","POST", "PUT", "DELETE", "PATCH"],
        credentials: true,
      }
  });
  await app.listen(3000);
}
bootstrap();
