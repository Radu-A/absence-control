import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { Session } from '../models/session.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/users`;

  // BehaviorSubject holds the current state and emits it to new subscribers
  private currentUserSubject = new BehaviorSubject<Session | null>(null);

  // Public observable that components can subscribe to
  public currentUser$: Observable<Session | null> = this.currentUserSubject.asObservable();

  // Check if there's a user in localStorage when the app starts
  // Called from app.config -> app-init-service
  checkInitialState() {
    const savedUser = localStorage.getItem('awayUser');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  // Fake login method
  login(email: string, password: string): Observable<boolean> {
    // json-server allows filter query params
    return this.http.get<User[]>(`${this.apiUrl}?email=${email}&password=${password}`).pipe(
      map((users) => {
        if (users && users.length > 0) {
          const user = users[0];
          console.log(user);

          const mockSession: Session = {
            id: user.id,
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            role: user.role,
            token: `mock-jwt-token-for-${user.role.toLowerCase()}-${Date.now()}`,
          };

          localStorage.setItem('awayUser', JSON.stringify(mockSession));
          this.currentUserSubject.next(mockSession);
          return true; // Success login
        }
        return false; // Invalid credentials
      }),
    );
  }

  // Logout method
  logout() {
    localStorage.removeItem('awayUser');
    this.currentUserSubject.next(null);
  }

  // Helper method to get the current value synchronously
  getCurrentUser(): Session | null {
    return this.currentUserSubject.value;
  }
}
