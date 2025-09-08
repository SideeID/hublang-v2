import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getRekap, RekapResponse, RekapParams } from '@/lib/api/hublang';

export function useRekap(params: RekapParams, enabled = true) {
  return useQuery<RekapResponse>({
    queryKey: [
      'rekap',
      params.periode,
      params.rekfrom ?? '',
      params.rekto ?? '',
    ],
    queryFn: () => getRekap(params),
    placeholderData: keepPreviousData,
    enabled,
  });
}
