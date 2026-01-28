import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Job } from '../../services/job.service';

/**
 * Data Management Component
 * 
 * Child component that displays jobs in a table format.
 * Emits events to parent component for edit and delete operations.
 * Modal is handled at the parent level.
 */
@Component({
  selector: 'app-data-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './data-management.html',
  styleUrls: ['./data-management.css'],
})
export class DataManagement {
  // Input: array of jobs to display
  @Input() jobs: Job[] = [];
  
  // Output: emitted when a job edit button is clicked
  @Output() jobEdited = new EventEmitter<string>();
  
  // Output: emitted when a job is deleted
  @Output() jobDeleted = new EventEmitter<string>();

  constructor() {}

  /**
   * Handles edit button click
   * Emits the job ID to parent component
   * @param jobId - ID of the job to edit
   */
  editJob(jobId: string | undefined) {
    if (jobId) {
      this.jobEdited.emit(jobId);
    }
  }

  /**
   * Deletes a job by emitting jobDeleted event to parent
   * Parent component handles the actual service call
   * @param jobId - ID of the job to delete
   */
  deleteJob(jobId: string | undefined) {
    if (jobId) {
      this.jobDeleted.emit(jobId);
    }
  }

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
}
