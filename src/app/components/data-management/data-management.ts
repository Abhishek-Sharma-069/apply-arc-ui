import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Job, JobService } from '../../services/job.service';

@Component({
  selector: 'app-data-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './data-management.html',
  styleUrls: ['./data-management.css'],
})
export class DataManagement {
  @Input() jobs: Job[] = [];
  editingJobId: string | null = null;
  editingJob: Job | null = null;

  constructor(private jobService: JobService) {}

  startEdit(job: Job) {
    this.editingJobId = job.id || null;
    this.editingJob = { ...job };
  }

  cancelEdit() {
    this.editingJobId = null;
    this.editingJob = null;
  }

  saveEdit() {
    if (this.editingJob && this.editingJobId) {
      this.jobService.updateJob(this.editingJobId, this.editingJob);
      const index = this.jobs.findIndex((j) => j.id === this.editingJobId);
      if (index !== -1) {
        this.jobs[index] = { ...this.editingJob };
      }
      this.editingJobId = null;
      this.editingJob = null;
    }
  }

  deleteJob(jobId: string | undefined) {
    if (jobId) {
      this.jobService.deleteJob(jobId);
      this.jobs = this.jobs.filter((j) => j.id !== jobId);
    }
  }

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
