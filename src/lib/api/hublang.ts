import { apiFetch } from './client';

export interface PenerimaanParams {
  start_date: string;
  end_date: string;
  wil_id?: string;
  rayon_id?: string;
  kec_id?: string;
  kel_id?: string;
}

export interface PenerimaanTotal {
  lancar: string;
  tunggakan: string;
  total: string;
  efesiensi: string;
}

export interface PenerimaanItem {
  wilayah: string;
  lancar: string;
  tunggakan: string;
  total: string;
  efesiensi: string;
}

export interface PenerimaanBlock {
  totalpenerimaan: PenerimaanTotal;
  detail: PenerimaanItem[];
  bulan_lalu: PenerimaanItem[];
}

export interface PenerimaanData {
  penerimaan: PenerimaanBlock;
  rekap: RekapData;
}

export interface PenerimaanResponse {
  status: string;
  message: string;
  data: PenerimaanData;
}

export function getPenerimaan(params: PenerimaanParams) {
  const entries = Object.entries(params).filter(
    ([, v]) => v !== undefined && v !== '',
  );
  const search = new URLSearchParams(entries as [string, string][]).toString();
  return apiFetch<PenerimaanResponse>(`/api/hublang/penerimaan?${search}`);
}

export interface WilayahItem {
  id: number;
  nama: string;
}
export interface WilayahResponse {
  status: string;
  message: string;
  data: WilayahItem[];
}
export function getWilayah() {
  return apiFetch<WilayahResponse>(`/api/filter/wilayah`);
}

export interface RayonItem {
  id: number;
  kode_rayon: string;
  nama: string;
}
export interface RayonResponse {
  status: string;
  message: string;
  data: RayonItem[];
}
export function getRayon(wil_id: string) {
  const search = new URLSearchParams({ wil_id }).toString();
  return apiFetch<RayonResponse>(`/api/filter/rayon?${search}`);
}

export interface KecamatanItem {
  id: number;
  nama: string;
}
export interface KecamatanResponse {
  status: string;
  message: string;
  data: KecamatanItem[];
}
export function getKecamatan() {
  return apiFetch<KecamatanResponse>(`/api/filter/kecamatan`);
}

export interface KelurahanItem {
  id: number;
  nama: string;
}
export interface KelurahanResponse {
  status: string;
  message: string;
  data: KelurahanItem[];
}
export function getKelurahan(kec_id: string) {
  const search = new URLSearchParams({ kec_id }).toString();
  return apiFetch<KelurahanResponse>(`/api/filter/kelurahan?${search}`);
}

export interface RekapDetailItem {
  id: number;
  nama: string;
  rekapBy: string;
  ttltagihan: string;
  jmlrek: string;
  ttltagihan_lancar: string;
  jmlrek_lancar: string;
  ttltagihan_tunggakan: string;
  jmlrek_tunggakan: string;
  sisatagihan: string;
  jmlrek_sisa: string;
  sisatagihan_lancar: string;
  jmlrek_sisa_lancar: string;
  sisatagihan_tunggakan: string;
  jmlrek_sisa_tunggakan: string;
  ttltagihanlunas: string;
  lbrlunas: string;
  ttltagihanlunas_lancar: string;
  lbrlunas_lancar: string;
  ttltagihanlunas_tunggakan: string;
  lbrlunas_tunggakan: string;
}

export interface RekapTotalSummary {
  sisarek: number;
  sisatagihan: number;
  jrek: number;
  ttltagihan: number;
  ttltagihanlunas: number;
  lbrlunas: number;
}

export interface RekapData {
  detail: RekapDetailItem[];
  total: RekapTotalSummary;
}

export interface RekapBlock {
  detail: RekapDetailItem[];
  total: RekapTotalSummary;
}

export interface RekapResponse {
  status: string;
  message: string;
  data: {
    kasir: RekapBlock;
    loket: RekapBlock;
  };
}

export interface DrdItem {
  id: number;
  nama: string;
  wilayah_id: string;
  wilayah: string;
  totalpel: number;
  jmlpelpasif: string;
  jmlaktif: string;
  jmlm3: string;
  harga_air: string;
  danameter: string;
  administrasi: string;
  total_tagihan: string;
  rata2m3: string;
  rata2rp: string;
  kodegol: string;
}

export interface DrdResponse {
  status: string;
  message: string;
  data: DrdItem[];
}

export function getDrd(periode: string) {
  const search = new URLSearchParams({ periode }).toString();
  return apiFetch<DrdResponse>(`/api/hublang/drd?${search}`);
}

export function getRekap(periode: string) {
  const search = new URLSearchParams({ periode }).toString();
  return apiFetch<RekapResponse>(`/api/hublang/rekap?${search}`);
}
