import { forwardRef, Inject, Injectable } from '@nestjs/common';

import { ContractInvokerDto } from '@app/dtos';
import { CreateSmartContractExecutionDto } from '@app/dtos/smart-contract-execution';
import { BlockchainConnectionFactory } from '@app/factories';
import { SmartContractOutboundQueueService } from '@app/modules/smart-contract-queue/services';

@Injectable()
export class ContractInvokerService {
  constructor(
    @Inject(forwardRef(() => SmartContractOutboundQueueService))
    private smartContractOutboundQueueService: SmartContractOutboundQueueService<CreateSmartContractExecutionDto>,
  ) {}

  async invoke(data: { id: string; payload: ContractInvokerDto }) {
    const { blockchain, smartContract, clause, clauseArguments } = data.payload;

    const service = BlockchainConnectionFactory.getService(blockchain.platform);

    const connection = await service.connect(blockchain.parameters);
    try {
      const result = await service.invoke(
        connection,
        smartContract.name,
        clause.name,
        clauseArguments,
      );

      await this.smartContractOutboundQueueService.send({
        id: data.id,
        payload: data.payload,
        result,
        status: 'SUCCESS',
      });
    } catch (error) {
      await this.smartContractOutboundQueueService.send({
        id: data.id,
        payload: data.payload,
        result: (error as { message: string }).message,
        status: 'FAIL',
      });
    }
  }
}
