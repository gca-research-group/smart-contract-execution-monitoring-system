import { DataSource } from 'typeorm';

import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppTestingModule } from '@app/app-testing.module';
import { SmartContract } from '@app/models';

import { SmartContractService } from './smartcontract.service';

describe('SmartContractService', () => {
  let service: SmartContractService;
  let dataSource: DataSource;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppTestingModule, TypeOrmModule.forFeature([SmartContract])],
      providers: [SmartContractService],
    }).compile();

    service = module.get<SmartContractService>(SmartContractService);
    dataSource = module.get<DataSource>(DataSource);
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
