import { DataSource } from 'typeorm';

import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppTestingModule } from '@app/app-testing.module';
import { User } from '@app/models';
import { UserService } from '@app/services/user';

import { UserController } from './user.controller';

describe('UserController', () => {
  let controller: UserController;
  let dataSource: DataSource;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppTestingModule, TypeOrmModule.forFeature([User])],
      providers: [UserService],
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
    dataSource = module.get<DataSource>(DataSource);
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
