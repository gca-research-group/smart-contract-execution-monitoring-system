import { forwardRef, Inject, Injectable } from '@nestjs/common';

import { ContractInvokerDto } from '@app/dtos';
import { BlockchainConnectionFactory } from '@app/factories';

import { SmartContractOutboundQueueService } from '../smart-contract-queue/smart-contract-execution-queue';

@Injectable()
export class ContractInvokerService {
  constructor(
    @Inject(forwardRef(() => SmartContractOutboundQueueService))
    private smartContractOutboundQueueService: SmartContractOutboundQueueService,
  ) {}

  async invoke(data: ContractInvokerDto) {
    const {
      blockchainPlatform,
      blockchainParameters,
      smartContractName,
      clauseName,
    } = data;

    const service = BlockchainConnectionFactory.getService(blockchainPlatform);

    const connection = await service.connect(blockchainParameters);

    const result = await service.invoke(
      connection,
      smartContractName,
      clauseName,
    );

    await this.smartContractOutboundQueueService.send(result);
  }
}
