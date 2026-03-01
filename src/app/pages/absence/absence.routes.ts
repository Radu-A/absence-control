import { Routes } from '@angular/router';

import { AbsenceList } from './absence-list/absence-list';

export const absenceRoutes: Routes = [
  {
    path: '',
    component: AbsenceList,
  },
  {
    path: 'new',
    loadComponent: () => import('./absence-form/absence-form').then((m) => m.AbsenceForm),
  },
  {
    path: 'detail/:id',
    loadComponent: () => import('./absence-detail/absence-detail').then((m) => m.AbsenceDetail),
  },
];
