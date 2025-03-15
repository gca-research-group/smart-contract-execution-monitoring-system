import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SmartContract } from '@app/models';
import { AuthService } from '@app/services/auth';
import { SmartContractService } from '@app/services/smartcontract';

import { SmartContractController } from './smartcontract.controller';
import { UserModule } from '../user';

@Module({
  imports: [TypeOrmModule.forFeature([SmartContract]), UserModule],
  providers: [SmartContractService, AuthService],
  controllers: [SmartContractController],
  exports: [SmartContractService],
})
export class SmartcontractsModule {}
