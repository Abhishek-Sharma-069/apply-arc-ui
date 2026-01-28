import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-card.html',
  styleUrls: ['./job-card.css'],
})
export class JobCard {
  @Input() jobTitle!: string;
  @Input() company!: string;
  @Input() location!: string;
  @Input() date!: string;
  @Input() status!: 'APPLIED' | 'INTERVIEW' | 'OFFER' | 'NOT_CHOSEN';

  getStatusColor(): string {
    const colors: { [key: string]: string } = {
      APPLIED: 'bg-blue-100',
      INTERVIEW: 'bg-orange-100',
      OFFER: 'bg-green-100',
      NOT_CHOSEN: 'bg-red-100',
    };
    return colors[this.status] || 'bg-gray-100';
  }

  getStatusTextColor(): string {
    const colors: { [key: string]: string } = {
      APPLIED: 'text-blue-600',
      INTERVIEW: 'text-orange-600',
      OFFER: 'text-green-600',
      NOT_CHOSEN: 'text-red-600',
    };
    return colors[this.status] || 'text-gray-600';
  }
}
