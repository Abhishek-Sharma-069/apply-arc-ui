import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Job } from '../../services/job.service';

@Component({
  selector: 'app-sankey-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sankey-view.html',
  styleUrls: ['./sankey-view.css'],
})
export class SankeyView {
  @Input() jobs: Job[] = [];

  get stats() {
    return {
      applied: this.jobs.filter((j) => j.status === 'APPLIED').length,
      interview: this.jobs.filter((j) => j.status === 'INTERVIEW').length,
      offer: this.jobs.filter((j) => j.status === 'OFFER').length,
      notChosen: this.jobs.filter((j) => j.status === 'NOT_CHOSEN').length,
      total: this.jobs.length,
    };
  }

  getInterviewRate(): number {
    return this.stats.total > 0 ? Math.round((this.stats.interview / this.stats.total) * 100) : 0;
  }

  getOfferRate(): number {
    return this.stats.total > 0 ? Math.round((this.stats.offer / this.stats.total) * 100) : 0;
  }

  getConversionRate(): number {
    return this.stats.interview > 0 ? Math.round((this.stats.offer / this.stats.interview) * 100) : 0;
  }
}
