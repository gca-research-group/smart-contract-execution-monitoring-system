import { Test, TestingModule } from '@nestjs/testing';

import { HyperledgerFabricConnectionService } from './hyperledger-fabric.service';

describe('HyperledgerFabricConnectionService', () => {
  let service: HyperledgerFabricConnectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HyperledgerFabricConnectionService],
    }).compile();

    service = module.get(HyperledgerFabricConnectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
