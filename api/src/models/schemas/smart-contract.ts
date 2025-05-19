import { HydratedDocument } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { BlockchainPlatform } from '../enums';

@Schema()
class Argument {
  @Prop()
  name: string;

  @Prop()
  type: string;
}

const ArgumentSchema = SchemaFactory.createForClass(Argument);

@Schema()
class Clause {
  @Prop()
  name: string;

  @Prop({ type: [ArgumentSchema], default: [] })
  arguments: Argument[];
}

const ClauseSchema = SchemaFactory.createForClass(Clause);

@Schema()
class File {
  @Prop()
  name: string;

  @Prop()
  content: string;
}

const FileSchema = SchemaFactory.createForClass(File);

@Schema({ timestamps: true })
export class SmartContract {
  @Prop()
  name: string;

  @Prop()
  blockchainPlatform: BlockchainPlatform;

  @Prop()
  content: string;

  @Prop({ type: [ClauseSchema], default: [] })
  clauses: Clause[];

  @Prop({ type: [FileSchema], default: [] })
  files: File[];
}

export const SmartContractSchema = SchemaFactory.createForClass(SmartContract);
export type SmartContractDocument = HydratedDocument<SmartContract>;
