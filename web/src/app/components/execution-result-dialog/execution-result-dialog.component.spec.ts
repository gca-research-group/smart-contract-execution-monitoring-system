import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutionResultDialogComponent } from './execution-result-dialog.component';

describe('ExecutionResultDialogComponent', () => {
  let component: ExecutionResultDialogComponent;
  let fixture: ComponentFixture<ExecutionResultDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExecutionResultDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExecutionResultDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
