import { DataSource } from 'typeorm';

import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppTestingModule } from '@app/app-testing.module';
import { SmartContractClause } from '@app/models';
import { SmartContractClauseService } from '@app/services/smart-contract-clause';

import { SmartContractClauseController } from './smart-contract-clause.controller';

describe('SmartContractClauseController', () => {
  let controller: SmartContractClauseController;
  let dataSource: DataSource;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AppTestingModule,
        TypeOrmModule.forFeature([SmartContractClause]),
      ],
      providers: [SmartContractClauseService],
      controllers: [SmartContractClauseController],
    }).compile();

    controller = module.get<SmartContractClauseController>(
      SmartContractClauseController,
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
