import { AuthUser } from '../features/auth/auth-context';

export interface MockUser extends AuthUser {
  password: string;
}

export const mockUsers: MockUser[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'admin@clinic.test',
    role: 'admin',
    password: 'password123'
  },
  {
    id: '2',
    name: 'Jamie Patel',
    email: 'clinician@clinic.test',
    role: 'clinician',
    password: 'password123'
  },
  {
    id: '3',
    name: 'Taylor Brooks',
    email: 'viewer@clinic.test',
    role: 'viewer',
    password: 'password123'
  }
];
