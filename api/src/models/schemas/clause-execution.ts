import { HydratedDocument } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class ClauseExecutionArgument {
  @Prop()
  name: string;

  @Prop()
  value: string;
}

const ClauseExecutionArgumentSchema = SchemaFactory.createForClass(
  ClauseExecutionArgument,
);

@Schema()
export class ClauseExecution {
  @Prop()
  name: string;

  @Prop({ type: [ClauseExecutionArgumentSchema], default: [] })
  arguments: ClauseExecutionArgument[];
}

export const ClauseExecutionSchema =
  SchemaFactory.createForClass(ClauseExecution);

export type ClauseExecutionDocument = HydratedDocument<ClauseExecution>;
