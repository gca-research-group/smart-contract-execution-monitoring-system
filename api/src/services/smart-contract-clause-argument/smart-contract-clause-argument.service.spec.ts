import { DataSource } from 'typeorm';

import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppTestingModule } from '@app/app-testing.module';
import { SmartContractClauseArgument } from '@app/models';

import { SmartContractClauseArgumentService } from './smart-contract-clause-argument.service';

describe('SmartContractClauseArgumentService', () => {
  let service: SmartContractClauseArgumentService;
  let dataSource: DataSource;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AppTestingModule,
        TypeOrmModule.forFeature([SmartContractClauseArgument]),
      ],
      providers: [SmartContractClauseArgumentService],
    }).compile();

    service = module.get<SmartContractClauseArgumentService>(
      SmartContractClauseArgumentService,
    );
    dataSource = module.get<DataSource>(DataSource);
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
