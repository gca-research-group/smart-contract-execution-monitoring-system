import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseModel } from './base-model';
import { SmartContractClause } from './smart-contract-clause';

@Entity({ name: 'smart_contract_clause_arguments' })
export class SmartContractClauseArgument extends BaseModel {
  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  clauseId: number;

  @ManyToOne(() => SmartContractClause, (clause) => clause.arguments)
  clause: SmartContractClause;
}
