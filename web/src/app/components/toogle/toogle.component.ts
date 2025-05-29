import { Component, input } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-toogle',
  templateUrl: './toogle.component.html',
  styleUrl: './toogle.component.scss',
  imports: [MatSlideToggleModule],
})
export class ToogleComponent {
  label = input<string>();
}
