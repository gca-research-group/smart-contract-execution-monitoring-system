import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  SmartContract,
  SmartContractExecution,
  SmartContractExecutionSchema,
  SmartContractSchema,
} from '@app/models/schemas';
import {
  SmartContractEventHandlerService,
  SmartContractExecutionQueueService,
  SmartContractExecutionService,
  SmartContractInboundQueueService,
  SmartContractInvokerService,
  SmartContractOutboundQueueService,
  SmartContractService,
} from '@app/modules/smart-contract/services';

import { SmartContractController } from './smart-contract.controller';
import { AuthService } from '../auth/services';
import { BlockchainModule } from '../blockchain';
import { UserModule } from '../user';
import { SmartContractExecutionController } from './smart-contract-execution.controller';

@Module({
  imports: [
    UserModule,
    BlockchainModule,
    MongooseModule.forFeature([
      { name: SmartContract.name, schema: SmartContractSchema },
      {
        name: SmartContractExecution.name,
        schema: SmartContractExecutionSchema,
      },
    ]),
  ],
  providers: [
    AuthService,
    SmartContractService,
    SmartContractInvokerService,
    SmartContractEventHandlerService,
    SmartContractExecutionService,
    SmartContractExecutionQueueService,
    SmartContractInboundQueueService,
    SmartContractOutboundQueueService,
  ],
  controllers: [SmartContractController, SmartContractExecutionController],
  exports: [
    SmartContractService,
    SmartContractInvokerService,
    SmartContractEventHandlerService,
    SmartContractExecutionService,
    SmartContractExecutionQueueService,
    SmartContractInboundQueueService,
    SmartContractOutboundQueueService,
  ],
})
export class SmartContractModule {}
