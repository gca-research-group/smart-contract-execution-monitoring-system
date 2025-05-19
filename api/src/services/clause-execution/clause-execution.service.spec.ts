import { Test, TestingModule } from '@nestjs/testing';

import { AppTestingModule } from '@app/app-testing.module';

import { ClauseExecutionService } from './clause-execution.service';

describe('ClauseExecutionService', () => {
  let service: ClauseExecutionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppTestingModule],
      providers: [ClauseExecutionService],
    }).compile();

    service = module.get<ClauseExecutionService>(ClauseExecutionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
