import { Column, Entity } from 'typeorm';

import { Base } from './base-model';
import { BlockchainPlatform } from './blockchain';

@Entity({ name: 'smartcontracts' })
export class SmartContract extends Base {
  @Column()
  name: string;

  @Column()
  blockchainPlatform: BlockchainPlatform;

  @Column('text')
  content: string;
}
