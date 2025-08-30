import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getWilayah, type WilayahResponse } from '@/lib/api/hublang';

export function useWilayah(enabled = true) {
  return useQuery<WilayahResponse>({
    queryKey: ['wilayah'],
    queryFn: () => getWilayah(),
    placeholderData: keepPreviousData,
    enabled,
  });
}
