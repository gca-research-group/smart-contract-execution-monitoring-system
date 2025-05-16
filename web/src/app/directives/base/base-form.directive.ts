import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';

import { Location } from '@angular/common';
import { Directive, inject, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { CrudService } from '@app/models';
import { BreadcrumbService } from '@app/services/breadcrumb';
import { BREADCRUMB, CRUD_SERVICE } from '@app/tokens';
import { removeEmptyKeys } from '@app/utils';

@Directive()
export abstract class BaseFormDirective<
    T extends object,
    R extends Record<string, FormControl | FormGroup | FormArray>,
  >
  implements OnDestroy, OnInit
{
  protected formBuilder = inject(FormBuilder);
  protected breadcrumbService = inject(BreadcrumbService);
  protected service = inject<CrudService<T>>(CRUD_SERVICE);
  protected location = inject(Location);
  protected activatedRoute = inject(ActivatedRoute);
  protected toastr = inject(ToastrService);

  protected breadCrumbs = inject(BREADCRUMB);

  form!: FormGroup<R>;
  loading = false;

  constructor() {
    this.buildForm();
    this.updateBreadcrumb();
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'] as unknown as number;
    if (id) {
      this.updateFormOnUpdateInitialization();
      this.find(id);
      this.breadcrumbService.update([...this.breadCrumbs, { label: 'edit' }]);
    }
  }

  ngOnDestroy(): void {
    this.breadcrumbService.reset();
  }

  protected abstract buildForm(): void;
  protected abstract updateFormOnUpdateInitialization(): void;

  protected updateBreadcrumb() {
    this.breadcrumbService.update([
      ...this.breadCrumbs,
      {
        label: 'add',
      },
    ]);
  }

  protected find(id: number | string) {
    this.service.findById(id).subscribe({
      next: (item: T) => {
        this.patchValue(item);
      },
    });
  }

  protected patchValue(item: T) {
    this.form.patchValue({
      ...item,
    });
  }

  save() {
    if (this.form.invalid) {
      this.toastr.warning('INVALID_FORM');
      return;
    }

    this.loading = true;
    this.service
      .save(removeEmptyKeys(this.form.value))
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
      )
      .subscribe({
        next: () => {
          const message = this.form.value['id']
            ? 'RECORD_UPDATED_SUCCESSFULLY'
            : 'RECORD_CREATED_SUCCESSFULLY';

          this.toastr.success(message);
          this.location.back();
        },
      });
  }
}
