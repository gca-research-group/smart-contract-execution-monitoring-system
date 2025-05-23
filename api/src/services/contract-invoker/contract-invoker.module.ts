import { forwardRef, Module } from '@nestjs/common';

import { ContractInvokerService } from '@app/services/contract-invoker';

import { SmartContractQueueModule } from '../smart-contract-queue/smart-contract-execution-queue';

@Module({
  imports: [forwardRef(() => SmartContractQueueModule)],
  providers: [ContractInvokerService],
  exports: [ContractInvokerService],
})
export class ContractInvokerModule {}
