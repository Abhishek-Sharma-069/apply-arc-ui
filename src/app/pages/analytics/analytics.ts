import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sidebar } from '../../components/sidebar/sidebar';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, Sidebar],
  templateUrl: './analytics.html',
  styleUrls: ['./analytics.css'],
})
export class Analytics {
  metrics = [
    { label: 'Total Applications', value: '8', change: '+2 this month', color: 'blue' },
    { label: 'Interview Rate', value: '25%', change: '+5% improvement', color: 'orange' },
    { label: 'Offer Rate', value: '12.5%', change: 'Stable', color: 'green' },
    { label: 'Average Response', value: '5 days', change: '-1 day faster', color: 'purple' },
  ];

  monthlyData = [
    { month: 'Jan', applications: 2, interviews: 0, offers: 0 },
    { month: 'Feb', applications: 3, interviews: 1, offers: 0 },
    { month: 'Mar', applications: 3, interviews: 1, offers: 1 },
  ];
}
