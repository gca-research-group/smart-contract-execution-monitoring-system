import { z } from 'zod';

import { BadRequestException } from '@nestjs/common';

import { ZodValidationPipe } from './zod.pipe';

describe('ZodValidationPipe', () => {
  const pipe = new ZodValidationPipe(
    z.number({ message: 'INVALID_ARGUMENT_TYPE' }),
  );

  it('should throw an exception if the object is invalid', () => {
    expect(() => pipe.transform('a')).toThrow(BadRequestException);
  });

  it('should validate the value successfuly', () => {
    expect(pipe.transform(1)).toEqual(1);
  });
});
