import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { AppTestingModule } from '@app/app-testing.module';
import { SmartContractClauseArgument } from '@app/models';

import { SmartContractClauseArgumentService } from './smart-contract-clause-argument.service';

describe('SmartContractClauseArgumentService', () => {
  let service: SmartContractClauseArgumentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppTestingModule],
      providers: [
        SmartContractClauseArgumentService,
        {
          provide: getRepositoryToken(SmartContractClauseArgument),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<SmartContractClauseArgumentService>(
      SmartContractClauseArgumentService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
