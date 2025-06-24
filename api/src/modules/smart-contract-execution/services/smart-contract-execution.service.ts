import { Model } from 'mongoose';

import { BadRequestException, Injectable } from '@nestjs/common';
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
  constructor(
    @InjectModel(SmartContractExecution.name)
    private model: Model<SmartContractExecutionDocument>,
  ) {}
  async findAll(options: ListSmartContractExecutionDto) {
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
