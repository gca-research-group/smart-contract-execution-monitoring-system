import { Column, Entity } from 'typeorm';

import { BaseModel } from './base-model';
import { BlockchainPlatform } from './blockchain';

@Entity({ name: 'smartcontracts' })
export class SmartContract extends BaseModel {
  @Column()
  name: string;

  @Column()
  blockchainPlatform: BlockchainPlatform;

  @Column('text')
  content: string;
}
