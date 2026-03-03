import { Component, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';

// Imports de Material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AbsenceService } from '../../../core/services/absence-service';
import { AuthService } from '../../../core/services/auth-service';

// Reutilizamos la interfaz
export interface Absence {
  id: string;
  employeeName: string;
  type: string;
  startDate: string;
  endDate: string;
  status: 'Approved' | 'Pending' | 'Rejected';
  reason: string;
}

@Component({
  selector: 'app-absence-detail',
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule, AsyncPipe],
  templateUrl: './absence-detail.html',
  styleUrl: './absence-detail.scss',
})
export class AbsenceDetail {
  route = inject(ActivatedRoute);
  absenceService = inject(AbsenceService);
  authService = inject(AuthService);
  snackBar = inject(MatSnackBar);
  router = inject(Router);

  absenceId = this.route.snapshot.params['id'];
  absence$ = this.absenceService.getAbsenceById(this.absenceId);

  currentUser = this.authService.getCurrentUser();

  // Change color of the "status pill"
  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'status-approved';
      case 'pending':
        return 'status-pending';
      case 'rejected':
        return 'status-rejected';
      default:
        return '';
    }
  }

  modifyStatus(newStatus: string) {
    this.absenceService.updateAbsence(this.absenceId, newStatus).subscribe({
      next: (res) => {
        // Comunicate to user the new status of the absence
        this.snackBar.open(`The request has been ${newStatus}`, 'Close', { duration: 3000 });
        // Refresh absence observable
        this.absence$ = this.absenceService.getAbsenceById(this.absenceId);
      },
      error: (err) => console.error('Error real: ', err),
    });
  }
}
