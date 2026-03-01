import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const currentUser = authService.getCurrentUser();

  // Exclude "/users" path cause we are using it to do fake login
  // In real life will exlude "/auth/login" or "/auth/refresh"
  if (!req.url.includes('/users') && currentUser?.token) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${currentUser.token}`),
    });
    // Forced message to demonstrate in the test
    console.log('Authorization header: ', authReq.headers.get('authorization'));
    return next(authReq);
  }

  // Si es la ruta de login o directamente no hay token, la petición pasa tal cual
  return next(req);
};
