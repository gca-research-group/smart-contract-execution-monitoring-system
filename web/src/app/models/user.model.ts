export interface User {
  id?: number;
  name: string;
  email: string;
  photo: string;
  accessToken?: string;
  refreshToken?: string;
  isAuthenticated: boolean;
  status: boolean;
}
