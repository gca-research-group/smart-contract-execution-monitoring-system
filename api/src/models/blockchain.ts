import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum BlockchainType {
  HYPERLEDGER_FABRIC = 'HYPERLEDGER_FABRIC',
}

@Entity({ name: 'blockchains' })
export class Blockchain {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: BlockchainType;

  @Column()
  parameters: string;

  @Column({ default: true })
  status: boolean;

  @Column('text')
  remarks: string;

  @Column('int')
  createdById: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column('int')
  updatedById: number;

  @UpdateDateColumn()
  updatedAt: Date;
}
