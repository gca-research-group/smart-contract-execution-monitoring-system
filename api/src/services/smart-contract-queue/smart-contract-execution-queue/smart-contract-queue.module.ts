import { forwardRef, Module } from '@nestjs/common';

import { ContractInvokerModule } from '@app/services/contract-invoker/contract-invoker.module';

import { SmartContractExecutionQueueService } from './smart-contract-execution-queue.service';
import { SmartContractOutboundQueueService } from './smart-contract-outbound-queue.service';

@Module({
  imports: [forwardRef(() => ContractInvokerModule)],
  providers: [
    SmartContractExecutionQueueService,
    SmartContractOutboundQueueService,
  ],
  exports: [
    SmartContractExecutionQueueService,
    SmartContractOutboundQueueService,
  ],
})
export class SmartContractQueueModule {}
