import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';

import { CreateSmartContractDto } from '@app/dtos/smart-contract';
import { BlockchainPlatform, SmartContract, User } from '@app/models';

import { config } from '../typeorm.config';

export async function seed() {
  const connection = new DataSource({
    ...config,
    entities: [User, SmartContract],
  });

  await connection.initialize();
  const smartContractRepository = connection.getRepository(SmartContract);

  const data: CreateSmartContractDto[] = [];

  for (let index = 0; index < 100; index++) {
    data.push({
      name: faker.internet.username(),
      blockchainPlatform: BlockchainPlatform.HYPERLEDGER_FABRIC,
    });
  }

  await smartContractRepository.insert(data);

  await connection.destroy();
}
