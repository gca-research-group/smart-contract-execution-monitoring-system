import { TranslateModule } from '@ngx-translate/core';

import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CustomControlValueAccessorDirective } from '@app/directives/custom-control-value-accessor';

import { SelectComponent } from '../select';

@Component({
  selector: 'app-smart-contract-execution-status-selector',
  templateUrl: './smart-contract-execution-status-selector.component.html',
  styleUrl: './smart-contract-execution-status-selector.component.scss',
  imports: [FormsModule, ReactiveFormsModule, TranslateModule, SelectComponent],
})
export class SmartContractExecutionStatusSelectorComponent extends CustomControlValueAccessorDirective {
  items = [
    {
      id: 'ALL',
      name: 'all',
    },
    {
      id: 'SUCCESS',
      name: 'success',
    },
    {
      id: 'FAIL',
      name: 'fail',
    },
    {
      id: 'PENDING',
      name: 'pending',
    },
  ];
}
