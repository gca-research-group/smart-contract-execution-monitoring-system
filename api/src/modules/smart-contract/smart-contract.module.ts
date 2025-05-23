import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SmartContract, SmartContractSchema } from '@app/models/schemas';
import { SmartContractService } from '@app/modules/smart-contract/services';

import { SmartContractController } from './smart-contract.controller';
import { AuthService } from '../auth/services';
import { BlockchainModule } from '../blockchain';
import { SmartContractQueueModule } from '../smart-contract-execution-queue';
import { UserModule } from '../user';

@Module({
  imports: [
    UserModule,
    SmartContractQueueModule,
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
