import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ClauseExecution, ClauseExecutionSchema } from '@app/models/schemas';
import { AuthService } from '@app/services/auth';
import { ClauseExecutionService } from '@app/services/clause-execution';

import { ClauseExecutionController } from './clause-execution.controller';
import { UserModule } from '../user';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([
      { name: ClauseExecution.name, schema: ClauseExecutionSchema },
    ]),
  ],
  providers: [AuthService, ClauseExecutionService],
  controllers: [ClauseExecutionController],
  exports: [ClauseExecutionService],
})
export class ClauseExecutionModule {}
