import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { BehaviorSubject, combineLatest, map, Observable, of, switchMap, tap } from 'rxjs';

import { MatIcon } from '@angular/material/icon';
import { MatFormField } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/select';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInput } from '@angular/material/input';

import { Absence } from '../../../core/models/absence.model';

import { AbsenceService } from '../../../core/services/absence-service';
import { PageModel } from '../../../core/models/page.model';
import { AuthService } from '../../../core/services/auth-service';

@Component({
  selector: 'app-absence-list',
  imports: [
    MatIcon,
    MatInput,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    DatePipe,
    RouterLink,
    MatPaginator,
    MatTableModule,
  ],
  templateUrl: './absence-list.html',
  styleUrl: './absence-list.scss',
})
export class AbsenceList {
  authService = inject(AuthService);
  absenceService = inject(AbsenceService);

  displayedColumns: string[] = ['id', 'employee', 'dates', 'status', 'actions'];

  currentUser = this.authService.getCurrentUser();

  // Filters
  searchTerm$ = new BehaviorSubject<string>('');
  statusFilter$ = new BehaviorSubject<string>('');

  // Pagination
  pageIndex$ = new BehaviorSubject<number>(0);
  pageLimit$ = new BehaviorSubject<number>(10);
  totalElements = 0;

  dataSource$: Observable<Absence[]> = combineLatest([
    this.searchTerm$,
    this.statusFilter$,
    this.pageIndex$,
    this.pageLimit$,
    this.authService.currentUser$,
  ]).pipe(
    switchMap(([term, status, index, limit, user]) => {
      // SECURITY: if the session is lost
      if (!user) return of({ data: [], total: 0 });

      return this.absenceService.getAbsences(term, status, index, limit, user.role, user.id);
    }),
    tap((response) => {
      this.totalElements = response.total;
    }),
    map((response) => {
      return response.data;
    }),
  );

  onSearch(value: string) {
    this.searchTerm$.next(value);
  }

  onStatusChange(status: string) {
    this.statusFilter$.next(status);
  }

  handlePageEvent(pageEvent: PageModel) {
    this.pageIndex$.next(pageEvent.pageIndex);
    this.pageLimit$.next(pageEvent.pageSize);
  }

  router = inject(Router);
  goToDetails(id: string) {
    console.log('oli');

    this.router.navigate(['/dashboard/absences/detail', id]);
  }
}
