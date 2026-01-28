import { Injectable } from '@angular/core';

export interface Job {
  id?: string;
  jobTitle: string;
  company: string;
  location: string;
  date: string;
  status: 'APPLIED' | 'INTERVIEW' | 'OFFER' | 'NOT_CHOSEN';
}

@Injectable({
  providedIn: 'root',
})
export class JobService {
  jobs: Job[] = [
    {
      id: '1',
      jobTitle: 'Product Designer',
      company: 'Lyft',
      location: 'New York, NY',
      date: '03/23/23',
      status: 'APPLIED',
    },
    {
      id: '2',
      jobTitle: 'UX Designer',
      company: 'Tesla',
      location: 'Charlotte, NC',
      date: '03/23/23',
      status: 'APPLIED',
    },
    {
      id: '3',
      jobTitle: 'Product Designer',
      company: 'Microsoft',
      location: 'Toronto, ON',
      date: '01/24/23',
      status: 'APPLIED',
    },
    {
      id: '4',
      jobTitle: 'Product Designer',
      company: 'Meta',
      location: 'Boston, MA',
      date: '02/11/23',
      status: 'APPLIED',
    },
    {
      id: '5',
      jobTitle: 'Product Designer',
      company: 'Uber',
      location: 'Miami, FL',
      date: '02/22/23',
      status: 'INTERVIEW',
    },
    {
      id: '6',
      jobTitle: 'UX Designer',
      company: 'Google',
      location: 'Los Angeles, CA',
      date: '02/13/23',
      status: 'INTERVIEW',
    },
    {
      id: '7',
      jobTitle: 'UX Designer',
      company: 'Apple',
      location: 'San Francisco, CA',
      date: '02/13/23',
      status: 'OFFER',
    },
    {
      id: '8',
      jobTitle: 'Product Designer',
      company: 'Pinterest',
      location: 'Toronto, ON',
      date: '03/23/23',
      status: 'NOT_CHOSEN',
    },
  ];

  constructor() {}

  getJobs(): Job[] {
    return this.jobs;
  }

  getJobsByStatus(status: string): Job[] {
    return this.jobs.filter((job) => job.status === status);
  }

  addJob(job: Job): void {
    this.jobs.push(job);
  }

  deleteJob(jobId: string): void {
    this.jobs = this.jobs.filter((job) => job.id !== jobId);
  }

  updateJob(jobId: string, updatedJob: Job): void {
    const index = this.jobs.findIndex((job) => job.id === jobId);
    if (index !== -1) {
      this.jobs[index] = { ...updatedJob, id: jobId };
    }
  }
}
