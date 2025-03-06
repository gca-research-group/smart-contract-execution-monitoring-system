import { User } from 'src/models';
import { config } from '../typeorm.config';
import { CreateUserDto } from 'src/models/dtos';
import { DataSource } from 'typeorm';
import { hashPassword } from 'src/common/utils';

async function seed() {
  const connection = new DataSource({ ...config, entities: [User] });
  await connection.initialize();

  const userRepository = connection.getRepository(User);

  const email = 'admin2@admin.com';
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

seed().catch((error) => {
  console.error('Seeding failed:', error);
});
