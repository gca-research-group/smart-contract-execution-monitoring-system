import { hashPassword } from './hashPassword';

describe('hashPassword', () => {
  it('should hash the password', () => {
    const password = 'abc';
    expect(hashPassword(password).startsWith('$2')).toBeTruthy();
  });
});
