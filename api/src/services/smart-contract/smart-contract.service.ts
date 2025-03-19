import { FindOptionsWhere, ILike, Repository } from 'typeorm';

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import {
  CreateSmartContractDto,
  ListSmartContractDto,
  UpdateSmartContractDto,
} from '@app/dtos/smart-contract';
import { SmartContract } from '@app/models';

import { CrudBaseService } from '../crud-base.service';

@Injectable()
export class SmartContractService extends CrudBaseService<
  SmartContract,
  ListSmartContractDto,
  CreateSmartContractDto,
  UpdateSmartContractDto
>(SmartContract) {
  constructor(
    @InjectRepository(SmartContract)
    readonly _repository: Repository<SmartContract>,
  ) {
    super(_repository);
  }

  buildWhereOptions(
    options: ListSmartContractDto,
  ): FindOptionsWhere<SmartContract> {
    const whereOptions: FindOptionsWhere<SmartContract> = {};

    if (options.id) {
      whereOptions['id'] = options.id;
    }

    if (options.name) {
      whereOptions['name'] = ILike(`%${options.name}%`);
    }

    return whereOptions;
  }

  async findOne(id: number): Promise<SmartContract> {
    const item = await this._repository.findOne({
      where: { id },
      relations: ['clauses', 'clauses.arguments'],
    });

    if (!item) {
      throw new BadRequestException('ITEM_NOT_FOUND');
    }

    return item;
  }
}
