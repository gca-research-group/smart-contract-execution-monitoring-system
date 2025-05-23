import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ExecutionResult, ExecutionResultSchema } from '@app/models/schemas';
import { ContractInvokerModule } from '@app/modules/contract-invoker';
import { ExecutionResultService } from '@app/modules/execution-result/services';

import {
  SmartContractExecutionQueueService,
  SmartContractOutboundQueueService,
} from './services';

@Module({
  imports: [
    forwardRef(() => ContractInvokerModule),
    MongooseModule.forFeature([
      { name: ExecutionResult.name, schema: ExecutionResultSchema },
    ]),
  ],
  providers: [
    SmartContractExecutionQueueService,
    SmartContractOutboundQueueService,
    ExecutionResultService,
    ExecutionResultService,
  ],
  exports: [
    SmartContractExecutionQueueService,
    SmartContractOutboundQueueService,
  ],
})
export class SmartContractQueueModule {}
