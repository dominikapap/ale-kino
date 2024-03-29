export interface User {
  userID: number;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  phoneNumber: number;
  role: 'User' | 'Admin' | 'Guest' | 'NotGuest';
}
