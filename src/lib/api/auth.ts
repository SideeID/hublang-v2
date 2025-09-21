import { apiFetch } from './client';

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  status: string;
  message: string;
  data: {
    token: string;
    user: { id: number; email: string; nama: string };
  };
}

export async function login(payload: LoginPayload) {
  return apiFetch<LoginResponse>(`/api/direksi/login`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
