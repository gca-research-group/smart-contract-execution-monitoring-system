import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SmartContract, SmartContractSchema } from '@app/models/schemas';
import { AuthService } from '@app/services/auth';
import { SmartContractService } from '@app/services/smart-contract';

import { SmartContractController } from './smart-contract.controller';
import { BlockchainModule } from '../blockchain';
import { QueueModule } from '../queue';
import { UserModule } from '../user';

@Module({
  imports: [
    UserModule,
    QueueModule,
    BlockchainModule,
    MongooseModule.forFeature([
      { name: SmartContract.name, schema: SmartContractSchema },
    ]),
  ],
  providers: [AuthService, SmartContractService],
  controllers: [SmartContractController],
  exports: [SmartContractService],
})
export class SmartContractModule {}
