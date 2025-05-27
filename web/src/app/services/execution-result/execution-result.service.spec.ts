import { TestBed } from '@angular/core/testing';

import { appConfig } from '@app/__tests__/app.config';

import { ExecutionResultService } from './execution-result.service';

describe('ExecutionResultService', () => {
  let service: ExecutionResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [...appConfig.providers],
    });
    service = TestBed.inject(ExecutionResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
