import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Blockchain, BlockchainSchema } from '@app/models/schemas/blockchain';
import { AuthService } from '@app/services/auth';
import { BlockchainService } from '@app/services/blockchain';

import { BlockchainController } from './blockchain.controller';
import { UserModule } from '../user';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([
      { name: Blockchain.name, schema: BlockchainSchema },
    ]),
  ],
  providers: [BlockchainService, AuthService],
  controllers: [BlockchainController],
  exports: [BlockchainService],
})
export class BlockchainModule {}
