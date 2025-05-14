import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseModel } from './base-model';
import { SmartContract } from './smart-contract';

@Entity({ name: 'smart_contract_files' })
export class SmartContractFile extends BaseModel {
  @Column()
  name: string;

  @Column()
  content: string;

  @Column()
  smartContractId: number;

  @ManyToOne(() => SmartContract, (smartContract) => smartContract.files)
  smartContract: SmartContract;
}
