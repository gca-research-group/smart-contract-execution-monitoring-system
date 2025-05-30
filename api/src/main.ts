import * as cookieParser from 'cookie-parser';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';

import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike('Api', {
              colors: true,
              prettyPrint: true,
              processId: true,
              appName: true,
            }),
          ),
        }),
        new winston.transports.File({
          level: 'verbose',
          filename: 'app.log',
          dirname: 'logs',
        }),
      ],
    }),
  });

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
