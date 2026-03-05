import { UserRole } from './user.model';

export interface Session {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  token: string;
}
