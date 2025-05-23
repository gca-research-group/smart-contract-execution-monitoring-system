import { Model } from 'mongoose';

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import {
  CreateBlockchainDto,
  ListBlockchainDto,
  UpdateBlockchainDto,
} from '@app/dtos/blockchain';
import { BlockchainConnectionFactory } from '@app/factories';
import { CrudBase, HyperledgerFabricConfig } from '@app/models/interfaces';
import { Blockchain, BLOCKCHAIN_CONFIG } from '@app/models/schemas/blockchain';

import { HyperledgerFabricConnectionService } from '../hyperledger-fabric';

@Injectable()
export class BlockchainService
  implements
    CrudBase<
      Blockchain,
      ListBlockchainDto,
      CreateBlockchainDto,
      UpdateBlockchainDto
    >
{
  constructor(
    @InjectModel(Blockchain.name)
    private model: Model<Blockchain>,
  ) {}

  async findAll(options: ListBlockchainDto) {
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

  create(data: CreateBlockchainDto) {
    const model = new this.model(data);
    return model.save();
  }

  async update(id: string, data: UpdateBlockchainDto) {
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

  config(platform: keyof typeof BLOCKCHAIN_CONFIG) {
    return BLOCKCHAIN_CONFIG[platform];
  }

  async testConnection(id: string) {
    const blockchain = await this.findOne(id);
    const service =
      BlockchainConnectionFactory.getService<HyperledgerFabricConnectionService>(
        blockchain.platform,
      );
    return service.connect(blockchain.parameters as HyperledgerFabricConfig);
  }
}
