import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { AppTestingModule } from '@app/app-testing.module';
import { User } from '@app/models';

import { BlockchainController } from './blockchain.controller';
import { BlockchainService } from './services';
import { AuthService } from '../auth/services';
import { UserService } from '../user/services';

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
