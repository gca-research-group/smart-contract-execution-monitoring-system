import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CustomControlValueAccessorDirective } from '@app/directives/custom-control-value-accessor';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrl: './input-form.component.scss',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class InputFormComponent
  extends CustomControlValueAccessorDirective
  implements OnInit
{
  @Input() label = '';
  @Input() type = 'text';
  @Input() formControlName!: string;
}
