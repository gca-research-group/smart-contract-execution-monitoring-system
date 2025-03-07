import { Test, TestingModule } from '@nestjs/testing';
import { HyperledgerFabricConnectionService } from './hyperledger-fabric.service';
import { BlockchainConnetionsModule } from './blockchain-connections.module';
import { BLOCKCHAIN_CONNECTIONS } from './blockchain-connections.const';

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
