import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Job } from '../../services/job.service';

/**
 * List View Component
 * 
 * Displays jobs in a table format with quick actions.
 * Emits events to parent component for job operations.
 */
@Component({
  selector: 'app-list-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-view.html',
  styleUrls: ['./list-view.css'],
})
export class ListView {
  // Input: array of jobs to display
  @Input() jobs: Job[] = [];
  
  // Output: emitted when a job is edited
  @Output() jobEdited = new EventEmitter<string>();
  
  // Output: emitted when a job is deleted
  @Output() jobDeleted = new EventEmitter<string>();

  constructor() {}

  /**
   * Returns the CSS classes for status badge styling
   * @param status - The job status
   * @returns CSS class string for styling
   */
  getStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
      APPLIED: 'bg-blue-100 text-blue-600',
      INTERVIEW: 'bg-orange-100 text-orange-600',
      OFFER: 'bg-green-100 text-green-600',
      NOT_CHOSEN: 'bg-red-100 text-red-600',
    };
    return colors[status] || 'bg-gray-100 text-gray-600';
  }

  /**
   * Emits delete event to parent component
   * @param jobId - ID of the job to delete
   */
  deleteJob(jobId: string | undefined) {
    if (jobId) {
      this.jobDeleted.emit(jobId);
    }
  }

  /**
   * Emits edit event to parent component
   * @param jobId - ID of the job to edit
   */
  editJob(jobId: string | undefined) {
    if (jobId) {
      this.jobEdited.emit(jobId);
    }
  }
}
