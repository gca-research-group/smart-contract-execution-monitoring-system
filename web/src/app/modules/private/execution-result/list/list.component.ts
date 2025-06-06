import { TranslateModule } from '@ngx-translate/core';
import { interval, Subscription, tap } from 'rxjs';

import { NgStyle } from '@angular/common';
import { Component, OnDestroy, TemplateRef, viewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { DeleteDialogComponent } from '@app/components/delete-dialog';
import { ExecutionResultDialogComponent } from '@app/components/execution-result-dialog';
import { IconButtonComponent } from '@app/components/icon-button';
import { InputComponent } from '@app/components/input';
import { TableComponent } from '@app/components/table';
import { BaseListDirective } from '@app/directives/base';
import { Column, ColumnType, ExecutionResult } from '@app/models';
import { ExecutionResultService } from '@app/services/execution-result';
import { BREADCRUMB, CRUD_SERVICE } from '@app/tokens';

const COLUMNS: Column[] = [
  {
    id: 'succeeded',
    label: '',
    columnType: ColumnType.TEMPLATE,
    rowType: ColumnType.TEMPLATE,
    sortable: false,
  },
  {
    id: '_id',
    label: 'id',
  },
  {
    id: 'smartContract',
    label: 'smart-contract',
    rowType: ColumnType.TEMPLATE,
  },
  {
    id: 'blockchain',
    label: 'blockchain',
    rowType: ColumnType.TEMPLATE,
  },
  {
    id: 'createdAt',
    label: 'createdAt',
    rowType: ColumnType.DATETIME,
  },
  {
    id: 'actions',
    label: '',
    columnType: ColumnType.TEMPLATE,
    rowType: ColumnType.TEMPLATE,
    width: 150,
    sortable: false,
  },
];

@Component({
  selector: 'app-execution-result-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
    NgStyle,

    TranslateModule,

    IconButtonComponent,
    InputComponent,
    TableComponent,
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
          label: 'execution-results',
        },
      ],
    },
    {
      provide: CRUD_SERVICE,
      useClass: ExecutionResultService,
    },
  ],
})
export class ListComponent
  extends BaseListDirective<ExecutionResult, ExecutionResultService>
  implements OnDestroy
{
  columns = COLUMNS;

  displayedColumns = COLUMNS.map(column => column.id);

  private subscription?: Subscription;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private actionsColumn = viewChild<TemplateRef<any>>('actionsColumn');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private actionsRow = viewChild<TemplateRef<any>>('actionsRow');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private smartContractRow = viewChild<TemplateRef<any>>('smartContractRow');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private blockchainRow = viewChild<TemplateRef<any>>('blockchainRow');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private succeededRow = viewChild<TemplateRef<any>>('succeededRow');

  toggleAutoRefresh = true;

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.subscription?.unsubscribe();
  }

  protected updateForm() {
    this.form.addControl('id', new FormControl());
  }

  protected updateColumns() {
    this.columns = this.columns.map(column => {
      if (column.id === 'actions') {
        return {
          ...column,
          templateRow: this.actionsRow(),
          templateColumn: this.actionsColumn(),
        };
      }

      if (column.id === 'succeeded') {
        return {
          ...column,
          templateRow: this.succeededRow(),
        };
      }

      if (column.id === 'smartContract') {
        return {
          ...column,
          templateRow: this.smartContractRow(),
        };
      }

      if (column.id === 'blockchain') {
        return {
          ...column,
          templateRow: this.blockchainRow(),
        };
      }

      return column;
    });
  }

  override getCurrentItemId(
    item: ExecutionResult,
  ): string | number | null | undefined {
    return item._id;
  }

  updateRouteQueryParameters() {
    void this.router.navigate([], {
      queryParams: this.form.value as Record<string, string>,
      queryParamsHandling: 'merge',
    });
  }

  openExecutionResultDialog(item: ExecutionResult): void {
    this.dialog.open(ExecutionResultDialogComponent, {
      data: item,
      width: '60%',
    });
  }

  autoRefresh() {
    const TEN_SECONDS = 5000;

    this.subscription?.unsubscribe();

    this.subscription = interval(TEN_SECONDS)
      .pipe(
        tap(() => {
          if (!this.toggleAutoRefresh) {
            this.subscription?.unsubscribe();
            return;
          }
          this.search();
        }),
      )
      .subscribe();
  }

  deleteAll(): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe((value: boolean) => {
      if (value) {
        this.service.deleteAll().subscribe({
          next: () => {
            this.toastr.success('DELETED_SUCCESSFULLY');
            this.search();
          },
          error: error => {
            console.log('[error]', error);
          },
        });
      }
    });
  }
}
