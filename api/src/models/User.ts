import {
  AutoIncrement,
  Column,
  CreatedAt,
  DataType,
  Model,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt,
} from 'sequelize-typescript';
import { UserRoles } from '@app/enums';

@Table
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  name: string;

  @Unique
  @Column
  email: string;

  @Column
  password: string;

  @Column
  isSuper: boolean;

  @Column({
    type: DataType.ENUM(...Object.values(UserRoles))
  })
  role: UserRoles;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
