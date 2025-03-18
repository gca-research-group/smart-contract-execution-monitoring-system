import { Column, Entity } from 'typeorm';

import { BaseModel } from './base-model';

export type HyperledgerFabricConfig = {
  mspId: string;
  signcert: string;
  keystore: string;
  cacrt: string;
  peerEndpoint: string;
  peerHostAlias: string;
};

export const BLOCKCHAIN_CONFIG = {
  HYPERLEDGER_FABRIC: [
    {
      field: 'mspId',
      type: 'text',
    },
    {
      field: 'signcert',
      type: 'text',
    },
    {
      field: 'keystore',
      type: 'text',
    },
    {
      field: 'cacrt',
      type: 'text',
    },
    {
      field: 'peerEndpoint',
      type: 'text',
    },
    {
      field: 'peerHostAlias',
      type: 'text',
    },
  ],
};

export enum BlockchainPlatform {
  HYPERLEDGER_FABRIC = 'HYPERLEDGER_FABRIC',
}

@Entity({ name: 'blockchains' })
export class Blockchain extends BaseModel {
  @Column()
  name: string;

  @Column()
  platform: BlockchainPlatform;

  @Column()
  parameters: string;
}
