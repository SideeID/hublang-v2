import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getDrd, DrdResponse } from '@/lib/api/hublang';

export function useDrd(periode: string, enabled = true) {
  return useQuery<DrdResponse>({
    queryKey: ['drd', periode],
    queryFn: () => getDrd(periode),
    placeholderData: keepPreviousData,
    enabled: !!periode && enabled,
  });
}
