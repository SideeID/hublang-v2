import { useMutation } from '@tanstack/react-query';
import { login, LoginPayload, LoginResponse } from '@/lib/api/auth';

export function useLogin() {
  return useMutation<LoginResponse, Error, LoginPayload>({
    mutationFn: (payload) => login(payload),
  });
}
