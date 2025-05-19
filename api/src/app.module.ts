import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { PUBLIC_FOLDER } from './const';
import { typeorm } from './database/typeorm.config';
import { AuthModule } from './modules/auth';
import { BlockchainModule } from './modules/blockchain';
import { ClauseExecutionModule } from './modules/clause-execution';
import { SmartContractModule } from './modules/smart-contract';
import { UserModule } from './modules/user';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: PUBLIC_FOLDER,
      serveRoot: '/static',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const config = configService.get<TypeOrmModuleOptions>('typeorm')!;
        return { ...config, autoLoadEntities: true };
      },
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_URI'),
        dbName: config.get<string>('MONGODB_DATABASE'),
      }),
      inject: [ConfigService],
    }),

    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
    }),
    AuthModule,
    BlockchainModule,
    ClauseExecutionModule,
    SmartContractModule,
    UserModule,
  ],
})
export class AppModule {}
