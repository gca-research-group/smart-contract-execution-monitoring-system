import { TranslateModule } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';

import { Location } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { ButtonComponent } from '@app/components/button';
import { Channel } from '@app/models';
import { BreadcrumbService } from '@app/services/breadcrumb';

import { InputComponent } from '../../../components/input/input.component';
import { SmartContractsService } from '../services/smartcontracts.service';

const BREADCRUMB = [
  {
    label: 'home',
    url: '/',
  },
  {
    label: 'smartcontracts',
    url: '/smartcontracts',
  },
];

@Component({
  selector: 'app-smartcontracts-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  host: { class: 'd-md-flex d-sm-block justify-content-center' },
  imports: [
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    InputComponent,
    ButtonComponent
  ],
})
export class FormComponent implements OnInit, OnDestroy {
  form!: FormGroup<{
    id: FormControl<number | null>;
    name: FormControl<string | null>;
    blockchainType: FormControl<string | null>;
    content: FormControl<string | null>;
  }>;

  private formBuilder = inject(FormBuilder);
  private breadcrumbService = inject(BreadcrumbService);
  private service = inject(SmartContractsService);
  private location = inject(Location);
  private activatedRoute = inject(ActivatedRoute);
  loading = false;

  private toastr = inject(ToastrService);

  constructor() {
    this.form = this.formBuilder.group({
      id: new FormControl(),
      name: new FormControl('', [
        (control: AbstractControl) => Validators.required(control),
      ]),
      blockchainType: new FormControl('', [
        (control: AbstractControl) => Validators.required(control),
      ]),
      content: new FormControl('', [
        (control: AbstractControl) => Validators.required(control),
      ]),
    });

    this.breadcrumbService.update([
      ...BREADCRUMB,
      {
        label: 'add',
      },
    ]);
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

  find(id: number) {
    this.service.findById(id).subscribe({
      next: channel => {
        this.form.patchValue({
          ...channel
        });
      },
      error: (error: { message: string }) => {
        this.toastr.error(error.message, undefined, {
          closeButton: true,
          progressBar: true,
        });
      },
    });
  }

  save() {
    if (this.form.invalid) {
      this.toastr.warning('INVALID_FORM', undefined, {
        closeButton: true,
        progressBar: true,
      });
      return;
    }

    this.loading = true;
    this.service
      .save({ ...this.form.value } as unknown as Channel)
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

          this.toastr.success(message, undefined, {
            closeButton: true,
            progressBar: true,
          });
          this.location.back();
        },
        error: (error: { message: string }) => {
          this.toastr.error(error.message, undefined, {
            closeButton: true,
            progressBar: true,
          });
        },
      });
  }
}
