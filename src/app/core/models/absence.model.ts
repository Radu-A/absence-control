export type AbsenceStatus = 'Approved' | 'Pending' | 'Rejected';

export type AbsenceType =
  | 'Vacation'
  | 'Sick Leave'
  | 'Personal Days'
  | 'Maternity/Paternity'
  | 'Training';

export interface Absence {
  id: string;
  userId: string;
  employeeName: string;
  type: AbsenceType;
  startDate: string; // ISO format (YYYY-MM-DD)
  endDate: string;
  status: AbsenceStatus;
  reason: string;
}
