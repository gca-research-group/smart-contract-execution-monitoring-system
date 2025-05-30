import * as cookieParser from 'cookie-parser';
import { WinstonModule } from 'nest-winston';

import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { WINSTON_CONFIG } from './configs';

async function bootstrap() {
  const logger = WinstonModule.createLogger(WINSTON_CONFIG);

  const app = await NestFactory.create(AppModule, { logger });

  app.enableCors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  });

  app.use(cookieParser());

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  logger.log(`Server started on port: ${port}`);
}

bootstrap().catch((err) => {
  console.error('Error during bootstrap:', err);
});
