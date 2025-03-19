import { DataSource, FindOptionsWhere, ILike, Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import {
  CreateSmartContractDto,
  ListSmartContractDto,
  UpdateSmartContractDto,
} from '@app/dtos/smart-contract';
import { SmartContract } from '@app/models';

import { CrudBaseService } from '../crud-base.service';
import { SmartContractClauseService } from '../smart-contract-clause';
import { SmartContractClauseArgumentService } from '../smart-contract-clause-argument';

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
    private readonly dataSource: DataSource,
    private clauseService: SmartContractClauseService,
    private argumentService: SmartContractClauseArgumentService,
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

  override async create(data: CreateSmartContractDto): Promise<SmartContract> {
    return this.dataSource.transaction(async (manager) => {
      const smartContract = await manager.save(SmartContract, { ...data });

      for (const clause of data.clauses ?? []) {
        const _clause = await this.clauseService.createWithTransaction(
          manager,
          {
            ...clause,
            smartContractId: smartContract.id,
          },
        );

        for (const argument of clause.arguments ?? []) {
          await this.argumentService.createWithTransaction(manager, {
            ...argument,
            clauseId: _clause.id,
          });
        }
      }

      return smartContract;
    });
  }
}
