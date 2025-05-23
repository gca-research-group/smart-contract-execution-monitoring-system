import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class ExecutionResult {
  @Prop()
  smartContractId: string;

  @Prop({ type: MongooseSchema.Types.Mixed })
  event: unknown;
}

export const ExecutionResultSchema =
  SchemaFactory.createForClass(ExecutionResult);
export type ExecutionResultDocument = HydratedDocument<ExecutionResult>;
