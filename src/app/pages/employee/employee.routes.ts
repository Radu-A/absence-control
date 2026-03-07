import { Routes } from '@angular/router';

import { EmployeeList } from './employee-list/employee-list';

export const employeeRoutes: Routes = [
  {
    path: '',
    component: EmployeeList,
  },
];
