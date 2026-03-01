import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { take, map } from 'rxjs';

import { AuthService } from '../services/auth-service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.currentUser$.pipe(
    // Take current value and close connection
    take(1),
    map((session) => {
      if (session) {
        return true;
      }
      // Forces the routes file to redirect to this path
      return router.createUrlTree(['/login']);
    }),
  );
};
