import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Job Card Component
 * 
 * Displays a single job in card format with status badge.
 * Emits events to parent component for job operations.
 */
@Component({
  selector: 'app-job-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-card.html',
  styleUrls: ['./job-card.css'],
})
export class JobCard {
  // Input: job title
  @Input() jobTitle!: string;
  // Input: company name
  @Input() company!: string;
  // Input: job location
  @Input() location!: string;
  // Input: application date
  @Input() date!: string;
  // Input: job status
  @Input() status!: 'APPLIED' | 'INTERVIEW' | 'OFFER' | 'NOT_CHOSEN';
  // Input: job ID for operations
  @Input() jobId!: string;
  
  // Output: emitted when job is edited
  @Output() jobEdited = new EventEmitter<string>();
  
  // Output: emitted when job is deleted
  @Output() jobDeleted = new EventEmitter<string>();

  // Tracks whether the menu is open
  showMenu = false;

  /**
   * Returns the CSS classes for status background color
   * @returns CSS class string for background
   */
  getStatusColor(): string {
    const colors: { [key: string]: string } = {
      APPLIED: 'bg-blue-100',
      INTERVIEW: 'bg-orange-100',
      OFFER: 'bg-green-100',
      NOT_CHOSEN: 'bg-red-100',
    };
    return colors[this.status] || 'bg-gray-100';
  }

  /**
   * Returns the CSS classes for status text color
   * @returns CSS class string for text color
   */
  getStatusTextColor(): string {
    const colors: { [key: string]: string } = {
      APPLIED: 'text-blue-600',
      INTERVIEW: 'text-orange-600',
      OFFER: 'text-green-600',
      NOT_CHOSEN: 'text-red-600',
    };
    return colors[this.status] || 'text-gray-600';
  }

  /**
   * Toggles the menu visibility
   */
  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  /**
   * Emits edit event to parent component
   */
  onEdit() {
    this.jobEdited.emit(this.jobId);
    this.showMenu = false;
  }

  /**
   * Emits delete event to parent component
   */
  onDelete() {
    this.jobDeleted.emit(this.jobId);
  }
}
