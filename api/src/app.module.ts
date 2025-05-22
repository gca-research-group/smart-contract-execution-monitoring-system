import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';

import { PUBLIC_FOLDER } from './const';
import { AuthModule } from './modules/auth';
import { BlockchainModule } from './modules/blockchain';
import { SmartContractModule } from './modules/smart-contract';
import { UserModule } from './modules/user';
import { MongoDbProviderModule } from './providers';
import { PostgresProviderModule } from './providers/postgres.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: PUBLIC_FOLDER,
      serveRoot: '/static',
    }),
    MongoDbProviderModule,
    PostgresProviderModule,
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
    }),
    AuthModule,
    BlockchainModule,
    SmartContractModule,
    UserModule,
  ],
})
export class AppModule {}
