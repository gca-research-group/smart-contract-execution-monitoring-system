import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { PUBLIC_FOLDER } from './const';
import { typeorm } from './database/typeorm.config';
import { AuthModule } from './modules/auth';
import { BlockchainModule } from './modules/blockchain';
import { SmartcontractsModule } from './modules/smartcontract';
import { UserModule } from './modules/user';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: PUBLIC_FOLDER,
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
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
    }),
    AuthModule,
    BlockchainModule,
    SmartcontractsModule,
    UserModule,
  ],
})
export class AppModule {}
