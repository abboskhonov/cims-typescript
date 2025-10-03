export interface User {
  id: string;
  email: string;
  name: string;
  surname?: string;
  role?: string;
  permissions?: Record<string, any>;
  // add other user fields
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface RegisterPayload {
  email: string;
  password: string;
  name: string;
  surname: string;
  company_code: string;
  telegram_id?: string;
  role: string;
}
