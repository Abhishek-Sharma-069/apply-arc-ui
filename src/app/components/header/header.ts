import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Stats {
  interviewRate: string;
  offerRate: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header {
  @Input() title!: string;
  @Input() stats!: Stats;
  
  // Output: emitted when Add Job button is clicked
  @Output() addJobClicked = new EventEmitter<void>();

  /**
   * Emits addJobClicked event to parent component
   */
  onAddJob() {
    this.addJobClicked.emit();
  }

  onRefresh() {
    console.log('Refresh clicked');
  }

  onEmail() {
    console.log('Email clicked');
  }

  onExport() {
    console.log('Export clicked');
  }
}
