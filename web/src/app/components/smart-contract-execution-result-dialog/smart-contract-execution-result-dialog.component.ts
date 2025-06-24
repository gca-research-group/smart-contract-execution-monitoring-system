import { TranslateModule } from '@ngx-translate/core';

import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

import { SmartContractExecution } from '@app/models';
import { IsJsonPipe } from '@app/pipes';

@Component({
  selector: 'app-smart-contract-execution-result-dialog',
  templateUrl: './smart-contract-execution-result-dialog.component.html',
  styleUrl: './smart-contract-execution-result-dialog.component.scss',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,

    JsonPipe,

    IsJsonPipe,

    TranslateModule,
  ],
})
export class SmartContractExecutionResultDialogComponent {
  readonly dialogRef = inject(
    MatDialogRef<SmartContractExecutionResultDialogComponent>,
  );

  readonly data = inject<SmartContractExecution>(MAT_DIALOG_DATA);

  ok() {
    this.dialogRef.close();
  }
}
