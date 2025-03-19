import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SmartContract } from '@app/models';
import { AuthService } from '@app/services/auth';
import { SmartContractService } from '@app/services/smart-contract';

import { SmartContractController } from './smart-contract.controller';
import { SmartContractClauseModule } from '../smart-contract-clause';
import { SmartContractClauseArgumentModule } from '../smart-contract-clause-argument';
import { UserModule } from '../user';

@Module({
  imports: [
    TypeOrmModule.forFeature([SmartContract]),
    UserModule,
    SmartContractClauseModule,
    SmartContractClauseArgumentModule,
  ],
  providers: [SmartContractService, AuthService],
  controllers: [SmartContractController],
  exports: [SmartContractService],
})
export class SmartContractModule {}
