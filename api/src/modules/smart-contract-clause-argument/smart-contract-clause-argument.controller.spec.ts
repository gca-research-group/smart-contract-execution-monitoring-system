import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { AppTestingModule } from '@app/app-testing.module';
import { SmartContractClauseArgument, User } from '@app/models';
import { AuthService } from '@app/services/auth';
import { SmartContractClauseArgumentService } from '@app/services/smart-contract-clause-argument';
import { UserService } from '@app/services/user';

import { SmartContractClauseArgumentController } from './smart-contract-clause-argument.controller';

describe('SmartcontractsController', () => {
  let controller: SmartContractClauseArgumentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppTestingModule],
      providers: [
        AuthService,
        UserService,
        SmartContractClauseArgumentService,
        {
          provide: getRepositoryToken(SmartContractClauseArgument),
          useValue: {},
        },
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
      ],
      controllers: [SmartContractClauseArgumentController],
    }).compile();

    controller = module.get<SmartContractClauseArgumentController>(
      SmartContractClauseArgumentController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
