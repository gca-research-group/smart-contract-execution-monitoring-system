import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

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
