import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { AppTestingModule } from '@app/app-testing.module';
import { SmartContractClause } from '@app/models';

import { SmartContractClauseService } from './smart-contract-clause.service';

describe('SmartContractClauseService', () => {
  let service: SmartContractClauseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppTestingModule],
      providers: [
        SmartContractClauseService,
        {
          provide: getRepositoryToken(SmartContractClause),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<SmartContractClauseService>(
      SmartContractClauseService,
    );
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
