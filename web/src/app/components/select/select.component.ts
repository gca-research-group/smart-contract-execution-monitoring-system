import { TranslateModule } from '@ngx-translate/core';

import { NgTemplateOutlet } from '@angular/common';
import { Component, input, TemplateRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { CustomControlValueAccessorDirective } from '@app/directives/custom-control-value-accessor';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    NgTemplateOutlet,
  ],
})
export class SelectComponent extends CustomControlValueAccessorDirective {
  label = input<string>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items = input<{ id: any; name: string }[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  template = input<TemplateRef<any> | null>(null);
}
