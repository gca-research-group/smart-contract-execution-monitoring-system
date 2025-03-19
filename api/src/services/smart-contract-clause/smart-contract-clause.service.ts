import { FindOptionsWhere, ILike } from 'typeorm';

import { Injectable } from '@nestjs/common';

import {
  CreateSmartContractClauseDto,
  ListSmartContractClauseDto,
  UpdateSmartContractClauseDto,
} from '@app/dtos/smart-contract-clause';
import { SmartContractClause } from '@app/models';

import { CrudBaseService } from '../crud-base.service';

@Injectable()
export class SmartContractClauseService extends CrudBaseService<
  SmartContractClause,
  ListSmartContractClauseDto,
  CreateSmartContractClauseDto,
  UpdateSmartContractClauseDto
>(SmartContractClause) {
  buildWhereOptions(
    options: ListSmartContractClauseDto,
  ): FindOptionsWhere<SmartContractClause> {
    const whereOptions: FindOptionsWhere<SmartContractClause> = {};

    if (options.id) {
      whereOptions['id'] = options.id;
    }

    if (options.name) {
      whereOptions['name'] = ILike(`%${options.name}%`);
    }

    return whereOptions;
  }
}
