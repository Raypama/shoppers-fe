// src/types/auth.ts

/* =====================
   AUTH PAYLOADS
===================== */

export interface RegisterPayload {
  nickname: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
  
}

export interface AuthUser {
  id: number;
  email: string;
  nickname: string;
  full_name: string;
  profile_image: string;
}

export interface AuthData {
  user: AuthUser;
  token: string;
}

export interface AuthResponse {
  status: number;
  message: string;
  data: AuthData;
}
