import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { AppTestingModule } from '@app/app-testing.module';
import { User } from '@app/models';
import { AuthService } from '@app/services/auth';
import { UserService } from '@app/services/user';

import { UserController } from './user.controller';

describe('UserController', () => {
  let controller: UserController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppTestingModule],
      providers: [
        UserService,
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
      ],
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
