import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { IconComponent } from '@app/components/icon';
import { NgFor, NgIf } from '@angular/common';
import { IconButtonComponent } from '@app/components/icon-button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  imports: [
    MatSidenavModule,
    MatButtonModule,
    IconComponent,
    IconButtonComponent,
    RouterLink,
    NgFor,
    NgIf,
  ],
})
export class SidebarComponent {
  isCollapsed = true;

  items = [
    { label: 'Home', icon: 'home', url: '' },
    { label: 'Smart Contracts', icon: 'article', url: 'smart-contracts' },
    { label: 'Settings', icon: 'settings' },
  ];

  toggleMenu() {
    this.isCollapsed = !this.isCollapsed;
  }
}
