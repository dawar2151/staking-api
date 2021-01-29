import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import AWS from 'aws-sdk'; 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });
  app.enableCors();
  // Starts listening for shutdown hooks
  await app.listen(3000);
}
bootstrap();
