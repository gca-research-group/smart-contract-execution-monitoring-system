import { ComponentFixture, TestBed } from '@angular/core/testing';

import { appConfig } from '@app/app.config';

import { BlockchainPlatformSelectorComponent } from './blockchain-platform-selector.component';

describe('BlockchainPlatformSelectorComponent', () => {
  let component: BlockchainPlatformSelectorComponent;
  let fixture: ComponentFixture<BlockchainPlatformSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [appConfig.providers],
      imports: [BlockchainPlatformSelectorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BlockchainPlatformSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
