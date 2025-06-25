import { Injectable } from '@nestjs/common';

import { ContractInvokerDto, EventHandlerDto } from '@app/dtos';
import {
  BlockchainNotFoundException,
  ContractNotFoundException,
  InvalidArgumentException,
  InvalidBlockchainPlatformException,
  InvalidClauseException,
} from '@app/exceptions';
import { BlockchainDocument, SmartContractDocument } from '@app/models/schemas';
import { BlockchainService } from '@app/modules/blockchain/services';

import { SmartContractExecutionQueueService } from './smart-contract-execution-queue.service';
import { SmartContractExecutionService } from './smart-contract-execution.service';
import { SmartContractService } from './smart-contract.service';

@Injectable()
export class SmartContractEventHandlerService {
  constructor(
    private blockchainService: BlockchainService,
    private smartContractService: SmartContractService,
    private smartContractExecutionQueueService: SmartContractExecutionQueueService,
    private smartContractExecutionService: SmartContractExecutionService,
  ) {}

  async handle(data: EventHandlerDto) {
    const { blockchainId, smartContractId, clauseId } = data;

    let blockchain: BlockchainDocument;
    let smartContract: SmartContractDocument;

    try {
      blockchain = await this.blockchainService.findOne(blockchainId);
    } catch {
      throw new BlockchainNotFoundException();
    }

    try {
      smartContract = await this.smartContractService.findOne(smartContractId);
    } catch {
      throw new ContractNotFoundException();
    }

    const clause = smartContract.clauses.find((item) => item.id === clauseId);

    if (smartContract.blockchainPlatform !== blockchain.platform) {
      throw new InvalidBlockchainPlatformException();
    }

    if (!clause) {
      throw new InvalidClauseException();
    }

    const argumentsMap = clause.clauseArguments.reduce<Record<string, string>>(
      (acc, { id, name }) => {
        acc[String(id)] = name;
        return acc;
      },
      {},
    );

    if (
      data.clauseArguments?.some((item) => !!argumentsMap[item.id] === false)
    ) {
      throw new InvalidArgumentException();
    }

    const payload: ContractInvokerDto = {
      blockchain: {
        id: String(blockchain.id),
        parameters: blockchain.parameters,
        platform: blockchain.platform,
      },
      smartContract: {
        id: String(smartContract.id),
        name: smartContract.name,
      },
      clause: {
        id: String(clause.id),
        name: clause.name,
      },
      clauseArguments:
        data.clauseArguments?.map((item) => ({
          ...item,
          name: argumentsMap[item.id],
        })) ?? [],
    };

    const saved = await this.smartContractExecutionService.create({
      payload,
      status: 'PENDING',
    });

    await this.smartContractExecutionQueueService.send({
      payload,
      id: String(saved.id),
    });
  }
}
