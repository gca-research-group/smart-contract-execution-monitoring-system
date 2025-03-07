import { Test, TestingModule } from '@nestjs/testing';

import { BLOCKCHAIN_CONNECTIONS } from './blockchain-connections.const';
import { BlockchainConnetionsModule } from './blockchain-connections.module';
import { HyperledgerFabricConnectionService } from './hyperledger-fabric.service';

describe('HyperledgerFabricConnectionService', () => {
  let service: HyperledgerFabricConnectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [BlockchainConnetionsModule],
    }).compile();

    service = module.get(BLOCKCHAIN_CONNECTIONS.HYPERLEDGER_FABRIC);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
