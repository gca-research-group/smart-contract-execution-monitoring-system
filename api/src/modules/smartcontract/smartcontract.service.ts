import { Repository } from 'typeorm';

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import {
  CreateSmartContractDto,
  UpdateSmartContractDto,
} from '@app/dtos/smartcontract';
import { SmartContract } from '@app/models';

@Injectable()
export class SmartContractService {
  constructor(
    @InjectRepository(SmartContract)
    private smartContractRepository: Repository<SmartContract>,
  ) {}

  findAll(): Promise<SmartContract[]> {
    return this.smartContractRepository.find();
  }

  async findOne(id: number): Promise<SmartContract> {
    const smartContract = await this.smartContractRepository.findOneBy({ id });

    if (!smartContract) {
      throw new BadRequestException('SMARTCONTRACT_NOT_FOUND');
    }

    return smartContract;
  }

  async remove(id: number): Promise<void> {
    await this.smartContractRepository.delete(id);
  }

  async create(data: CreateSmartContractDto): Promise<SmartContract> {
    const smartContract = await this.smartContractRepository.save({
      ...data,
    });

    return smartContract;
  }

  async update(
    id: number,
    data: UpdateSmartContractDto,
  ): Promise<SmartContract> {
    const entity = await this.findOne(id);

    const smartContract = await this.smartContractRepository.save({
      ...entity,
      ...data,
    });

    return smartContract;
  }
}
