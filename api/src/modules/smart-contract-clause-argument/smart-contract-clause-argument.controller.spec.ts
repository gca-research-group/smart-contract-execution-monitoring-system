import { DataSource } from 'typeorm';

import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppTestingModule } from '@app/app-testing.module';
import { SmartContractClauseArgument } from '@app/models';
import { SmartContractClauseArgumentService } from '@app/services/smart-contract-clause-argument';

import { SmartContractClauseArgumentController } from './smart-contract-clause-argument.controller';

describe('SmartcontractsController', () => {
  let controller: SmartContractClauseArgumentController;
  let dataSource: DataSource;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AppTestingModule,
        TypeOrmModule.forFeature([SmartContractClauseArgument]),
      ],
      providers: [SmartContractClauseArgumentService],
      controllers: [SmartContractClauseArgumentController],
    }).compile();

    controller = module.get<SmartContractClauseArgumentController>(
      SmartContractClauseArgumentController,
    );
    dataSource = module.get<DataSource>(DataSource);
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
