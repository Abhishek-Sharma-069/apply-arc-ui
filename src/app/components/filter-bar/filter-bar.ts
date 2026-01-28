import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter-bar.html',
  styleUrls: ['./filter-bar.css'],
})
export class FilterBar {
  searchQuery = '';
  filters = [
    { label: 'Source', options: ['LinkedIn', 'Indeed', 'Glassdoor'] },
    { label: 'Job Title', options: ['Designer', 'Developer', 'PM'] },
    { label: 'Company', options: [] },
    { label: 'Location', options: [] },
    { label: 'Applied On', options: [] },
    { label: 'Offer On', options: [] },
  ];

  onSearch(event: any) {
    this.searchQuery = event.target.value;
  }

  onFilterChange(filterLabel: string) {
    console.log(`Filter changed: ${filterLabel}`);
  }
}
