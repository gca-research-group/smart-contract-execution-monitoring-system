import { TranslateModule } from '@ngx-translate/core';

import { Component, TemplateRef, viewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

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

    TranslateModule,

    TableComponent,
    InputComponent,
    IconButtonComponent,
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
export class ListComponent extends BaseListDirective<
  ExecutionResult,
  ExecutionResultService
> {
  columns = COLUMNS;

  displayedColumns = COLUMNS.map(column => column.id);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private actionsColumn = viewChild<TemplateRef<any>>('actionsColumn');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private actionsRow = viewChild<TemplateRef<any>>('actionsRow');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private smartContractRow = viewChild<TemplateRef<any>>('smartContractRow');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private blockchainRow = viewChild<TemplateRef<any>>('blockchainRow');

  protected updateForm() {
    this.form.addControl('id', new FormControl());
    this.form.addControl('name', new FormControl());
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

  removeNullFields<T extends object>(obj: T): Partial<T> {
    return Object.fromEntries(
      Object.entries(obj).filter(([_index, value]) => value !== null),
    ) as Partial<T>;
  }

  openExecutionResultDialog(item: ExecutionResult): void {
    this.dialog.open(ExecutionResultDialogComponent, {
      data: item,
      width: '60%',
    });
  }
}
