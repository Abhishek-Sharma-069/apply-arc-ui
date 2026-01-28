import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../../components/header/header';
import { Sidebar } from '../../components/sidebar/sidebar';
import { Tabs } from '../../components/tabs/tabs';
import { FilterBar } from '../../components/filter-bar/filter-bar';
import { JobCard } from '../../components/job-card/job-card';
import { ColumnView } from '../../components/column-view/column-view';
import { ListView } from '../../components/list-view/list-view';
import { DataManagement } from '../../components/data-management/data-management';
import { JobFormModalComponent } from '../../components/job-form-modal/job-form-modal';
import { JobService, Job } from '../../services/job.service';

/**
 * Dashboard Component
 * 
 * Main application component that displays the job application tracking dashboard.
 * Manages job data, view modes, and analytics statistics.
 */
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    Header,
    Sidebar,
    Tabs,
    FilterBar,
    JobCard,
    ColumnView,
    ListView,
    DataManagement,
    JobFormModalComponent,
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class Dashboard implements OnInit {
  // Application title
  title = 'ApplyArc';
  
  // Array of all jobs loaded from the service
  jobs: Job[] = [];
  
  // Filtered and sorted jobs for display
  filteredJobs: Job[] = [];
  
  // Currently active view tab (default: column view)
  activeTab = 'COLUMN_VIEW';

  // Modal state
  isModalOpen = false;
  selectedJob: Job | null = null;
  isEditMode = false;

  // Filter state
  searchQuery = '';
  selectedFilters: { [key: string]: string } = {};
  sortOrder = 'newest';
  
  // Application statistics
  stats = {
    interviewRate: '25%',
    offerRate: '12.5%',
  };

  /**
   * Constructor
   * @param jobService - Service to manage job data
   */
  constructor(private jobService: JobService) {}

  /**
   * Angular lifecycle hook
   * Initializes the dashboard by loading jobs from the service
   */
  ngOnInit() {
    this.jobs = this.jobService.getJobs();
    this.applyFiltersAndSort();
  }

  /**
   * Handles filter and sort changes from filter bar
   */
  onFilterChange(filterData: {
    searchQuery: string;
    selectedFilters: { [key: string]: string };
    sortOrder: string;
  }) {
    this.searchQuery = filterData.searchQuery;
    this.selectedFilters = filterData.selectedFilters;
    this.sortOrder = filterData.sortOrder;
    this.applyFiltersAndSort();
  }

  /**
   * Applies filters and sorting to the jobs array
   */
  private applyFiltersAndSort() {
    let filtered = [...this.jobs];

    // Apply search query
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (job) =>
          job.jobTitle.toLowerCase().includes(query) ||
          job.company.toLowerCase().includes(query) ||
          job.location.toLowerCase().includes(query)
      );
    }

    // Apply status filter
    if (this.selectedFilters['Status']) {
      filtered = filtered.filter((job) => job.status === this.selectedFilters['Status']);
    }

    // Apply job title filter
    if (this.selectedFilters['Job Title']) {
      filtered = filtered.filter((job) => job.jobTitle === this.selectedFilters['Job Title']);
    }
    filtered.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return this.sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    this.filteredJobs = filtered;
  }

  /**
   * Handles tab change events
   * @param tabId - ID of the newly selected tab
   */
  onTabChange(tabId: string) {
    this.activeTab = tabId;
  }

  /**
   * Handles Add Job button click
   * Opens the job form modal for creating a new job

   */
  onAddJobClicked() {
    this.selectedJob = null;
    this.isEditMode = false;
    this.isModalOpen = true;
  }

  /**
   * Returns all jobs with 'APPLIED' status
   */
  get appliedJobs(): Job[] {
    return this.filteredJobs.filter((job) => job.status === 'APPLIED');
  }

  /**
   * Returns all jobs with 'INTERVIEW' status
   */
  get interviewJobs(): Job[] {
    return this.filteredJobs.filter((job) => job.status === 'INTERVIEW');
  }

  /**
   * Returns all jobs with 'OFFER' status
   */
  get offerJobs(): Job[] {
    return this.filteredJobs.filter((job) => job.status === 'OFFER');
  }

  /**
   * Returns all jobs with 'NOT_CHOSEN' status
   */
  get notChosenJobs(): Job[] {
    return this.filteredJobs.filter((job) => job.status === 'NOT_CHOSEN');
  }

  /**
   * Handles job save event from child component
   * Calls job service to update existing job or add new job
   * @param jobId - ID of the job being saved
   * @param updatedJob - Updated job data
   */
  onJobSaved(jobId: string, updatedJob: Job) {
    const existingJobIndex = this.jobs.findIndex((j) => j.id === jobId);
    
    if (existingJobIndex !== -1) {
      // Update existing job
      this.jobService.updateJob(jobId, updatedJob);
    } else {
      // Add new job
      this.jobService.addJob(updatedJob);
    }
  }

  /**
   * Handles job edit event from child component
   * Opens the job form modal for editing the selected job
   * @param jobId - ID of the job being edited
   */
  onJobEdited(jobId: string) {
    // Find the job to edit
    const job = this.jobs.find((j) => j.id === jobId);
    if (job) {
      this.selectedJob = job;
      this.isEditMode = true;
      this.isModalOpen = true;
    }
  }

  /**
   * Handles job delete event from child component
   * Calls job service to delete and updates local jobs array
   * @param jobId - ID of the job to delete
   */
  onJobDeleted(jobId: string) {
    this.jobService.deleteJob(jobId);
    this.jobs = this.jobs.filter((j) => j.id !== jobId);
  }

  /**
   * Handles modal close event
   */
  onModalClose() {
    this.isModalOpen = false;
    this.selectedJob = null;
    this.isEditMode = false;
  }

  /**
   * Handles modal save event
   * @param event - Object containing jobId and updatedJob
   */
  onModalSave(event: { jobId: string; updatedJob: Job }) {
    this.onJobSaved(event.jobId, event.updatedJob);
    this.onModalClose();
  }
}
