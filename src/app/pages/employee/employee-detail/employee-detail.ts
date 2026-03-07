import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';

import { EmployeeService } from '../../../core/services/employee-service';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-employee-detail',
  imports: [CommonModule, AsyncPipe, MatButtonModule, MatIcon],
  templateUrl: './employee-detail.html',
  styleUrl: './employee-detail.scss',
})
export class EmployeeDetail {
  route = inject(ActivatedRoute);
  employeeService = inject(EmployeeService);

  employeeId = this.route.snapshot.params['id'];
  employee$ = this.employeeService.getEmployeeById(this.employeeId);

  // Change color of the "status pill"
  getStatusClass(status: string): string {
    console.log(status);

    switch (status.toLowerCase()) {
      case 'active':
        return 'status-active';
      case 'inactive':
        return 'status-inactive';
      default:
        return '';
    }
  }
}
