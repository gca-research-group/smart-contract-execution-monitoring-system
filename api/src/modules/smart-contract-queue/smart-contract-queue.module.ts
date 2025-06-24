import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  SmartContractExecution,
  SmartContractExecutionSchema,
} from '@app/models/schemas';
import { ContractInvokerModule } from '@app/modules/contract-invoker';
import { SmartContractExecutionService } from '@app/modules/smart-contract-execution/services';

import {
  SmartContractExecutionQueueService,
  SmartContractOutboundQueueService,
} from './services';

@Module({
  imports: [
    forwardRef(() => ContractInvokerModule),
    MongooseModule.forFeature([
      {
        name: SmartContractExecution.name,
        schema: SmartContractExecutionSchema,
      },
    ]),
  ],
  providers: [
    SmartContractExecutionQueueService,
    SmartContractOutboundQueueService,
    SmartContractExecutionService,
    SmartContractExecutionService,
  ],
  exports: [
    SmartContractExecutionQueueService,
    SmartContractOutboundQueueService,
  ],
})
export class SmartContractQueueModule {}
