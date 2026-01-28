import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Job } from '../../services/job.service';

@Component({
  selector: 'app-job-form-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './job-form-modal.html',
  styleUrls: ['./job-form-modal.css'],
})
export class JobFormModalComponent implements OnInit, OnChanges {
  @Input() isOpen = false;
  @Input() job: Job | null = null;
  @Input() isEditMode = false;

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<{ jobId: string; updatedJob: Job }>();

  formData: Job = {
    id: '',
    jobTitle: '',
    company: '',
    location: '',
    date: new Date().toISOString().split('T')[0],
    status: 'APPLIED',
  };

  statuses = ['APPLIED', 'INTERVIEW', 'OFFER', 'NOT_CHOSEN'];

  ngOnInit() {
    this.resetForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['job'] && this.job) {
      this.formData = { ...this.job };
    } else if (changes['isOpen'] && !this.isOpen) {
      this.resetForm();
    }
  }

  resetForm() {
    if (this.isEditMode && this.job) {
      this.formData = { ...this.job };
    } else {
      this.formData = {
        id: '',
        jobTitle: '',
        company: '',
        location: '',
        date: new Date().toISOString().split('T')[0],
        status: 'APPLIED',
      };
    }
  }

  onSave() {
    if (!this.formData.jobTitle.trim() || !this.formData.company.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    let jobId = this.formData.id;
    if (!jobId) {
      jobId = 'job-' + Date.now();
    }

    const updatedJob: Job = {
      ...this.formData,
      id: jobId,
    };

    this.save.emit({ jobId, updatedJob });
    this.onClose();
  }

  onClose() {
    this.close.emit();
    this.resetForm();
  }
}
