import { Component, inject } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { IconButtonComponent } from '../icon-button';
import { SidebarService } from '@app/services/sidebar';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
  imports: [MatToolbar, IconButtonComponent],
})
export class ToolbarComponent {
  isCollapsed = true;

  sidebarService = inject(SidebarService);

  toggleSadebar() {
    this.sidebarService.toggleSidebar();
    this.isCollapsed = !this.isCollapsed;
  }
}
