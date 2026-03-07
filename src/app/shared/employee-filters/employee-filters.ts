import { Component, output } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { JOB_TITLES } from '../../core/models/user.model';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-employee-filters',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './employee-filters.html',
  styleUrl: './employee-filters.scss',
})
export class EmployeeFilters {
  JOB_TITLES = JOB_TITLES;

  searchTerm = output<string>();
  jobFilter = output<string>();

  onSearch(term: string) {
    this.searchTerm.emit(term);
  }

  onJobChange(job: string) {
    this.jobFilter.emit(job);
  }
}
