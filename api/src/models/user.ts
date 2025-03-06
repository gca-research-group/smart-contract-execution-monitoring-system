import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 250 })
  name: string;

  @Column({ length: 250, unique: true })
  email: string;

  @Column({ length: 250 })
  photo: string;

  @Column({ length: 250, select: false })
  password: string;

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
