import { Model } from 'mongoose';

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import {
  CreateClauseExecutionDto,
  ListClauseExecutionDto,
  UpdateClauseExecutionDto,
} from '@app/dtos/clause-execution';
import { CrudBase } from '@app/models/interfaces';
import { ClauseExecution, ClauseExecutionDocument } from '@app/models/schemas';

@Injectable()
export class ClauseExecutionService
  implements
    CrudBase<
      ClauseExecutionDocument,
      ListClauseExecutionDto,
      CreateClauseExecutionDto,
      UpdateClauseExecutionDto
    >
{
  constructor(
    @InjectModel(ClauseExecution.name)
    private model: Model<ClauseExecutionDocument>,
  ) {}
  async findAll(options: ListClauseExecutionDto) {
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

  create(data: CreateClauseExecutionDto) {
    const model = new this.model(data);
    return model.save();
  }

  async update(id: string, data: UpdateClauseExecutionDto) {
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
}
