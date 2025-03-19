import { Column, Entity, OneToMany } from 'typeorm';

import { BaseModel } from './base-model';
import { BlockchainPlatform } from './blockchain';
import { SmartContractClause } from './smart-contract-clause';

@Entity({ name: 'smart_contracts' })
export class SmartContract extends BaseModel {
  @Column()
  name: string;

  @Column()
  blockchainPlatform: BlockchainPlatform;

  @Column('text')
  content: string;

  @OneToMany(() => SmartContractClause, (clause) => clause.smartContract, {
    cascade: true,
  })
  clauses: SmartContractClause[];
}
