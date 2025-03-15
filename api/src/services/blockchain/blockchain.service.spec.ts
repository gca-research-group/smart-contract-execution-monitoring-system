import { DataSource } from 'typeorm';

import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppTestingModule } from '@app/app-testing.module';
import { Blockchain } from '@app/models';

import { BlockchainService } from './blockchain.service';

describe('BlockchainService', () => {
  let service: BlockchainService;
  let dataSource: DataSource;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppTestingModule, TypeOrmModule.forFeature([Blockchain])],
      providers: [BlockchainService],
    }).compile();

    service = module.get<BlockchainService>(BlockchainService);
    dataSource = module.get<DataSource>(DataSource);
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
