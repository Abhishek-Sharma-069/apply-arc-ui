import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css'],
})
export class Sidebar {
  menuItems = [
    { icon: 'bi-house-fill', label: 'Dashboard', id: 'dashboard', route: '/dashboard' },
    { icon: 'bi-briefcase', label: 'Jobs', id: 'jobs', route: '/jobs' },
    { icon: 'bi-person', label: 'Profile', id: 'profile', route: '/profile' },
    { icon: 'bi-graph-up', label: 'Analytics', id: 'analytics', route: '/analytics' },
    { icon: 'bi-chat-dots', label: 'Messages', id: 'messages', route: '/messages' },
    { icon: 'bi-gear-fill', label: 'Settings', id: 'settings', route: '/settings' },
  ];

  activeItem = 'dashboard';

  constructor(private router: Router) {
    this.updateActiveItem();
  }

  selectItem(item: any) {
    this.activeItem = item.id;
    this.router.navigate([item.route]);
  }

  isActive(itemId: string): boolean {
    return this.activeItem === itemId;
  }

  private updateActiveItem() {
    const currentUrl = this.router.url;
    const item = this.menuItems.find((m) => currentUrl.includes(m.id));
    if (item) {
      this.activeItem = item.id;
    }
  }
}

