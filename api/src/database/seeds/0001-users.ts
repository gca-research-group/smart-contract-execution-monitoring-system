import { DataSource } from 'typeorm';

import { hashPassword } from '@app/common/utils';
import { CreateUserDto } from '@app/dtos/user';
import { User } from '@app/models';

import { config } from '../typeorm.config';

export async function up() {
  const connection = new DataSource({ ...config, entities: [User] });
  await connection.initialize();

  const userRepository = connection.getRepository(User);

  const email = 'admin@admin.com';
  const password = hashPassword('admin');

  if (await userRepository.exists({ where: { email } })) {
    await connection.destroy();
    return;
  }

  const users: CreateUserDto[] = [
    {
      name: 'Admin',
      email,
      password,
    },
  ];

  await userRepository.insert(users);

  await connection.destroy();
}
