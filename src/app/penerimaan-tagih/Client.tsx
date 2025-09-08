'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import dayjs, { Dayjs } from 'dayjs';
import AppTheme from '@/components/shared-theme/AppTheme';
import SideMenu from '@/components/dashboard/components/SideMenu';
import AppNavbar from '@/components/dashboard/components/AppNavbar';
import DateRangeFilter from '@/components/dashboard/components/DateRangeFilter';
import CustomizedDataGrid from '@/components/dashboard/components/CustomizedDataGrid';
import { useRekap } from '@/hooks/useRekap';
import type { RekapDetailItem } from '@/lib/api/hublang';
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from '@/components/dashboard/theme/customizations';
import Header from '@/components/dashboard/components/Header';

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

export default function Client() {
  const [startD, setStartD] = React.useState<Dayjs>(dayjs().startOf('month'));
  const [endD, setEndD] = React.useState<Dayjs>(dayjs().endOf('month'));
  const [wilayahId, setWilayahId] = React.useState<string>('');
  const [rayonId, setRayonId] = React.useState<string>('');
  const [kecamatanId, setKecamatanId] = React.useState<string>('');
  const [kelurahanId, setKelurahanId] = React.useState<string>('');

  const periode = startD.format('YYYYMM');

  const { data } = useRekap(periode, true);

  const toNum = (s?: string) => {
    const n = Number(s);
    return Number.isNaN(n) ? 0 : n;
  };

  const pct = (num: number, den: number) =>
    den > 0 ? Math.round((num / den) * 1000) / 10 : 0;

  const mapDetailToRow = (detail: RekapDetailItem[]) =>
    detail.map((r, idx) => {
      const tdrdLancarLbr = toNum(r.jmlrek_lancar);
      const tdrdLancarJumlah = toNum(r.ttltagihan_lancar);
      const tdrdTunggakanLbr = toNum(r.jmlrek_tunggakan);
      const tdrdTunggakanJumlah = toNum(r.ttltagihan_tunggakan);
      const tdrdTotalLbr = toNum(r.jmlrek);
      const tdrdTotalJumlah = toNum(r.ttltagihan);

      const lunasLancarLbr = toNum(r.lbrlunas_lancar);
      const lunasLancarJumlah = toNum(r.ttltagihanlunas_lancar);
      const lunasTunggakanLbr = toNum(r.lbrlunas_tunggakan);
      const lunasTunggakanJumlah = toNum(r.ttltagihanlunas_tunggakan);
      const lunasTotalLbr = toNum(r.lbrlunas);
      const lunasTotalJumlah = toNum(r.ttltagihanlunas);

      const sisaLancarLbr = toNum(r.jmlrek_sisa_lancar);
      const sisaLancarJumlah = toNum(r.sisatagihan_lancar);
      const sisaTunggakanLbr = toNum(r.jmlrek_sisa_tunggakan);
      const sisaTunggakanJumlah = toNum(r.sisatagihan_tunggakan);
      const sisaTotalLbr = toNum(r.jmlrek_sisa);
      const sisaTotalJumlah = toNum(r.sisatagihan);

      return {
        id: idx + 1,
        kasir: r.nama,
        // Total DRD Penagihan
        tdrd_lancar_lbr: tdrdLancarLbr,
        tdrd_lancar_jumlah: tdrdLancarJumlah,
        tdrd_tunggakan_lbr: tdrdTunggakanLbr,
        tdrd_tunggakan_jumlah: tdrdTunggakanJumlah,
        tdrd_total_lbr: tdrdTotalLbr,
        tdrd_total_jumlah: tdrdTotalJumlah,
        // Total Lunas DRD Penagihan
        lunas_lancar_lbr: lunasLancarLbr,
        lunas_lancar_jumlah: lunasLancarJumlah,
        lunas_tunggakan_lbr: lunasTunggakanLbr,
        lunas_tunggakan_jumlah: lunasTunggakanJumlah,
        lunas_total_lbr: lunasTotalLbr,
        lunas_total_jumlah: lunasTotalJumlah,
        // Sisa DRD Penagihan
        sisa_lancar_lbr: sisaLancarLbr,
        sisa_lancar_jumlah: sisaLancarJumlah,
        sisa_tunggakan_lbr: sisaTunggakanLbr,
        sisa_tunggakan_jumlah: sisaTunggakanJumlah,
        sisa_total_lbr: sisaTotalLbr,
        sisa_total_jumlah: sisaTotalJumlah,
        // Efisiensi: (lunas / total) * 100
        ef_lancar: pct(lunasLancarJumlah, tdrdLancarJumlah),
        ef_tunggakan: pct(lunasTunggakanJumlah, tdrdTunggakanJumlah),
        ef_total: pct(lunasTotalJumlah, tdrdTotalJumlah),
      };
    });

  const kasirDetail = data?.data?.kasir?.detail ?? [];
  const loketDetail = data?.data?.loket?.detail ?? [];
  const kasirRows = mapDetailToRow(kasirDetail as RekapDetailItem[]);
  const loketRows = mapDetailToRow(loketDetail as RekapDetailItem[]);

  return (
    <AppTheme themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex' }}>
        <SideMenu />
        <AppNavbar />
        <Box component='main' sx={{ flexGrow: 1, p: 3, pt: 0 }}>
          <Box sx={{ mb: 2 }}>
            <Header current='Penerimaan Petugas Tagih' />
          </Box>
          <Box sx={{ mb: 1.5 }}>
            <DateRangeFilter
              start={startD}
              end={endD}
              onStartChange={setStartD}
              onEndChange={setEndD}
              wilayahId={wilayahId}
              onWilayahChange={(v) => {
                setWilayahId(v);
                setRayonId('');
              }}
              rayonId={rayonId}
              onRayonChange={setRayonId}
              kecamatanId={kecamatanId}
              onKecamatanChange={(v) => {
                setKecamatanId(v);
                setKelurahanId('');
              }}
              kelurahanId={kelurahanId}
              onKelurahanChange={setKelurahanId}
            />
          </Box>

          <Typography component='h2' variant='h6' sx={{ mb: 2 }}>
            Rekap Penerimaan Kasir
          </Typography>

          <Box sx={{ mb: 3 }}>
            <CustomizedDataGrid rows={kasirRows} />
          </Box>

          <Typography component='h2' variant='h6' sx={{ mb: 2 }}>
            Rekap Penerimaan Loket
          </Typography>

          <Box>
            <CustomizedDataGrid rows={loketRows} />
          </Box>
        </Box>
      </Box>
    </AppTheme>
  );
}
