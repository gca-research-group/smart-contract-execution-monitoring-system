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

import { ExecutionResult } from '@app/models';

@Component({
  selector: 'app-execution-result-dialog',
  templateUrl: './execution-result-dialog.component.html',
  styleUrl: './execution-result-dialog.component.scss',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    JsonPipe,

    TranslateModule,
  ],
})
export class ExecutionResultDialogComponent {
  readonly dialogRef = inject(MatDialogRef<ExecutionResultDialogComponent>);

  readonly data = inject<ExecutionResult>(MAT_DIALOG_DATA);

  ok() {
    this.dialogRef.close();
  }
}
