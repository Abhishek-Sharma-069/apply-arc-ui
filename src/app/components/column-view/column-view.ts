import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobCard } from '../job-card/job-card';
import { Job } from '../../services/job.service';

@Component({
  selector: 'app-column-view',
  standalone: true,
  imports: [CommonModule, JobCard],
  templateUrl: './column-view.html',
  styleUrls: ['./column-view.css'],
})
export class ColumnView {
  @Input() jobs: Job[] = [];

  get appliedJobs(): Job[] {
    return this.jobs.filter((job) => job.status === 'APPLIED');
  }

  get interviewJobs(): Job[] {
    return this.jobs.filter((job) => job.status === 'INTERVIEW');
  }

  get offerJobs(): Job[] {
    return this.jobs.filter((job) => job.status === 'OFFER');
  }

  get notChosenJobs(): Job[] {
    return this.jobs.filter((job) => job.status === 'NOT_CHOSEN');
  }
}
