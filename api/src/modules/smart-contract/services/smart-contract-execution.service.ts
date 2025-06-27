import { isValidObjectId, Model, Types } from 'mongoose';

import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import {
  CreateSmartContractExecutionDto,
  ListSmartContractExecutionDto,
  UpdateSmartContractExecutionDto,
} from '@app/dtos/smart-contract-execution';
import { CrudBase } from '@app/models/interfaces';
import {
  SmartContractExecution,
  SmartContractExecutionDocument,
} from '@app/models/schemas';

@Injectable()
export class SmartContractExecutionService
  implements
    CrudBase<
      SmartContractExecutionDocument,
      ListSmartContractExecutionDto,
      CreateSmartContractExecutionDto,
      UpdateSmartContractExecutionDto
    >
{
  private readonly logger = new Logger(SmartContractExecutionService.name);
  constructor(
    @InjectModel(SmartContractExecution.name)
    private model: Model<SmartContractExecutionDocument>,
  ) {}
  async findAll(options: ListSmartContractExecutionDto) {
    const pageSize = +(options.pageSize ?? 20);
    const page = +(options.page ?? 1);

    const offset = (page - 1) * pageSize;

    const query: Record<string, unknown> = {};

    if (options._id) {
      if (!isValidObjectId(options._id)) {
        throw new BadRequestException('INVALID_ID_FORMAT');
      }

      query['_id'] = Types.ObjectId.createFromHexString(options._id);
    }

    if (options.blockchainPlatform) {
      query['payload.blockchain.platform'] = {
        $regex: new RegExp(options.blockchainPlatform, 'i'),
      };
    }

    if (options.status && options.status !== 'ALL') {
      query['status'] = options.status;
    }

    if (options.smartContractName) {
      query['payload.smartContract.name'] = {
        $regex: new RegExp(options.smartContractName, 'i'),
      };
    }

    const [data, total] = await Promise.all([
      this.model.find(query).skip(offset).limit(pageSize).exec(),
      this.model.countDocuments(query).exec(),
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

  async create(data: CreateSmartContractExecutionDto) {
    const model = new this.model(data);
    return await model.save();
  }

  async update(id: string, data: UpdateSmartContractExecutionDto) {
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

  async removeAll() {
    await this.model.deleteMany();
  }
}
