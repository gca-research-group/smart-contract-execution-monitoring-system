import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { BaseModel } from './base-model';
import { SmartContract } from './smart-contract';
import { SmartContractClauseArgument } from './smart-contract-clause-agument';

@Entity({ name: 'smart_contract_clauses' })
export class SmartContractClause extends BaseModel {
  @Column()
  name: string;

  @Column()
  smartContractId: number;

  @ManyToOne(() => SmartContract, (smartContract) => smartContract.clauses)
  smartContract: SmartContract;

  @OneToMany(() => SmartContractClauseArgument, (argument) => argument.clause, {
    cascade: true,
  })
  arguments: SmartContractClauseArgument[];
}
