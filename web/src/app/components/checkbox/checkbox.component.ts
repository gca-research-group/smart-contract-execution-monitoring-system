import { Component, effect, input, model } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { CustomControlValueAccessorDirective } from '@app/directives/custom-control-value-accessor';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
  imports: [MatCheckboxModule, FormsModule, ReactiveFormsModule],
})
export class CheckboxComponent extends CustomControlValueAccessorDirective {
  label = input<string>();
  checked = input<boolean>(false);
  indeterminate = model<boolean>(false);
  disabled = model<boolean>(false);

  constructor() {
    super();
    effect(() => {
      this.formControl.setValue(this.checked());
    });
  }
}
