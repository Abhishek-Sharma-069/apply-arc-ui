import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../../components/header/header';
import { Sidebar } from '../../components/sidebar/sidebar';
import { Tabs } from '../../components/tabs/tabs';
import { FilterBar } from '../../components/filter-bar/filter-bar';
import { JobCard } from '../../components/job-card/job-card';
import { ColumnView } from '../../components/column-view/column-view';
import { ListView } from '../../components/list-view/list-view';
import { SankeyView } from '../../components/sankey-view/sankey-view';
import { DataManagement } from '../../components/data-management/data-management';
import { JobService, Job } from '../../services/job.service';

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
    SankeyView,
    DataManagement,
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class Dashboard implements OnInit {
  title = 'ApplyArc';
  jobs: Job[] = [];
  activeTab = 'COLUMN_VIEW';
  stats = {
    interviewRate: '25%',
    offerRate: '12.5%',
  };

  constructor(private jobService: JobService) {}

  ngOnInit() {
    this.jobs = this.jobService.getJobs();
  }

  onTabChange(tabId: string) {
    this.activeTab = tabId;
  }

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
