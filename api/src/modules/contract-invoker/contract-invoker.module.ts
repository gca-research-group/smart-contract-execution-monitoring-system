import { forwardRef, Module } from '@nestjs/common';

import { SmartContractQueueModule } from '../smart-contract-execution-queue';
import { ContractInvokerService } from './services';

@Module({
  imports: [forwardRef(() => SmartContractQueueModule)],
  providers: [ContractInvokerService],
  exports: [ContractInvokerService],
})
export class ContractInvokerModule {}
