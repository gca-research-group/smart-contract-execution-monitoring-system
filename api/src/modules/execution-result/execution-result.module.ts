import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  ExecutionResult,
  ExecutionResultSchema,
} from '@app/models/schemas/execution-result';
import { ExecutionResultService } from '@app/modules/execution-result/services';

import { ExecutionResultController } from './execution-result.controller';
import { AuthService } from '../auth/services';
import { UserModule } from '../user';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([
      { name: ExecutionResult.name, schema: ExecutionResultSchema },
    ]),
  ],
  providers: [ExecutionResultService, AuthService],
  controllers: [ExecutionResultController],
  exports: [ExecutionResultService],
})
export class ExecutionResultModule {}
