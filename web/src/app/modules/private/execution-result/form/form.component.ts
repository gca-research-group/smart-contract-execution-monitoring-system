import { TranslateModule } from '@ngx-translate/core';

import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { BlockchainPlatformSelectorComponent } from '@app/components/blockchain-platform-selector';
import { ButtonComponent } from '@app/components/button';
import { SmartContractClauseSelectorComponent } from '@app/components/smart-contract-clause-selector';
import { SmartContractSelectorComponent } from '@app/components/smart-contract-selector';
import { BaseFormDirective } from '@app/directives/base';
import { ExecutionResult } from '@app/models';
import { ExecutionResultService } from '@app/services/execution-result';
import { BREADCRUMB, CRUD_SERVICE } from '@app/tokens';

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
    BlockchainPlatformSelectorComponent,
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
    smartContract: FormControl<string | null>;
    clause: FormControl<string | null>;
    blockchainPlatform: FormControl<string | null>;
  }
> {
  protected override service = inject<ExecutionResultService>(CRUD_SERVICE);

  protected override patchValue(item: ExecutionResult) {
    this.form.patchValue({
      smartContract: item.payload.smartContract.id,
      clause: item.payload.clause.id,
      blockchainPlatform: item.payload.blockchain.platform,
    });
  }

  protected override buildForm(): void {
    this.form = this.formBuilder.group({
      _id: new FormControl(),
      smartContract: new FormControl('', [Validators.required]),
      clause: new FormControl('', [Validators.required]),
      blockchainPlatform: new FormControl('HYPERLEDGER_FABRIC', [
        Validators.required,
      ]),
    });
  }

  protected override updateFormOnUpdateInitialization(): void {}
}
