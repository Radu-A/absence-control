export interface Session {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'MANAGER';
  token: string;
}
