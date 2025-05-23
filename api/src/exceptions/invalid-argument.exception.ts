import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidArgumentException extends HttpException {
  constructor() {
    super('INVALID_ARGUMENT', HttpStatus.FORBIDDEN);
  }
}
