import { Column, Entity } from 'typeorm';

import { BaseModel } from './base-model';

@Entity({ name: 'smart_contract_clauses' })
export class SmartContractClause extends BaseModel {
  @Column()
  name: string;

  @Column()
  smartContractId: number;
}
