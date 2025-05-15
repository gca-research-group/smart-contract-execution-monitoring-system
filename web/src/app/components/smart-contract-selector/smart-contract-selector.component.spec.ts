import { ComponentFixture, TestBed } from '@angular/core/testing';

import { appConfig } from '@app/__tests__/app.config';

import { SmartContractSelectorComponent } from './smart-contract-selector.component';

describe('SmartContractSelectorComponent', () => {
  let component: SmartContractSelectorComponent;
  let fixture: ComponentFixture<SmartContractSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmartContractSelectorComponent],
      providers: [...appConfig.providers],
    }).compileComponents();

    fixture = TestBed.createComponent(SmartContractSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
