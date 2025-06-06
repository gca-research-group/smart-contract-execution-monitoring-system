import { forwardRef, Inject, Injectable } from '@nestjs/common';

import { ContractInvokerDto } from '@app/dtos';
import { CreateExecutionResultDto } from '@app/dtos/execution-result';
import { BlockchainConnectionFactory } from '@app/factories';
import { SmartContractOutboundQueueService } from '@app/modules/smart-contract-queue/services';

@Injectable()
export class ContractInvokerService {
  constructor(
    @Inject(forwardRef(() => SmartContractOutboundQueueService))
    private smartContractOutboundQueueService: SmartContractOutboundQueueService<CreateExecutionResultDto>,
  ) {}

  async invoke(data: { id: string; payload: ContractInvokerDto }) {
    const { blockchain, smartContract, clause } = data.payload;

    const service = BlockchainConnectionFactory.getService(blockchain.platform);

    const connection = await service.connect(blockchain.parameters);

    const result = await service.invoke(
      connection,
      smartContract.name,
      clause.name,
    );

    await this.smartContractOutboundQueueService.send({
      id: data.id,
      payload: data.payload,
      result,
      succeeded: true,
    });
  }
}
