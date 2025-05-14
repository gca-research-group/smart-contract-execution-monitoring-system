import { Column, Entity, OneToMany } from 'typeorm';

import { BaseModel } from './base-model';
import { BlockchainPlatform } from './blockchain';
import { SmartContractClause } from './smart-contract-clause';
import { SmartContractFile } from './smart-contract-file';

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

  @OneToMany(() => SmartContractFile, (file) => file.smartContract, {
    cascade: true,
  })
  files: SmartContractFile[];
}
