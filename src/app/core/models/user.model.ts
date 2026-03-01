export type UserRole = 'USER' | 'MANAGER';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  password?: string; // Opcional, solo para el login
}
