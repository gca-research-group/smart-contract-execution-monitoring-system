import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';

import { PUBLIC_FOLDER } from './const';
import { AuthModule } from './modules/auth';
import { BlockchainModule } from './modules/blockchain';
import { ExecutionResultModule } from './modules/execution-result';
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

    AuthModule,
    BlockchainModule,
    ExecutionResultModule,
    SmartContractModule,
    UserModule,
  ],
})
export class AppModule {}
