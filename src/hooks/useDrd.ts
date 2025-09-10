import { useQuery, keepPreviousData } from '@tanstack/react-query';
import {
  getDrd,
  getDrdKelurahan,
  getDrdKecamatan,
  getDrdGolongan,
  DrdResponse,
} from '@/lib/api/hublang';

export function useDrd(periode: string, enabled = true) {
  return useQuery<DrdResponse>({
    queryKey: ['drd', periode],
    queryFn: () => getDrd(periode),
    placeholderData: keepPreviousData,
    enabled: !!periode && enabled,
  });
}

export function useDrdKelurahan(periode: string, enabled = true) {
  return useQuery<DrdResponse>({
    queryKey: ['drd-kelurahan', periode],
    queryFn: () => getDrdKelurahan(periode),
    placeholderData: keepPreviousData,
    enabled: !!periode && enabled,
  });
}

export function useDrdKecamatan(periode: string, enabled = true) {
  return useQuery<DrdResponse>({
    queryKey: ['drd-kecamatan', periode],
    queryFn: () => getDrdKecamatan(periode),
    placeholderData: keepPreviousData,
    enabled: !!periode && enabled,
  });
}

export function useDrdGolongan(periode: string, enabled = true) {
  return useQuery<DrdResponse>({
    queryKey: ['drd-golongan', periode],
    queryFn: () => getDrdGolongan(periode),
    placeholderData: keepPreviousData,
    enabled: !!periode && enabled,
  });
}
