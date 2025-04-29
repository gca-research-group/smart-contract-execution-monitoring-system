import { TranslateModule } from '@ngx-translate/core';

import { Component, effect, inject, input } from '@angular/core';
import { MatIcon, MatIconRegistry } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
  imports: [MatIcon, MatTooltip, TranslateModule],
  host: {
    '[style.--icon-color]': 'color()',
  },
})
export class IconComponent {
  icon = input<string>();
  svg = input<string>();
  filled = input<boolean>();
  tooltip = input<string>();

  color = input<string>();

  iconRegistry = inject(MatIconRegistry);
  sanitizer = inject(DomSanitizer);

  constructor() {
    effect(() => {
      if (this.icon() && this.svg()) {
        this.iconRegistry.addSvgIcon(
          this.icon()!,
          this.sanitizer.bypassSecurityTrustResourceUrl(this.svg()!),
        );
      }
    });
  }
}
