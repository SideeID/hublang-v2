import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getKelurahan, type KelurahanResponse } from '@/lib/api/hublang';

export function useKelurahan(kec_id?: string, enabled = true) {
  return useQuery<KelurahanResponse>({
    queryKey: ['kelurahan', { kec_id }],
    queryFn: () => getKelurahan(String(kec_id)),
    placeholderData: keepPreviousData,
    enabled: enabled && !!kec_id,
  });
}
