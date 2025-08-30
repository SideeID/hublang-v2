import { useQuery, keepPreviousData } from '@tanstack/react-query';
import {
  getPenerimaan,
  PenerimaanParams,
  PenerimaanResponse,
} from '@/lib/api/hublang';

export function usePenerimaan(params: PenerimaanParams, enabled = true) {
  return useQuery<PenerimaanResponse>({
    queryKey: ['penerimaan', params],
    queryFn: () => getPenerimaan(params),
    placeholderData: keepPreviousData,
    enabled,
  });
}
