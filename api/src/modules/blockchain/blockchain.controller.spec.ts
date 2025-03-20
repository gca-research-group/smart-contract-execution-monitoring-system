import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { AppTestingModule } from '@app/app-testing.module';
import { Blockchain, User } from '@app/models';
import { AuthService } from '@app/services/auth';
import { BlockchainService } from '@app/services/blockchain';
import { UserService } from '@app/services/user';

import { BlockchainController } from './blockchain.controller';

describe('BlockchainController', () => {
  let controller: BlockchainController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppTestingModule],
      providers: [
        BlockchainService,
        AuthService,
        UserService,
        {
          provide: getRepositoryToken(Blockchain),
          useValue: {},
        },
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
      ],
      controllers: [BlockchainController],
    }).compile();

    controller = module.get<BlockchainController>(BlockchainController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
