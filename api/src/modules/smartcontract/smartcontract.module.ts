import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SmartContract } from '@app/models';

import { SmartContractController } from './smartcontract.controller';
import { SmartContractService } from './smartcontract.service';

@Module({
  imports: [TypeOrmModule.forFeature([SmartContract])],
  providers: [SmartContractService],
  controllers: [SmartContractController],
  exports: [SmartContractService],
})
export class SmartcontractsModule {}
