import { isValidObjectId, Model, Types } from 'mongoose';

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import {
  CreateSmartContractDto,
  ListSmartContractDto,
  UpdateSmartContractDto,
} from '@app/dtos/smart-contract';
import { CrudBase } from '@app/models/interfaces';
import { SmartContract, SmartContractDocument } from '@app/models/schemas';

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
  constructor(
    @InjectModel(SmartContract.name)
    private model: Model<SmartContractDocument>,
  ) {}

  async findAll(options: ListSmartContractDto) {
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

    if (options.name) {
      query['name'] = { $regex: new RegExp(options.name, 'i') };
    }

    if (options.blockchainPlatform) {
      query['blockchainPlatform'] = {
        $regex: new RegExp(options.blockchainPlatform, 'i'),
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
}
