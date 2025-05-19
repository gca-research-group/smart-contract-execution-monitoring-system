import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { AppTestingModule } from '@app/app-testing.module';
import { User } from '@app/models';
import { AuthService } from '@app/services/auth';
import { ClauseExecutionService } from '@app/services/clause-execution';
import { UserService } from '@app/services/user';

import { ClauseExecutionController } from './clause-execution.controller';

describe('ClauseExecutionController', () => {
  let controller: ClauseExecutionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppTestingModule],
      providers: [
        ClauseExecutionService,
        AuthService,
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
      ],
      controllers: [ClauseExecutionController],
    }).compile();

    controller = module.get<ClauseExecutionController>(
      ClauseExecutionController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
