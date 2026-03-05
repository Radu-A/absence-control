import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../services/auth-service';
import { map, take } from 'rxjs';

export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  // Take expected role from route
  const expectedRole: string[] = route.data['expectedRole'];

  return authService.currentUser$.pipe(
    // Take current value and close connection
    take(1),
    map((session) => {
      if (session && expectedRole.some((role) => role === session.role)) {
        return true;
      }
      // Forces the routes file to redirect to this path
      return router.createUrlTree(['/login']);
    }),
  );
};
