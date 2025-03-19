import { FindOptionsWhere, ILike } from 'typeorm';

import { Injectable } from '@nestjs/common';

import {
  CreateSmartContractClauseArgumentDto,
  ListSmartContractClauseArgumentDto,
  UpdateSmartContractClauseArgumentDto,
} from '@app/dtos/smart-contract-clause-argument';
import { SmartContractClauseArgument } from '@app/models';

import { CrudBaseService } from '../crud-base.service';

@Injectable()
export class SmartContractClauseArgumentService extends CrudBaseService<
  SmartContractClauseArgument,
  ListSmartContractClauseArgumentDto,
  CreateSmartContractClauseArgumentDto,
  UpdateSmartContractClauseArgumentDto
>(SmartContractClauseArgument) {
  buildWhereOptions(
    options: ListSmartContractClauseArgumentDto,
  ): FindOptionsWhere<SmartContractClauseArgument> {
    const whereOptions: FindOptionsWhere<SmartContractClauseArgument> = {};

    if (options.id) {
      whereOptions['id'] = options.id;
    }

    if (options.name) {
      whereOptions['name'] = ILike(`%${options.name}%`);
    }

    return whereOptions;
  }
}
