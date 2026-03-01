import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

import { NotificationService } from '../services/notification-service';
import { AuthService } from '../services/auth-service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notificationService = inject(NotificationService);
  const authService = inject(AuthService);
  const router = inject(Router);

  // Let the request pass, but "listen" if it returns with an error
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unexpected error occurred.';

      if (error.error instanceof ErrorEvent) {
        // Client-side or network error
        errorMessage = `Network error: ${error.error.message}`;
      } else {
        // Server-side error (json-server, your real backend, etc.)
        switch (error.status) {
          case 401:
            errorMessage = 'Session expired or unauthorized. Please log in again.';
            // Clear the session and redirect to login
            authService.logout();
            router.navigate(['/login']);
            break;
          case 403:
            errorMessage = 'You do not have permission to access this resource.';
            break;
          case 404:
            // FORCE ERROR: Corrupt "apiUrl" in absence-service
            errorMessage = 'The requested resource was not found.';
            break;
          case 500:
            errorMessage = 'Internal server error. Please try again later.';
            break;
          case 0:
            // FORCE ERROR: Kill json server
            errorMessage = 'Cannot connect to the server. Check your internet connection.';
            break;
          default:
            // If the backend sends a specific message in the body, try to use it
            errorMessage = error.error?.message || `Server error: ${error.status}`;
            break;
        }
      }

      // Trigger the global snackbar to notify the user
      notificationService.showError(errorMessage);

      // Rethrow the error in case the calling component wants to do something extra (e.g., stop a loading spinner)
      return throwError(() => error);
    }),
  );
};
