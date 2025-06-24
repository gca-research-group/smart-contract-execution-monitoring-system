import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidClauseException extends HttpException {
  constructor() {
    super('INVALID_CLAUSE', HttpStatus.BAD_REQUEST);
  }
}
