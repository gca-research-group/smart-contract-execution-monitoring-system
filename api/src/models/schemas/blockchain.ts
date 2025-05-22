import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { BlockchainPlatform } from '../enums';

export const BLOCKCHAIN_CONFIG = {
  HYPERLEDGER_FABRIC: [
    {
      field: 'mspId',
      type: 'string',
      description: 'Org1MSP',
    },
    {
      field: 'peerEndpoint',
      type: 'string',
      description: 'localhost:7051',
    },
    {
      field: 'peerHostAlias',
      type: 'string',
      description: 'peer0.org1.example.com',
    },
    {
      field: 'channel',
      description: '',
      type: 'string',
    },
    {
      field: 'signcert',
      description:
        'You can find it at crypto-materials/peerOrganizations/org*/users/User*@org*/msp/signcerts',
      type: 'text',
    },
    {
      field: 'keystore',
      description:
        'You can find it at crypto-materials/peerOrganizations/org*/users/User*@org*/msp/keystore',
      type: 'text',
    },
    {
      field: 'cacrt',
      description:
        'You can find it at crypto-materials/peerOrganizations/org*/peers/peer*/tls/ca.crt',
      type: 'text',
    },
  ],
};

@Schema({ timestamps: true })
export class Blockchain {
  @Prop()
  name: string;

  @Prop()
  platform: BlockchainPlatform;

  @Prop({ type: MongooseSchema.Types.Mixed })
  parameters: unknown;
}

export const BlockchainSchema = SchemaFactory.createForClass(Blockchain);
export type BlockchainDocument = HydratedDocument<Blockchain>;
