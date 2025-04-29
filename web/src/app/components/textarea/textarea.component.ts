import { TranslateModule } from '@ngx-translate/core';

import { Component, input, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { CustomControlValueAccessorDirective } from '@app/directives/custom-control-value-accessor';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
})
export class TextAreaComponent
  extends CustomControlValueAccessorDirective
  implements OnInit
{
  label = input('');
  rows = input(10);
  cols = input(1);
}
