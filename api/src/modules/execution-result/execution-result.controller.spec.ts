import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { AppTestingModule } from '@app/app-testing.module';
import { User } from '@app/models';
import { ExecutionResultService } from '@app/modules/execution-result/services';

import { ExecutionResultController } from './execution-result.controller';
import { AuthService } from '../auth/services';
import { UserService } from '../user/services';

describe('ExecutionResultController', () => {
  let controller: ExecutionResultController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppTestingModule],
      providers: [
        ExecutionResultService,
        AuthService,
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
      ],
      controllers: [ExecutionResultController],
    }).compile();

    controller = module.get<ExecutionResultController>(
      ExecutionResultController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
