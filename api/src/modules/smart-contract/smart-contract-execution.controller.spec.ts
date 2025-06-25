import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { AppTestingModule } from '@app/app-testing.module';
import { User } from '@app/models';
import { SmartContractExecutionService } from '@app/modules/smart-contract-execution/services';

import { SmartContractExecutionController } from './smart-contract-execution.controller';
import { AuthService } from '../auth/services';
import { UserService } from '../user/services';

describe('SmartContractExecutionController', () => {
  let controller: SmartContractExecutionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppTestingModule],
      providers: [
        SmartContractExecutionService,
        AuthService,
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
      ],
      controllers: [SmartContractExecutionController],
    }).compile();

    controller = module.get<SmartContractExecutionController>(
      SmartContractExecutionController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
