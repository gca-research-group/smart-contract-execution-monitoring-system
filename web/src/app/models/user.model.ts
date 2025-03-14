export interface User {
  id?: number;
  name: string;
  email: string;
  isSuper: boolean;
  accessToken?: string;
  isAuthenticated: boolean;
}
