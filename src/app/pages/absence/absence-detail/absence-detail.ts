import { Component, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';

// Imports de Material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
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

  absenceId = this.route.snapshot.params['id'];
  absence$ = this.absenceService.getAbsenceById(this.absenceId);

  currentUser = this.authService.getCurrentUser();

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
}
