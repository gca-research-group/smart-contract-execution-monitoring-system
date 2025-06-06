import { forwardRef, Module } from '@nestjs/common';

import { ContractInvokerService } from './services';
import { SmartContractQueueModule } from '../smart-contract-queue';

@Module({
  imports: [forwardRef(() => SmartContractQueueModule)],
  providers: [ContractInvokerService],
  exports: [ContractInvokerService],
})
export class ContractInvokerModule {}
