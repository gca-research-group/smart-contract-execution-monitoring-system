import { Column, Entity } from 'typeorm';

import { BaseModel } from './base-model';

@Entity({ name: 'smart_contract_clause_arguments' })
export class SmartContractClauseArgument extends BaseModel {
  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  clauseId: number;
}
