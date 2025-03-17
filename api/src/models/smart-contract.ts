import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { BlockchainPlatform } from './blockchain';

@Entity({ name: 'smartcontracts' })
export class SmartContract {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  blockchainPlatform: BlockchainPlatform;

  @Column('text')
  content: string;

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
