import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Blockchain } from '@app/models';
import { AuthService } from '@app/services/auth';
import { BlockchainService } from '@app/services/blockchain';

import { BlockchainController } from './blockchain.controller';
import { UserModule } from '../user';

@Module({
  imports: [TypeOrmModule.forFeature([Blockchain]), UserModule],
  providers: [BlockchainService, AuthService],
  controllers: [BlockchainController],
  exports: [BlockchainService],
})
export class BlockchainModule {}
