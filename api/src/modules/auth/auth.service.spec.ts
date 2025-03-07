import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AppTestingModule } from 'src/app-testing.module';
import { DataSource } from 'typeorm';
import { UserModule } from '../user';

describe('AuthService', () => {
  let service: AuthService;
  let dataSource: DataSource;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppTestingModule, UserModule],
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    dataSource = module.get<DataSource>(DataSource);
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
