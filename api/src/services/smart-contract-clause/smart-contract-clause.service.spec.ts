import { DataSource } from 'typeorm';

import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppTestingModule } from '@app/app-testing.module';
import { SmartContractClause } from '@app/models';

import { SmartContractClauseService } from './smart-contract-clause.service';

describe('SmartContractClauseService', () => {
  let service: SmartContractClauseService;
  let dataSource: DataSource;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AppTestingModule,
        TypeOrmModule.forFeature([SmartContractClause]),
      ],
      providers: [SmartContractClauseService],
    }).compile();

    service = module.get<SmartContractClauseService>(
      SmartContractClauseService,
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
