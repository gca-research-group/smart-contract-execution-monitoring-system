import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { appConfig } from '@app/__tests__/app.config';

import { SmartContractExecutionResultDialogComponent } from './smart-contract-execution-result-dialog.component';

describe('SmartContractExecutionResultDialogComponent', () => {
  let component: SmartContractExecutionResultDialogComponent;
  let fixture: ComponentFixture<SmartContractExecutionResultDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmartContractExecutionResultDialogComponent],
      providers: [
        ...appConfig.providers,
        {
          provide: MatDialogRef,
          useValue: {},
        },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(
      SmartContractExecutionResultDialogComponent,
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
