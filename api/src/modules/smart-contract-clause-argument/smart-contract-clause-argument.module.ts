import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SmartContractClauseArgument } from '@app/models';
import { AuthService } from '@app/services/auth';
import { SmartContractClauseArgumentService } from '@app/services/smart-contract-clause-argument';

import { SmartContractClauseArgumentController } from './smart-contract-clause-argument.controller';
import { UserModule } from '../user';

@Module({
  imports: [
    TypeOrmModule.forFeature([SmartContractClauseArgument]),
    UserModule,
  ],
  providers: [SmartContractClauseArgumentService, AuthService],
  controllers: [SmartContractClauseArgumentController],
  exports: [SmartContractClauseArgumentService],
})
export class SmartContractClauseArgumentModule {}
