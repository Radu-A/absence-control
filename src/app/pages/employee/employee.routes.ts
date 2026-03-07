import { Routes } from '@angular/router';

import { EmployeeList } from './employee-list/employee-list';

export const employeeRoutes: Routes = [
  {
    path: '',
    component: EmployeeList,
  },
  {
    path: 'detail/:id',
    loadComponent: () => import('./employee-detail/employee-detail').then((m) => m.EmployeeDetail),
  },
];
