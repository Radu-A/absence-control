export type UserRole = 'USER' | 'MANAGER';

export type JobTitle =
  | 'Senior Frontend Developer'
  | 'Frontend Developer'
  | 'Backend Developer'
  | 'Fullstack Developer'
  | 'UX/UI Designer'
  | 'Product Manager'
  | 'HR Manager';

export const JOB_TITLES: JobTitle[] = [
  'Senior Frontend Developer',
  'Frontend Developer',
  'Backend Developer',
  'Fullstack Developer',
  'UX/UI Designer',
  'Product Manager',
  'HR Manager',
];

export interface User {
  id: string;
  email: string;
  password?: string; // Opcional, solo para el login
  role: UserRole;
  firstName: string;
  lastName: string;
  jobTitle: JobTitle;
  status: string;
  birthDate: string;
  startDate: string;
  taxId: string;
  phone: string;
  NSS: string;
}

export interface PaginatedUsers {
  data: User[];
  total: number;
}
