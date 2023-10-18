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
        allowedHeaders:'Origin, X-Requested-With, Content-Type, Accept, Authentication, Access-control-allow-credentials, Access-control-allow-headers, Access-control-allow-methods, Access-control-allow-origin, User-Agent, Referer, Accept-Encoding, Accept-Language, Access-Control-Request-Headers, Cache-Control, Pragma',
      }

  
  });
  app.enableCors();
  await app.listen(3000);
  if (request.method === 'OPTIONS') {
    return response.status(200).send('ok');
  }
}
bootstrap();
