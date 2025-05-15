import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';

import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BaseSelectorDirective } from '@app/directives/base';
import { SmartContractService } from '@app/services/smart-contract';
import { CRUD_SERVICE } from '@app/tokens';

import { SelectComponent } from '../select';

@Component({
  selector: 'app-smart-contract-selector',
  templateUrl: './smart-contract-selector.component.html',
  styleUrl: './smart-contract-selector.component.scss',
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
export class SmartContractSelectorComponent extends BaseSelectorDirective {}
