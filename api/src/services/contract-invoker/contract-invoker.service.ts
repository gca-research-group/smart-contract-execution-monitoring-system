import { Injectable, Logger } from '@nestjs/common';

import { CreateClauseExecutionDto } from '@app/dtos/clause-execution';

@Injectable()
export class ContractInvokerService {
  private readonly logger = new Logger(ContractInvokerService.name);

  invoke(data: CreateClauseExecutionDto) {
    this.logger.log(`processing the clause: ${JSON.stringify(data)}`);
  }
}
