import { TestBed } from '@angular/core/testing';

import { appConfig } from '@app/__tests__/app.config';

import { SmartContractExecutionService } from './smart-contract-execution.service';

describe('SmartContractExecutionService', () => {
  let service: SmartContractExecutionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [...appConfig.providers],
    });
    service = TestBed.inject(SmartContractExecutionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
