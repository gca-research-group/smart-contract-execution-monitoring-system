import { TranslateModule } from '@ngx-translate/core';
import { finalize } from 'rxjs';

import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { BlockchainSelectorComponent } from '@app/components/blockchain-selector';
import { ButtonComponent } from '@app/components/button';
import { SmartContractClauseSelectorComponent } from '@app/components/smart-contract-clause-selector';
import { SmartContractSelectorComponent } from '@app/components/smart-contract-selector';
import { BaseFormDirective } from '@app/directives/base';
import { ExecutionResult } from '@app/models';
import { ExecutionResultService } from '@app/services/execution-result';
import { SmartContractService } from '@app/services/smart-contract';
import { BREADCRUMB, CRUD_SERVICE } from '@app/tokens';
import { removeEmptyKeys } from '@app/utils';

@Component({
  selector: 'app-execution-result-form',
  templateUrl: './form.component.html',
  styleUrls: ['./../../form.base.scss', './form.component.scss'],
  host: { class: 'd-md-flex d-sm-block justify-content-center' },
  imports: [
    ReactiveFormsModule,
    FormsModule,

    TranslateModule,

    ButtonComponent,
    BlockchainSelectorComponent,
    SmartContractSelectorComponent,
    SmartContractClauseSelectorComponent,
  ],
  providers: [
    {
      provide: BREADCRUMB,
      useValue: [
        {
          label: 'home',
          url: '/',
        },
        {
          label: 'execution-result',
          url: '/execution-result',
        },
      ],
    },
    {
      provide: CRUD_SERVICE,
      useClass: ExecutionResultService,
    },
  ],
})
export class FormComponent extends BaseFormDirective<
  ExecutionResult,
  {
    _id: FormControl<string | null>;
    blockchainId: FormControl<string | null>;
    smartContractId: FormControl<string | null>;
    clauseId: FormControl<string | null>;
  }
> {
  protected override service = inject<ExecutionResultService>(CRUD_SERVICE);
  private smartContractService = inject(SmartContractService);
  smartContractId: string | null = null;

  constructor() {
    super();
    this.form.get('smartContractId')?.valueChanges.subscribe(value => {
      this.smartContractId = value;
    });
  }

  protected override patchValue(item: ExecutionResult) {
    this.form.patchValue({
      blockchainId: item.payload.blockchain.id,
      smartContractId: item.payload.smartContract.id,
      clauseId: item.payload.clause.id,
    });
  }

  protected override buildForm(): void {
    this.form = this.formBuilder.group({
      _id: new FormControl(),
      blockchainId: new FormControl('', [Validators.required]),
      smartContractId: new FormControl('', [Validators.required]),
      clauseId: new FormControl('', [Validators.required]),
    });
  }

  protected override updateFormOnUpdateInitialization(): void {}

  execute() {
    if (this.form.invalid) {
      this.toastr.warning('INVALID_FORM');
      return;
    }

    this.loading = true;
    this.smartContractService
      .execute(removeEmptyKeys(this.form.value))
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
      )
      .subscribe({
        next: () => {
          const message = 'RECORD_CREATED_SUCCESSFULLY';

          this.toastr.success(message);
          this.location.back();
        },
      });
  }
}
