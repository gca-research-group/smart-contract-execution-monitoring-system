import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidBlockchainPlatformException extends HttpException {
  constructor() {
    super('INVALID_BLOCKCHAIN_PLATFORM', HttpStatus.FORBIDDEN);
  }
}
