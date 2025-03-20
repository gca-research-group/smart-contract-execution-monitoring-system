import { TestBed } from '@angular/core/testing';

import { appConfig } from '@app/__tests__/app.config';

import { SmartContractService } from './smart-contract.service';

describe('SmartContractService', () => {
  let service: SmartContractService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [...appConfig.providers],
    });
    service = TestBed.inject(SmartContractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
