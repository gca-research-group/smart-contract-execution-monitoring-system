import { z } from 'zod';
import { ZodValidationPipe } from './zod.pipe';

describe('ZodValidationPipe', () => {
  const pipe = new ZodValidationPipe(z.number());

  it('should throw an exception if the object is invalid', () => {
    expect(() => pipe.transform('a')).toThrow('INVALID_OBJECT');
  });

  it('should validate the value successfuly', () => {
    expect(pipe.transform(1)).toEqual(1);
  });
});
