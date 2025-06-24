import { WinstonModule } from 'nest-winston';

import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';

import { WINSTON_CONFIG } from './configs';
import { PUBLIC_FOLDER } from './const';
import { LoggerInterceptor } from './interceptors';
import { AuthModule } from './modules/auth';
import { BlockchainModule } from './modules/blockchain';
import { SmartContractExecutionModule } from './modules/smart-contract-execution';
import { SmartContractModule } from './modules/smart-contract';
import { UserModule } from './modules/user';
import {
  JwtProviderModule,
  MongoDbProviderModule,
  PostgresProviderModule,
} from './providers';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: PUBLIC_FOLDER,
      serveRoot: '/static',
    }),

    MongoDbProviderModule,
    PostgresProviderModule,
    JwtProviderModule,
    WinstonModule.forRoot(WINSTON_CONFIG),

    AuthModule,
    BlockchainModule,
    SmartContractExecutionModule,
    SmartContractModule,
    UserModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
})
export class AppModule {}
