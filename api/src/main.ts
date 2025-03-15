import * as cookieParser from 'cookie-parser';

import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  });

  app.use(cookieParser());

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`Server started on port: ${port}`);
}

bootstrap().catch((err) => {
  console.error('Error during bootstrap:', err);
});
