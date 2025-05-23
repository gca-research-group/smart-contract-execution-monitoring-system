import { Model } from 'mongoose';

import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import {
  CreateSmartContractDto,
  ExecuteSmartContractDto,
  ListSmartContractDto,
  UpdateSmartContractDto,
} from '@app/dtos/smart-contract';
import {
  BlockchainNotFoundException,
  ContractNotFoundException,
  InvalidArgumentException,
  InvalidBlockchainPlatformException,
  InvalidClauseException,
} from '@app/exceptions';
import { CrudBase } from '@app/models/interfaces';
import {
  BlockchainDocument,
  SmartContract,
  SmartContractDocument,
} from '@app/models/schemas';
import { BlockchainService } from '@app/modules/blockchain/services';
import { SmartContractExecutionQueueService } from '@app/modules/smart-contract-execution-queue/services';

@Injectable()
export class SmartContractService
  implements
    CrudBase<
      SmartContractDocument,
      ListSmartContractDto,
      CreateSmartContractDto,
      UpdateSmartContractDto
    >
{
  private readonly logger = new Logger(SmartContractService.name);
  constructor(
    @InjectModel(SmartContract.name)
    private model: Model<SmartContractDocument>,
    private blockchainService: BlockchainService,
    private smartContractExecutionQueueService: SmartContractExecutionQueueService,
  ) {}
  async findAll(options: ListSmartContractDto) {
    const pageSize = +(options.pageSize ?? 20);
    const page = +(options.page ?? 1);

    const offset = (page - 1) * pageSize;

    const [data, total] = await Promise.all([
      this.model.find().skip(offset).limit(pageSize).exec(),
      this.model.countDocuments().exec(),
    ]);

    const totalPages = Math.ceil(total / pageSize);

    return {
      pages: totalPages,
      page,
      hasMore: page < totalPages,
      total,
      data,
    };
  }

  async findOne(id: string) {
    const item = await this.model.findById(id).exec();

    if (!item) {
      throw new BadRequestException('ITEM_NOT_FOUND');
    }

    return item;
  }

  create(data: CreateSmartContractDto) {
    const model = new this.model(data);
    return model.save();
  }

  async update(id: string, data: UpdateSmartContractDto) {
    const item = await this.model
      .findByIdAndUpdate(id, data, {
        new: true,
      })
      .exec();

    if (!item) {
      throw new BadRequestException('ITEM_NOT_FOUND');
    }

    return item;
  }

  async remove(id: string) {
    await this.model.deleteOne({ _id: id });
  }

  async execute(data: ExecuteSmartContractDto) {
    const { blockchainId, smartContractId, clauseId } = data;

    let blockchain: BlockchainDocument;
    let smartContract: SmartContractDocument;

    try {
      blockchain = await this.blockchainService.findOne(blockchainId);
    } catch {
      throw new BlockchainNotFoundException();
    }

    try {
      smartContract = await this.findOne(smartContractId);
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

    const argumentsMap = clause.arguments.reduce<Record<string, string>>(
      (acc, { id, name }) => {
        acc[String(id)] = name;
        return acc;
      },
      {},
    );

    if (data.arguments?.some((item) => !!argumentsMap[item.id] === false)) {
      throw new InvalidArgumentException();
    }

    await this.smartContractExecutionQueueService.send({
      blockchainParameters: blockchain.parameters,
      blockchainPlatform: blockchain.platform,
      smartContractName: smartContract.name,
      smartContractId: String(smartContract.id),
      clauseName: clause.name,
      arguments: data.arguments?.map((item) => ({
        ...item,
        name: argumentsMap[item.id],
      })),
    });
  }
}
