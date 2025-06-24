import { HttpException, HttpStatus } from '@nestjs/common';

export class BlockchainNotFoundException extends HttpException {
  constructor() {
    super('BLOCKCHAIN_NOT_FOUND', HttpStatus.BAD_REQUEST);
  }
}
