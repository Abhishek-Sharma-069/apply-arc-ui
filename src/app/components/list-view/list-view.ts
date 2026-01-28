import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Job } from '../../services/job.service';

@Component({
  selector: 'app-list-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-view.html',
  styleUrls: ['./list-view.css'],
})
export class ListView {
  @Input() jobs: Job[] = [];

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
