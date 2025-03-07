import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { AppTestingModule } from 'src/app-testing.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models';
import { DataSource } from 'typeorm';

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
