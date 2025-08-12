export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  email: string;
  name: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}
