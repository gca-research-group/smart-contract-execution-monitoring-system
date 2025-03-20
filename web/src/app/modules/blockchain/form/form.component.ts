import { TranslateModule } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, finalize } from 'rxjs';

import { Location } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { BlockchainPlatformSelectorComponent } from '@app/components/blockchain-platform-selector';
import { ButtonComponent } from '@app/components/button';
import { InputComponent } from '@app/components/input';
import { Blockchain } from '@app/models';
import { BlockchainService } from '@app/services/blockchain';
import { BreadcrumbService } from '@app/services/breadcrumb';

const BREADCRUMB = [
  {
    label: 'home',
    url: '/',
  },
  {
    label: 'blockchain',
    url: '/blockchain',
  },
];

@Component({
  selector: 'app-blockchain-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  host: { class: 'd-md-flex d-sm-block justify-content-center' },
  imports: [
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    InputComponent,
    ButtonComponent,
    BlockchainPlatformSelectorComponent,
  ],
})
export class FormComponent implements OnInit, OnDestroy {
  form!: FormGroup<{
    id: FormControl<number | null>;
    name: FormControl<string | null>;
    platform: FormControl<string | null>;
    parameters: FormGroup;
  }>;

  private formBuilder = inject(FormBuilder);
  private breadcrumbService = inject(BreadcrumbService);
  private service = inject(BlockchainService);
  private location = inject(Location);
  private activatedRoute = inject(ActivatedRoute);
  loading = false;

  private toastr = inject(ToastrService);

  parameters: { field: string; type: string }[] = [];

  parametersValues: object = {};

  constructor() {
    this.form = this.formBuilder.group({
      id: new FormControl(),
      name: new FormControl('', [Validators.required]),
      platform: new FormControl('HYPERLEDGER_FABRIC', [Validators.required]),
      parameters: this.formBuilder.group({}),
    });

    this.breadcrumbService.update([
      ...BREADCRUMB,
      {
        label: 'add',
      },
    ]);

    this.updateParameters();
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'] as unknown as number;

    if (id) {
      this.find(id);
      this.breadcrumbService.update([...BREADCRUMB, { label: 'edit' }]);
    }
  }

  ngOnDestroy(): void {
    this.breadcrumbService.reset();
  }

  private updateParameters() {
    this.form
      .get('platform')
      ?.valueChanges.pipe(debounceTime(300))
      .subscribe(value => {
        if (!value) {
          return;
        }

        this.service.config(value).subscribe({
          next: items => {
            const group = this.form.get('parameters') as FormGroup;
            Object.keys(group.value as object).map(key => {
              group.removeControl(key);
            });

            items?.map(item => {
              group.addControl(
                item.field,
                new FormControl('', [Validators.required]),
              );
            });

            this.parameters = items ?? [];
            this.form.get('parameters')?.patchValue(this.parametersValues);
          },
          error: (error: { message: string }) => {
            console.error('[error]', error);
          },
        });
      });
  }

  find(id: number) {
    this.service.findById(id).subscribe({
      next: item => {
        this.form.patchValue({
          ...item,
        });

        this.parametersValues = item.parameters;
      },
    });
  }

  save() {
    if (this.form.invalid) {
      this.toastr.warning('INVALID_FORM');
      return;
    }

    this.loading = true;
    this.service
      .save({ ...this.form.value } as unknown as Blockchain)
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
      )
      .subscribe({
        next: () => {
          const message = this.form.value.id
            ? 'RECORD_UPDATED_SUCCESSFULLY'
            : 'RECORD_CREATED_SUCCESSFULLY';

          this.toastr.success(message);
          this.location.back();
        },
      });
  }
}
