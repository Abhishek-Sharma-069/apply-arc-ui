import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobCard } from '../job-card/job-card';
import { Job } from '../../services/job.service';

/**
 * Column View Component
 * 
 * Displays jobs organized in columns by status (Kanban-style board).
 * Emits events to parent component for job operations.
 */
@Component({
  selector: 'app-column-view',
  standalone: true,
  imports: [CommonModule, JobCard],
  templateUrl: './column-view.html',
  styleUrls: ['./column-view.css'],
})
export class ColumnView {
  // Input: array of jobs to display
  @Input() jobs: Job[] = [];
  
  // Output: emitted when a job is edited
  @Output() jobEdited = new EventEmitter<string>();
  
  // Output: emitted when a job is deleted
  @Output() jobDeleted = new EventEmitter<string>();

  constructor() {}

  /**
   * Returns all jobs with 'APPLIED' status
   */
  get appliedJobs(): Job[] {
    return this.jobs.filter((job) => job.status === 'APPLIED');
  }

  /**
   * Returns all jobs with 'INTERVIEW' status
   */
  get interviewJobs(): Job[] {
    return this.jobs.filter((job) => job.status === 'INTERVIEW');
  }

  /**
   * Returns all jobs with 'OFFER' status
   */
  get offerJobs(): Job[] {
    return this.jobs.filter((job) => job.status === 'OFFER');
  }

  /**
   * Returns all jobs with 'NOT_CHOSEN' status
   */
  get notChosenJobs(): Job[] {
    return this.jobs.filter((job) => job.status === 'NOT_CHOSEN');
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
  editJob(jobId: string) {
    this.jobEdited.emit(jobId);
  }
}
