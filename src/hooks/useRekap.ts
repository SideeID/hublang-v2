import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getRekap, RekapResponse } from '@/lib/api/hublang';

export function useRekap(periode: string, enabled = true) {
  return useQuery<RekapResponse>({
    queryKey: ['rekap', periode],
    queryFn: () => getRekap(periode),
    placeholderData: keepPreviousData,
    enabled,
  });
}
