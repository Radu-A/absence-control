import { Component, inject } from '@angular/core';
import { EmployeeService } from '../../../core/services/employee-service';
import { BehaviorSubject, combineLatest, map, Observable, switchMap, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

import { Session } from '../../../core/models/session.model';
import { PaginatedUsers, User } from '../../../core/models/user.model';

import { AuthService } from '../../../core/services/auth-service';

import { EmployeeFilters } from '../../../shared/employee-filters/employee-filters';
import { EmployeeTable } from '../../../shared/employee-table/employee-table';
import { PageModel } from '../../../core/models/page.model';

@Component({
  selector: 'app-employee-list',
  imports: [EmployeeFilters, EmployeeTable, AsyncPipe],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.scss',
})
export class EmployeeList {
  authService = inject(AuthService);
  employeeService = inject(EmployeeService);

  // Filters
  searchTerm$ = new BehaviorSubject<string>('');
  jobFilter$ = new BehaviorSubject<string>('');

  // Pagination
  pageLimit$ = new BehaviorSubject(10);
  pageIndex$ = new BehaviorSubject(0);
  totalElements = 0;

  dataSource$: Observable<User[]> = combineLatest([
    this.searchTerm$,
    this.jobFilter$,
    this.pageLimit$,
    this.pageIndex$,
  ]).pipe(
    switchMap(([term, job, limit, index]) => {
      return this.employeeService.getEmployees(term, job, limit, index);
    }),
    tap((response) => {
      this.totalElements = response.total;
    }),
    map((response) => {
      return response.data;
    }),
  );

  currentUser: Session | null = this.authService.getCurrentUser();

  onSearch(term: string) {
    this.searchTerm$.next(term);
  }

  onFilter(job: string) {
    this.jobFilter$.next(job);
  }

  handlePageEvent(page: PageModel) {
    this.pageLimit$.next(page.pageSize);
    this.pageIndex$.next(page.pageIndex);
  }
}
