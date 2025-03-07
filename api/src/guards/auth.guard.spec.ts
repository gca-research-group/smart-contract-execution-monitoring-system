import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { ExecutionContext } from '@nestjs/common';

describe('AuthGuard', () => {
  const secret = 'abc';
  const jwtService = new JwtService({ secret });
  const guard = new AuthGuard(jwtService);

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
    const token = jwtService.sign({ sub: 1 }, { expiresIn: '60s' });
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
