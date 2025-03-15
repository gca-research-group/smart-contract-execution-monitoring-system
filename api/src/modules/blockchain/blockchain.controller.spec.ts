import { DataSource } from 'typeorm';

import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppTestingModule } from '@app/app-testing.module';
import { Blockchain } from '@app/models';
import { BlockchainService } from '@app/services/blockchain';

import { BlockchainController } from './blockchain.controller';

describe('BlockchainController', () => {
  let controller: BlockchainController;
  let dataSource: DataSource;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppTestingModule, TypeOrmModule.forFeature([Blockchain])],
      providers: [BlockchainService],
      controllers: [BlockchainController],
    }).compile();

    controller = module.get<BlockchainController>(BlockchainController);
    dataSource = module.get<DataSource>(DataSource);
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
