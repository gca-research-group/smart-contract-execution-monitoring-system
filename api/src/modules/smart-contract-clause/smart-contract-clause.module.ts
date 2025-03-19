import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SmartContractClause } from '@app/models';
import { AuthService } from '@app/services/auth';
import { SmartContractClauseService } from '@app/services/smart-contract-clause';

import { SmartContractClauseController } from './smart-contract-clause.controller';
import { UserModule } from '../user';

@Module({
  imports: [TypeOrmModule.forFeature([SmartContractClause]), UserModule],
  providers: [SmartContractClauseService, AuthService],
  controllers: [SmartContractClauseController],
  exports: [SmartContractClauseService],
})
export class SmartContractClauseModule {}
