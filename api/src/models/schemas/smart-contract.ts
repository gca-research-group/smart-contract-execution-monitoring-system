import { HydratedDocument } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { BlockchainPlatform } from '../enums';

export type SmartContractDocument = HydratedDocument<SmartContract>;

@Schema()
export class Argument {
  @Prop()
  name: string;

  @Prop()
  type: string;
}

export const ArgumentSchema = SchemaFactory.createForClass(Argument);

@Schema()
export class Clause {
  @Prop()
  name: string;

  @Prop({ type: [Argument], default: [] })
  arguments: Argument[];
}

export const ClauseSchema = SchemaFactory.createForClass(Clause);

@Schema()
export class File {
  @Prop()
  name: string;

  @Prop()
  content: string;
}

export const FileSchema = SchemaFactory.createForClass(File);

@Schema({ timestamps: true })
export class SmartContract {
  @Prop()
  name: string;

  @Prop()
  blockchainPlatform: BlockchainPlatform;

  @Prop()
  content: string;

  @Prop({ type: [ClauseSchema] })
  clauses: Clause[];

  @Prop({ type: [FileSchema] })
  files: File[];
}

export const SmartContractSchema = SchemaFactory.createForClass(SmartContract);
