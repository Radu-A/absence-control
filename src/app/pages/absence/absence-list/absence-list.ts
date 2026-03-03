import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject, combineLatest, map, Observable, of, switchMap, tap } from 'rxjs';

import { Absence } from '../../../core/models/absence.model';
import { Session } from '../../../core/models/session.model';

import { AbsenceService } from '../../../core/services/absence-service';
import { PageModel } from '../../../core/models/page.model';
import { AuthService } from '../../../core/services/auth-service';

import { List } from '../../../shared/list/list';
import { FiltersSection } from '../../../shared/filters-section/filters-section';

@Component({
  selector: 'app-absence-list',
  imports: [List, AsyncPipe, FiltersSection],
  templateUrl: './absence-list.html',
  styleUrl: './absence-list.scss',
})
export class AbsenceList {
  authService = inject(AuthService);
  absenceService = inject(AbsenceService);

  displayedColumns: string[] = ['id', 'employee', 'dates', 'status', 'actions'];

  currentUser: Session | null = this.authService.getCurrentUser();

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
}
