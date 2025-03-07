import { Test, TestingModule } from '@nestjs/testing';

import { SmartcontractsService } from './smartcontract.service';

describe('SmartcontractsService', () => {
  let service: SmartcontractsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SmartcontractsService],
    }).compile();

    service = module.get<SmartcontractsService>(SmartcontractsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
