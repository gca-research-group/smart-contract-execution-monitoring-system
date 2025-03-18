import { FindOptionsWhere, ILike } from 'typeorm';

import { Injectable } from '@nestjs/common';

import {
  CreateBlockchainDto,
  ListBlockchainDto,
  UpdateBlockchainDto,
} from '@app/dtos/blockchain';
import { Blockchain, BLOCKCHAIN_CONFIG } from '@app/models';

import { CrudBaseService } from '../crud-base.service';

@Injectable()
export class BlockchainService extends CrudBaseService<
  Blockchain,
  ListBlockchainDto,
  CreateBlockchainDto,
  UpdateBlockchainDto
>(Blockchain) {
  buildWhereOptions(options: ListBlockchainDto): FindOptionsWhere<Blockchain> {
    const whereOptions: FindOptionsWhere<Blockchain> = {};

    if (options.id) {
      whereOptions['id'] = options.id;
    }

    if (options.name) {
      whereOptions['name'] = ILike(`%${options.name}%`);
    }

    return whereOptions;
  }

  config(platform: keyof typeof BLOCKCHAIN_CONFIG) {
    return BLOCKCHAIN_CONFIG[platform];
  }
}
