import { FindOptionsWhere, ILike, Repository } from 'typeorm';

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import {
  CreateSmartContractDto,
  ListSmartContractDto,
  UpdateSmartContractDto,
} from '@app/dtos/smart-contract';
import { Response, SmartContract } from '@app/models';

@Injectable()
export class SmartContractService {
  constructor(
    @InjectRepository(SmartContract)
    private repository: Repository<SmartContract>,
  ) {}

  async findAll(
    options: ListSmartContractDto,
  ): Promise<Response<SmartContract[]>> {
    const whereOptions: FindOptionsWhere<SmartContract> = {};

    const pageSize = +(options.pageSize ?? 20);

    const offset = (+options.page - 1) * pageSize;

    const orderBy = options.orderBy ?? 'id';
    const orderDirection = options.orderDirection ?? 'desc';

    if (options.id) {
      whereOptions['id'] = options.id;
    }

    if (options.name) {
      whereOptions['name'] = ILike(`%${options.name}%`);
    }

    const total = await this.repository.count();

    const data = await this.repository.find({
      where: whereOptions,
      skip: offset,
      take: pageSize,
      order: {
        [orderBy]: orderDirection,
      },
    });

    const hasMore = total > offset + pageSize;

    return {
      total,
      data,
      hasMore,
      page: +options.page,
      pages: Math.ceil(total / pageSize),
    };
  }

  async findOne(id: number): Promise<SmartContract> {
    const smartContract = await this.repository.findOneBy({ id });

    if (!smartContract) {
      throw new BadRequestException('SMARTCONTRACT_NOT_FOUND');
    }

    return smartContract;
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async create(data: CreateSmartContractDto): Promise<SmartContract> {
    const smartContract = await this.repository.save({
      ...data,
    });

    return smartContract;
  }

  async update(
    id: number,
    data: UpdateSmartContractDto,
  ): Promise<SmartContract> {
    const entity = await this.findOne(id);

    const smartContract = await this.repository.save({
      ...entity,
      ...data,
    });

    return smartContract;
  }
}
