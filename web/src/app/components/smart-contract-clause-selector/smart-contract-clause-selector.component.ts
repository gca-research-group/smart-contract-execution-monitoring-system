import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';

import { Component, effect, input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BaseSelectorDirective } from '@app/directives/base';
import { SmartContractService } from '@app/services/smart-contract';
import { CRUD_SERVICE } from '@app/tokens';

import { SelectComponent } from '../select';

@Component({
  selector: 'app-smart-contract-clause-selector',
  templateUrl: './smart-contract-clause-selector.component.html',
  styleUrl: './smart-contract-clause-selector.component.scss',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    TranslateModule,
    SelectComponent,
  ],
  providers: [
    {
      provide: CRUD_SERVICE,
      useClass: SmartContractService,
    },
  ],
})
export class SmartContractClauseSelectorComponent extends BaseSelectorDirective {
  smartContractId = input<string | null>();

  constructor() {
    super();
    effect(() => {
      this.findItens();
    });
  }

  override writeValue(event: unknown): void {
    const value =
      (event as { target: { value: unknown } })?.target?.value || event;

    if (value !== this.formControl.value) {
      this.formControl.setValue(value, { emitEvent: false });
      this.formControl.updateValueAndValidity();
      this.cdr.detectChanges();
    }
  }

  override findItens() {
    if (!this.smartContractId()) {
      return;
    }

    this.service.findById(this.smartContractId()!).subscribe({
      next: response => {
        this.items.set(
          (
            response as { clauses: { _id: string; name: string }[] }
          ).clauses.map(item => ({ id: item._id, name: item.name })),
        );
      },
    });
  }
}
