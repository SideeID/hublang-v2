import { useQuery } from '@tanstack/react-query';
import { getTimTagih, TimTagihResponse } from '@/lib/api/hublang';

export function useTimTagih(enabled = true) {
  return useQuery<TimTagihResponse>({
    queryKey: ['timtagih'],
    queryFn: () => getTimTagih(),
    enabled,
    staleTime: 5 * 60 * 1000,
  });
}
