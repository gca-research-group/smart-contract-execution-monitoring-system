import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { AppTestingModule } from '@app/app-testing.module';
import { SmartContract } from '@app/models';

import { SmartContractService } from './smart-contract.service';

describe('SmartContractService', () => {
  let service: SmartContractService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppTestingModule],
      providers: [
        SmartContractService,
        {
          provide: getRepositoryToken(SmartContract),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<SmartContractService>(SmartContractService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
