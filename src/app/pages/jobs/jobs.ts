import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sidebar } from '../../components/sidebar/sidebar';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [CommonModule, Sidebar],
  templateUrl: './jobs.html',
  styleUrls: ['./jobs.css'],
})
export class Jobs {
  jobCategories = [
    { name: 'Full-time', count: 5 },
    { name: 'Part-time', count: 2 },
    { name: 'Contract', count: 1 },
  ];

  recentApplications = [
    { company: 'Google', position: 'Product Manager', appliedDate: '2 days ago' },
    { company: 'Meta', position: 'UX Designer', appliedDate: '5 days ago' },
    { company: 'Apple', position: 'Engineer', appliedDate: '1 week ago' },
  ];
}
