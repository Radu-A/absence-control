import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { User, PaginatedUsers } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/users`;

  getEmployees(
    term: string,
    job: string,
    limit: number,
    index: number,
  ): Observable<PaginatedUsers> {
    let params = new HttpParams();
    if (term) {
      params = params.set('lastName_like', term);
    }
    if (job) {
      params = params.set('jobTitle', job);
    }
    const pageString = `?_page=${index + 1}&_limit=${limit}`;
    console.log(`${this.apiUrl}${pageString}`);

    return this.http
      .get<User[]>(`${this.apiUrl}${pageString}`, { params, observe: 'response' })
      .pipe(
        map((response: HttpResponse<User[]>) => {
          return {
            data: response.body || [],
            // Extract total from header 'X-Total-Count'
            total: Number(response.headers.get('X-Total-Count')) || 0,
          };
        }),
      );
  }
}
