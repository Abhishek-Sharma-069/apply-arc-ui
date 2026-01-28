import { Component, Output, EventEmitter, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Job } from '../../services/job.service';

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-bar.html',
  styleUrls: ['./filter-bar.css'],
})
export class FilterBar implements OnInit, OnChanges {
  @Input() jobs: Job[] = [];

  @Output() filterChange = new EventEmitter<{
    searchQuery: string;
    selectedFilters: { [key: string]: string };
    sortOrder: string;
  }>();

  // Expose Object to template
  Object = Object;

  searchQuery = '';
  selectedFilters: { [key: string]: string } = {};
  sortOrder = 'newest'; // 'newest' or 'oldest'

  filters: { label: string; options: string[] }[] = [
    { label: 'Status', options: ['APPLIED', 'INTERVIEW', 'OFFER', 'NOT_CHOSEN'] },
    { label: 'Job Title', options: [] },
  ];

  showFilterDropdown: { [key: string]: boolean } = {
    'Status': false,
    'Job Title': false,
  };

  ngOnInit() {
    console.log('FilterBar initialized', this.filters, this.showFilterDropdown);
    this.updateJobTitleOptions();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['jobs']) {
      this.updateJobTitleOptions();
    }
  }

  /**
   * Extract unique job titles from jobs array
   */
  private updateJobTitleOptions() {
    const uniqueTitles = new Set<string>();
    this.jobs.forEach((job) => {
      if (job.jobTitle) {
        uniqueTitles.add(job.jobTitle);
      }
    });
    // Update Job Title filter options
    const jobTitleFilter = this.filters.find((f) => f.label === 'Job Title');
    if (jobTitleFilter) {
      jobTitleFilter.options = Array.from(uniqueTitles).sort();
    }
    console.log('Updated Job Title options:', jobTitleFilter?.options);
  }

  onSearch(event: any) {
    this.searchQuery = event.target.value;
    this.emitFilterChange();
  }

  toggleFilterDropdown(filterLabel: string) {
    console.log('Toggling dropdown for:', filterLabel, 'Current state:', this.showFilterDropdown[filterLabel]);
    this.showFilterDropdown[filterLabel] = !this.showFilterDropdown[filterLabel];
    console.log('New state:', this.showFilterDropdown[filterLabel]);
  }

  selectFilter(filterLabel: string, option: string) {
    console.log('Selected filter:', filterLabel, option);
    this.selectedFilters[filterLabel] = option;
    this.showFilterDropdown[filterLabel] = false;
    this.emitFilterChange();
  }

  clearFilter(filterLabel: string) {
    delete this.selectedFilters[filterLabel];
    this.emitFilterChange();
  }

  toggleSortOrder() {
    this.sortOrder = this.sortOrder === 'newest' ? 'oldest' : 'newest';
    this.emitFilterChange();
  }

  private emitFilterChange() {
    this.filterChange.emit({
      searchQuery: this.searchQuery,
      selectedFilters: this.selectedFilters,
      sortOrder: this.sortOrder,
    });
  }
}
