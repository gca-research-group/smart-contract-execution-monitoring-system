import { ComponentFixture, TestBed } from '@angular/core/testing';

import { appConfig } from '@app/__tests__/app.config';

import { SmartContractClauseSelectorComponent } from './smart-contract-clause-selector.component';

describe('SmartContractClauseSelectorComponent', () => {
  let component: SmartContractClauseSelectorComponent;
  let fixture: ComponentFixture<SmartContractClauseSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmartContractClauseSelectorComponent],
      providers: [...appConfig.providers],
    }).compileComponents();

    fixture = TestBed.createComponent(SmartContractClauseSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
