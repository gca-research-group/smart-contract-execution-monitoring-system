import { Injectable, Logger } from '@nestjs/common';

import { BlockchainConnectionFactory } from '@app/common/blockchain-connections';
import { ContractInvokerDto } from '@app/dtos';

@Injectable()
export class ContractInvokerService {
  private readonly logger = new Logger(ContractInvokerService.name);

  async invoke(data: ContractInvokerDto) {
    const {
      blockchainPlatform,
      blockchainParameters,
      smartContractName,
      clauseName,
    } = data;

    if (!clauseName) {
      this.logger.warn(`The clause's name is empty.`);
      return;
    }

    const service = BlockchainConnectionFactory.getService(blockchainPlatform);

    const connection = await service.connect(blockchainParameters);

    const result = await service.invoke(
      connection,
      smartContractName,
      clauseName,
    );

    this.logger.log(`processing the clause: ${JSON.stringify(result)}`);
  }
}
