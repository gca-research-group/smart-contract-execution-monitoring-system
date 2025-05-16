import { Column, Entity } from 'typeorm';

import { BaseModel } from './base-model';
import { BlockchainPlatform } from './enums';

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

@Entity({ name: 'blockchains' })
export class Blockchain extends BaseModel {
  @Column()
  name: string;

  @Column()
  platform: BlockchainPlatform;

  @Column()
  parameters: string;
}
