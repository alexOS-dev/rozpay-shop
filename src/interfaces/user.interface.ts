export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified?: Date | null;
  password?: string;
  role: 'admin' | 'user' | 'salesman';
  image?: string | null;
}
