import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Stats {
  interviewRate: string;
  offerRate: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header {
  @Input() title!: string;
  @Input() stats!: Stats;

  onRefresh() {
    console.log('Refresh clicked');
  }

  onEmail() {
    console.log('Email clicked');
  }

  onExport() {
    console.log('Export clicked');
  }

  onAddJob() {
    console.log('Add Job clicked');
  }
}
