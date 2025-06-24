import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  SmartContractExecution,
  SmartContractExecutionSchema,
} from '@app/models/schemas/smart-contract-execution';
import { SmartContractExecutionService } from '@app/modules/smart-contract-execution/services';

import { SmartContractExecutionController } from './smart-contract-execution.controller';
import { AuthService } from '../auth/services';
import { UserModule } from '../user';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([
      {
        name: SmartContractExecution.name,
        schema: SmartContractExecutionSchema,
      },
    ]),
  ],
  providers: [SmartContractExecutionService, AuthService],
  controllers: [SmartContractExecutionController],
  exports: [SmartContractExecutionService],
})
export class SmartContractExecutionModule {}
