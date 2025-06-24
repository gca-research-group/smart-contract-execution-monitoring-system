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
export type ArgumentDocument = HydratedDocument<Argument>;

@Schema()
class Clause {
  @Prop()
  name: string;

  @Prop({ type: [ArgumentSchema], default: [] })
  clauseArguments: ArgumentDocument[];
}

const ClauseSchema = SchemaFactory.createForClass(Clause);
export type ClauseDocument = HydratedDocument<Clause>;

@Schema()
class File {
  @Prop()
  name: string;

  @Prop()
  content: string;
}

const FileSchema = SchemaFactory.createForClass(File);
export type FileDocument = HydratedDocument<File>;

@Schema({ timestamps: true })
export class SmartContract {
  @Prop()
  name: string;

  @Prop()
  blockchainPlatform: BlockchainPlatform;

  @Prop()
  content: string;

  @Prop({ type: [ClauseSchema], default: [] })
  clauses: ClauseDocument[];

  @Prop({ type: [FileSchema], default: [] })
  files: FileDocument[];

  @Prop({ default: true })
  status: boolean;

  @Prop()
  remarks: string;
}

export const SmartContractSchema = SchemaFactory.createForClass(SmartContract);
export type SmartContractDocument = HydratedDocument<SmartContract>;
