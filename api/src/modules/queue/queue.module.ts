import { Module } from '@nestjs/common';

import { ContractInvokerService } from '@app/services/contract-invoker';
import { SmartContractExecutionQueueService } from '@app/services/queue/smart-contract-execution-queue';

@Module({
  providers: [SmartContractExecutionQueueService, ContractInvokerService],
  exports: [SmartContractExecutionQueueService],
})
export class QueueModule {}
