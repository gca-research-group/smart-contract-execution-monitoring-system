import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { AppTestingModule } from '@app/app-testing.module';
import { SmartContractClause, User } from '@app/models';
import { AuthService } from '@app/services/auth';
import { SmartContractClauseService } from '@app/services/smart-contract-clause';
import { UserService } from '@app/services/user';

import { SmartContractClauseController } from './smart-contract-clause.controller';

describe('SmartContractClauseController', () => {
  let controller: SmartContractClauseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppTestingModule],
      providers: [
        AuthService,
        UserService,
        SmartContractClauseService,
        {
          provide: getRepositoryToken(SmartContractClause),
          useValue: {},
        },
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
      ],
      controllers: [SmartContractClauseController],
    }).compile();

    controller = module.get<SmartContractClauseController>(
      SmartContractClauseController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
