import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth-guard';
import { roleGuard } from './core/guards/role-guard';

import { MainLayout } from './layout/main-layout/main-layout';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then((m) => m.Login),
  },
  {
    path: 'dashboard',
    component: MainLayout,
    canActivate: [authGuard, roleGuard],
    data: { expectedRole: ['MANAGER', 'USER'] },
    children: [
      {
        path: 'absences',
        loadChildren: () => import('./pages/absence/absence.routes').then((m) => m.absenceRoutes),
      },
      {
        path: '',
        redirectTo: 'absences',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
  },
];
