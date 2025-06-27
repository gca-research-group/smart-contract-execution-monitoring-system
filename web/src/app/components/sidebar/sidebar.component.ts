import { TranslateModule } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';

import { NgIf } from '@angular/common';
import {
  Component,
  HostListener,
  inject,
  input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDrawerMode, MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterLink } from '@angular/router';

import { IconComponent } from '@app/components/icon';
import { Sidebar } from '@app/models';
import { SidebarService } from '@app/services/sidebar';
import { IS_MOBILE } from '@app/tokens';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  imports: [
    MatSidenavModule,
    MatButtonModule,
    IconComponent,

    RouterLink,
    NgIf,

    TranslateModule,
  ],
})
export class SidebarComponent implements OnInit, OnDestroy {
  items = input<Sidebar[]>([]);

  private sidebarService = inject(SidebarService);

  private onDestroy$ = new Subject();

  private router = inject(Router);

  isMobile = inject(IS_MOBILE);

  currentIndex: number | null = null;
  isCollapsed = true;
  opened = this.isMobile ? false : true;
  autosize = this.isMobile ? false : true;
  mode: MatDrawerMode = this.isMobile ? 'over' : 'side';

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: HTMLElement) {
    const navbar = document.querySelector('mat-sidenav');

    const isCloseButton =
      targetElement.tagName.toLowerCase() === 'mat-icon' &&
      targetElement.getAttribute('aria-label') === 'close';

    const clickedInside = navbar?.contains(targetElement) || isCloseButton;

    if (!clickedInside && !this.isCollapsed) {
      this.sidebarService.collapse();
    }
  }

  ngOnInit(): void {
    this.sidebarService.isCollapsed$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(value => {
        this.isCollapsed = value;
        if (this.isMobile) {
          this.opened = !value;
        }
      });

    this.setCurrentIndexBasedOnCurrentRoute();
  }

  ngOnDestroy(): void {
    this.onDestroy$.unsubscribe();
  }

  setCurrentIndexBasedOnCurrentRoute() {
    const url = this.router.url.substring(1).split('?')[0];
    this.currentIndex = this.items().findIndex(item => item.url === url);
  }
}
