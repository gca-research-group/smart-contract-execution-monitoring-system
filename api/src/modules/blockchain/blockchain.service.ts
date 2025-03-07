import { Repository } from 'typeorm';

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateBlockchainDto } from '@app/dtos/blockchain';
import { Blockchain } from '@app/models';

@Injectable()
export class BlockchainService {
  constructor(
    @InjectRepository(Blockchain)
    private blockchainRepository: Repository<Blockchain>,
  ) {}

  findAll(): Promise<Blockchain[]> {
    return this.blockchainRepository.find();
  }

  async findOne(id: number): Promise<Blockchain> {
    const blockchain = await this.blockchainRepository.findOneBy({ id });

    if (!blockchain) {
      throw new BadRequestException('BLOCKCHAIN_NOT_FOUND');
    }

    return blockchain;
  }

  async remove(id: number): Promise<void> {
    await this.blockchainRepository.delete(id);
  }

  create(blockchain: CreateBlockchainDto): Blockchain {
    return this.blockchainRepository.create(blockchain);
  }
}
