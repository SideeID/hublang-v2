import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getKecamatan, type KecamatanResponse } from '@/lib/api/hublang';

export function useKecamatan(enabled = true) {
  return useQuery<KecamatanResponse>({
    queryKey: ['kecamatan'],
    queryFn: () => getKecamatan(),
    placeholderData: keepPreviousData,
    enabled,
  });
}
