import { TestBed } from '@angular/core/testing';

import { appConfig } from '@app/__tests__/app.config';

import { BlockchainService } from './blockchain.service';

describe('BlockchainService', () => {
  let service: BlockchainService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [...appConfig.providers] });
    service = TestBed.inject(BlockchainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
