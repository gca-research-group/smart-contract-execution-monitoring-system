import { Model } from 'mongoose';

import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import {
  CreateSmartContractDto,
  ExecuteSmartContractDto,
  ListSmartContractDto,
  UpdateSmartContractDto,
} from '@app/dtos/smart-contract';
import { CrudBase } from '@app/models/interfaces';
import { SmartContract, SmartContractDocument } from '@app/models/schemas';

import { BlockchainService } from '../blockchain';
import { SmartContractExecutionQueueService } from '../queue/smart-contract-execution-queue';

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
    private producerService: SmartContractExecutionQueueService,
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

    const blockchain = await this.blockchainService.findOne(blockchainId);
    const smartContract = await this.findOne(smartContractId);
    const clause = smartContract.clauses.find((item) => item.id === clauseId);

    await this.producerService.send({
      blockchainParameters: blockchain.parameters,
      blockchainPlatform: blockchain.platform,
      smartContractName: smartContract.name,
      clauseName: clause?.name,
      arguments: data.arguments?.map((item) => ({
        ...item,
        name: clause?.arguments.find((argument) => argument.id === item.id)
          ?.name,
      })),
    });
  }
}
