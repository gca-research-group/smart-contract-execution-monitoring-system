import { DataSource } from 'typeorm';

import { Test, TestingModule } from '@nestjs/testing';

import { AppTestingModule } from '@app/app-testing.module';

import { AuthController } from './auth.controller';
import { UserModule } from '../user';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let dataSource: DataSource;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppTestingModule, UserModule],
      providers: [AuthService],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    dataSource = module.get<DataSource>(DataSource);
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
