import { DataSource } from 'typeorm';

import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppTestingModule } from '@app/app-testing.module';
import { User } from '@app/models';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let dataSource: DataSource;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppTestingModule, TypeOrmModule.forFeature([User])],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
    dataSource = module.get<DataSource>(DataSource);
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
