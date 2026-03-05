import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs';

import { AuthService } from '../services/auth-service';

import { UserRole } from '../models/user.model';

export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  // Take expected role from route
  const expectedRoles: UserRole[] = route.data['expectedRole'];

  return authService.currentUser$.pipe(
    // Take current value and close connection
    take(1),
    map((session) => {
      // Check if there is defined roles
      if (!expectedRoles || expectedRoles.length === 0) return true;

      if (session && expectedRoles.includes(session.role)) {
        return true;
      }
      // Forces the routes file to redirect to this path
      return router.createUrlTree(['/login']);
    }),
  );
};
