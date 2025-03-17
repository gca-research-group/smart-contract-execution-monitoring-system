import { DataSource } from 'typeorm';

import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppTestingModule } from '@app/app-testing.module';
import { SmartContract } from '@app/models';
import { SmartContractService } from '@app/services/smart-contract';

import { SmartContractController } from './smart-contract.controller';

describe('SmartcontractsController', () => {
  let controller: SmartContractController;
  let dataSource: DataSource;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppTestingModule, TypeOrmModule.forFeature([SmartContract])],
      providers: [SmartContractService],
      controllers: [SmartContractController],
    }).compile();

    controller = module.get<SmartContractController>(SmartContractController);
    dataSource = module.get<DataSource>(DataSource);
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
