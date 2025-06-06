import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { AppTestingModule } from '@app/app-testing.module';
import { User } from '@app/models';
import { SmartContractService } from '@app/modules/smart-contract/services';

import { SmartContractController } from './smart-contract.controller';
import { AuthService } from '../auth/services';
import { UserService } from '../user/services';

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
