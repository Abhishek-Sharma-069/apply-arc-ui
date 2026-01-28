import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabs.html',
  styleUrls: ['./tabs.css'],
})
export class Tabs {
  activeTab = 'COLUMN_VIEW';
  @Output() tabChanged = new EventEmitter<string>();

  tabs = [
    { id: 'COLUMN_VIEW', label: 'COLUMN VIEW' },
    { id: 'LIST_VIEW', label: 'LIST VIEW' },
    { id: 'SANKEY_VIEW', label: 'SANKEY VIEW' },
    { id: 'DATA_MANAGEMENT', label: 'DATA MANAGEMENT' },
  ];

  selectTab(tabId: string) {
    this.activeTab = tabId;
    this.tabChanged.emit(tabId);
  }

  isActive(tabId: string): boolean {
    return this.activeTab === tabId;
  }
}
