import { Injectable, Logger } from '@nestjs/common';

import { ExecuteSmartContractDto } from '@app/dtos/smart-contract';

@Injectable()
export class ContractInvokerService {
  private readonly logger = new Logger(ContractInvokerService.name);

  invoke(data: ExecuteSmartContractDto) {
    this.logger.log(`processing the clause: ${JSON.stringify(data)}`);
  }
}
