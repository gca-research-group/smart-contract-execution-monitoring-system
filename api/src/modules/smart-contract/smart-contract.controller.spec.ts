import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { AppTestingModule } from '@app/app-testing.module';
import { SmartContract, User } from '@app/models';
import { AuthService } from '@app/services/auth';
import { SmartContractService } from '@app/services/smart-contract';
import { UserService } from '@app/services/user';

import { SmartContractController } from './smart-contract.controller';

describe('SmartContractController', () => {
  let controller: SmartContractController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppTestingModule],
      providers: [
        SmartContractService,
        AuthService,
        UserService,
        {
          provide: getRepositoryToken(SmartContract),
          useValue: {},
        },
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
      ],
      controllers: [SmartContractController],
    }).compile();

    controller = module.get<SmartContractController>(SmartContractController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
