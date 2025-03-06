import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  it('should be defined', () => {
    expect(new AuthGuard(new JwtService())).toBeDefined();
  });

  it.todo('should throw an exception if the token was not provided');

  it.todo('should throw an exception if the token is invalid');

  it.todo('should validate the request');
});
