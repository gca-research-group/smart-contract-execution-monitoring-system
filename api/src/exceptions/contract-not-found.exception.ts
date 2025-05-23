import { HttpException, HttpStatus } from '@nestjs/common';

export class ContractNotFoundException extends HttpException {
  constructor() {
    super('CONTRACT_NOT_FOUND', HttpStatus.FORBIDDEN);
  }
}
