import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { Absence } from '../models/absence.model';
import { B } from '@angular/cdk/keycodes';

// Interface to extract total items from response
export interface PaginatedAbsences {
  data: Absence[];
  total: number;
}

@Injectable({
  providedIn: 'root',
})
export class AbsenceService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/absences`;

  // Get all absence
  getAbsences(
    term: string,
    status: string,
    index: number,
    limit: number,
    role: string,
    userId: string,
  ): Observable<PaginatedAbsences> {
    let params = new HttpParams();
    if (term) {
      // json-server uses sufix '_like' to do approximate searches
      params = params.set('employeeName_like', term);
    }
    if (status) {
      params = params.set('status', status);
    }
    params = params.set('_page', index + 1);
    params = params.set('_limit', limit);
    // Search by id only when the role is USER
    if (role === 'USER') {
      params = params.set('userId', userId);
    }
    // observe: 'response' to extract the whole response, even headers
    return this.http.get<Absence[]>(this.apiUrl, { params, observe: 'response' }).pipe(
      map((response: HttpResponse<Absence[]>) => {
        return {
          data: response.body || [],
          // Extract total from header 'X-Total-Count'
          total: Number(response.headers.get('X-Total-Count')) || 0,
        };
      }),
    );
  }

  // Get one absence by id
  getAbsenceById(id: string): Observable<Absence> {
    return this.http.get<Absence>(`${this.apiUrl}/${id}`);
  }

  // Create an absence request
  createAbsence(absence: Omit<Absence, 'id'>): Observable<Absence> {
    return this.http.post<Absence>(this.apiUrl, absence);
  }

  updateAbsence(id: string, status: string): Observable<Absence> {
    console.log('Disparando petición a:', `${this.apiUrl}/${id}`);
    return this.http.patch<Absence>(`${this.apiUrl}/${id}`, { status });
  }

  deleteAbsence(id: string): Observable<Absence> {
    return this.http.delete<Absence>(`${this.apiUrl}/${id}`);
  }
}
