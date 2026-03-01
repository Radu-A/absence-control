import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Absence, AbsenceType } from '../../../core/models/absence.model';
import { AbsenceService } from '../../../core/services/absence-service';

const MOCK_AUTH_USER = {
  id: '1',
  fullName: 'Victor Outeiro',
};

@Component({
  selector: 'app-absence-form',
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './absence-form.html',
  styleUrl: './absence-form.scss',
})
export class AbsenceForm {
  private absenceService = inject(AbsenceService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  // State flag to disable the submit button while the request is pending
  isSubmitting = false;

  absenceForm = new FormGroup({
    type: new FormControl<AbsenceType>('Vacation', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    startDate: new FormControl<Date | null>(null, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    endDate: new FormControl<Date | null>(null, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    reason: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(10)],
    }),
  });

  onSubmit() {
    if (this.absenceForm.invalid) return;

    // Lock the form to prevent double submissions
    this.isSubmitting = true;
    const formValues = this.absenceForm.getRawValue();

    const formattedStartDate = this.formatDate(formValues.startDate!);
    const formattedEndDate = this.formatDate(formValues.endDate!);

    const newAbsence: Omit<Absence, 'id'> = {
      userId: '1',
      employeeName: MOCK_AUTH_USER.fullName,
      status: 'Pending',
      type: formValues.type,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      reason: formValues.reason,
    };

    this.absenceService.createAbsence(newAbsence).subscribe({
      next: (response) => {
        // Open snack bar and show during 3 seconds
        this.snackBar.open('Request submitted successfully!', 'Close', { duration: 3000 });
        this.router.navigate(['/dashboard/absences']);
      },
      error: (error) => {
        // Error path (e.g., server down or validation failed on backend)
        console.error('Error creating request:', error);
        this.snackBar.open('Failed to submit request. Please try again.', 'Close', {
          duration: 5000,
        });
        // Unlock the button so the user can retry
        this.isSubmitting = false;
      },
    });

    console.log('✅ Data ready to be sent:', newAbsence);
  }

  private formatDate(date: Date): string {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }
}
