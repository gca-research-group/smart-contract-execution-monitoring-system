import { ExecutionContext } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { AppTestingModule } from '@app/app-testing.module';
import { User } from '@app/models';
import { AuthService } from '@app/services/auth';
import { UserService } from '@app/services/user';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let authService: AuthService;
  let guard: AuthGuard;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppTestingModule],
      providers: [
        AuthGuard,
        AuthService,
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    guard = module.get<AuthGuard>(AuthGuard);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should throw an exception if the token was not provided', async () => {
    const request = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            authorization: '',
          },
        }),
      }),
    } as unknown as ExecutionContext;

    await expect(guard.canActivate(request)).rejects.toThrow(
      'TOKEN_IS_REQUIRED',
    );
  });

  it('should throw an exception if the token is invalid', async () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZXhhbXBsZSIsImlhdCI6MTcwOTgzOTM3OSwiZXhwIjoxNzA5ODM5MzgwfQ.b6FKJpI4PYKfrPRWTyF9_hSTeaR2AVsO2WYF8BZ2Rlk';
    const request = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            authorization: `Bearer ${token}`,
          },
        }),
      }),
    } as unknown as ExecutionContext;

    await expect(guard.canActivate(request)).rejects.toThrow('INVALID_TOKEN');
  });

  it('should validate the request', async () => {
    const token = await authService.createAccessToken({ sub: 1 });
    const request = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            authorization: `Bearer ${token}`,
          },
        }),
      }),
    } as unknown as ExecutionContext;

    await expect(guard.canActivate(request)).resolves.toEqual(true);
  });
});
