import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getRayon, type RayonResponse } from '@/lib/api/hublang';

export function useRayon(wil_id?: string, enabled = true) {
  return useQuery<RayonResponse>({
    queryKey: ['rayon', { wil_id }],
    queryFn: () => getRayon(String(wil_id)),
    placeholderData: keepPreviousData,
    enabled: enabled && !!wil_id,
  });
}
