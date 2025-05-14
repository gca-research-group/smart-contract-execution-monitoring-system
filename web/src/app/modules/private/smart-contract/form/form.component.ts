import { TranslateModule } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';

import { Location, NgForOf } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { ActivatedRoute } from '@angular/router';

import { BlockchainPlatformSelectorComponent } from '@app/components/blockchain-platform-selector';
import { ButtonComponent } from '@app/components/button';
import { DeleteDialogComponent } from '@app/components/delete-dialog';
import { FileUploaderComponent } from '@app/components/file-uploader';
import { IconButtonComponent } from '@app/components/icon-button';
import { InputComponent } from '@app/components/input';
import { SmartContract } from '@app/models';
import { BreadcrumbService } from '@app/services/breadcrumb';
import { SmartContractService } from '@app/services/smart-contract';

const BREADCRUMB = [
  {
    label: 'home',
    url: '/',
  },
  {
    label: 'smart-contracts',
    url: '/smart-contract',
  },
];

@Component({
  selector: 'app-smart-contract-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  host: { class: 'd-md-flex d-sm-block justify-content-center' },
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgForOf,

    InputComponent,
    ButtonComponent,
    IconButtonComponent,
    BlockchainPlatformSelectorComponent,
    FileUploaderComponent,

    MatExpansionModule,
    TranslateModule,
  ],
})
export class FormComponent implements OnInit, OnDestroy {
  form!: FormGroup<{
    id: FormControl<number | null>;
    name: FormControl<string | null>;
    blockchainPlatform: FormControl<string | null>;
    files: FormControl<string[]>;
    clauses: FormArray;
  }>;

  private formBuilder = inject(FormBuilder);
  private breadcrumbService = inject(BreadcrumbService);
  private service = inject(SmartContractService);
  private location = inject(Location);
  private activatedRoute = inject(ActivatedRoute);
  loading = false;

  private toastr = inject(ToastrService);
  readonly dialog = inject(MatDialog);

  get clauses() {
    return this.form.get('clauses') as FormArray;
  }

  constructor() {
    this.form = this.formBuilder.group({
      id: new FormControl(),
      name: new FormControl('', [Validators.required]),
      blockchainPlatform: new FormControl('HYPERLEDGER_FABRIC', [
        Validators.required,
      ]),
      files: new FormControl(),
      clauses: this.formBuilder.array([]),
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
      next: item => {
        for (const clause of item.clauses ?? []) {
          this.addClause(false);
          const index = this.clauses.length - 1;

          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          for (const argument of clause.arguments ?? []) {
            this.addArgument(index);
          }
        }

        this.form.patchValue({
          ...item,
        });
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
      .save({ ...this.form.value } as unknown as SmartContract)
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

  addClause(addArgument = true) {
    this.clauses.push(
      this.formBuilder.group({
        id: null,
        name: [null, [Validators.required]],
        arguments: this.formBuilder.array([]),
      }),
    );

    if (addArgument) {
      const index = this.clauses.length - 1;
      this.addArgument(index);
    }
  }

  addArgument(index: number) {
    const _arguments = this.clauses.at(index).get('arguments') as FormArray;

    _arguments.push(
      this.formBuilder.group({
        id: null,
        name: [null, [Validators.required]],
        type: [null, [Validators.required]],
      }),
    );
  }

  removeClause(index: number) {
    const clause = this.clauses.at(index);
    const _arguments = clause.get('arguments') as FormArray<
      FormGroup<{
        name: FormControl<string | null>;
        type: FormControl<string | null>;
      }>
    >;

    if (!!clause.get('name')?.value || _arguments.value.length) {
      const dialogRef = this.dialog.open(DeleteDialogComponent, {
        data: true,
      });

      dialogRef.afterClosed().subscribe((value: boolean) => {
        if (value) {
          this.clauses.removeAt(index);
        }
      });

      return;
    }

    this.clauses.removeAt(index);
  }

  removeArgument(clauseIndex: number, argumentIndex: number) {
    const _arguments = this.clauses
      .at(clauseIndex)
      .get('arguments') as FormArray<
      FormGroup<{
        name: FormControl<string | null>;
        type: FormControl<string | null>;
      }>
    >;

    const _argument = _arguments.at(argumentIndex);

    if (!!_argument.get('name')?.value || _argument.get('type')?.value) {
      const dialogRef = this.dialog.open(DeleteDialogComponent, {
        data: true,
      });

      dialogRef.afterClosed().subscribe((value: boolean) => {
        if (value) {
          _arguments.removeAt(argumentIndex);
        }
      });

      return;
    }

    _arguments.removeAt(argumentIndex);
  }
}
