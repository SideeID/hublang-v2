import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CustomizedDataGrid from './CustomizedDataGrid';
import MonthlyComparisonGrids from './MonthlyComparisonGrids';
import RegionalLTBarChart from './RegionalLTBarChart';
import TotalReceiptPieChart from './TotalReceiptPieChart';
import DateRangeFilter from './DateRangeFilter';
import dayjs, { Dayjs } from 'dayjs';
import { usePenerimaan } from '@/hooks/usePenerimaan';
import type { PenerimaanItem, RekapDetailItem } from '@/lib/api/hublang';

export default function MainGrid() {
  const [startD, setStartD] = React.useState<Dayjs>(dayjs().startOf('month'));
  const [endD, setEndD] = React.useState<Dayjs>(dayjs().endOf('month'));
  const [wilayahId, setWilayahId] = React.useState<string>('');
  const [rayonId, setRayonId] = React.useState<string>('');
  const [kecamatanId, setKecamatanId] = React.useState<string>('');
  const [kelurahanId, setKelurahanId] = React.useState<string>('');
  const start = startD.format('YYYY-MM-DD');
  const end = endD.format('YYYY-MM-DD');
  const { data } = usePenerimaan(
    {
      start_date: start,
      end_date: end,
      wil_id: wilayahId || undefined,
      rayon_id: rayonId || undefined,
      kec_id: kecamatanId || undefined,
      kel_id: kelurahanId || undefined,
    },
    true,
  );

  // Adjust to new nested shape: data.penerimaan.*
  const penerimaan = data?.data?.penerimaan;
  const labels = (penerimaan?.detail || []).map((d) => d.wilayah);
  const barLancar = (penerimaan?.detail || []).map(
    (d) => Number(d.lancar) || 0,
  );
  const barTunggakan = (penerimaan?.detail || []).map(
    (d) => Number(d.tunggakan) || 0,
  );

  const totalLancar = Number(penerimaan?.totalpenerimaan.lancar || 0);
  const totalTunggakan = Number(penerimaan?.totalpenerimaan.tunggakan || 0);

  const parseEfesiensi = (s?: string) => {
    if (!s) return 0;
    const n = parseFloat(s);
    return Number.isNaN(n) ? 0 : n;
  };

  const thisMonthRows = (penerimaan?.detail ?? []).map(
    (d: PenerimaanItem, idx) => ({
      id: idx + 1,
      wilayah: d.wilayah,
      lancar: Number(d.lancar) || 0,
      tunggakan: Number(d.tunggakan) || 0,
      efisiensi: parseEfesiensi(d.efesiensi),
    }),
  );

  const lastMonthRows = (penerimaan?.bulan_lalu ?? []).map(
    (d: PenerimaanItem, idx) => ({
      id: idx + 1,
      wilayah: d.wilayah,
      lancar: Number(d.lancar) || 0,
      tunggakan: Number(d.tunggakan) || 0,
      efisiensi: parseEfesiensi(d.efesiensi),
    }),
  );

  // Map data.rekap.detail to grid rows expected by CustomizedDataGrid
  const rekapDetail = data?.data?.rekap?.detail ?? [];
  const rekapRows = (rekapDetail as RekapDetailItem[]).map((r, idx) => ({
    id: idx + 1,
    kasir: r.nama,
    // Total DRD Penagihan
    tdrd_lancar_lbr: Number(r.jmlrek_lancar) || 0,
    tdrd_lancar_jumlah: Number(r.ttltagihan_lancar) || 0,
    tdrd_tunggakan_lbr: Number(r.jmlrek_tunggakan) || 0,
    tdrd_tunggakan_jumlah: Number(r.ttltagihan_tunggakan) || 0,
    tdrd_total_lbr:
      (Number(r.jmlrek_lancar) || 0) + (Number(r.jmlrek_tunggakan) || 0),
    tdrd_total_jumlah:
      (Number(r.ttltagihan_lancar) || 0) +
      (Number(r.ttltagihan_tunggakan) || 0),
    // Total Lunas DRD Penagihan
    lunas_lancar_lbr: Number(r.lbrlunas_lancar) || 0,
    lunas_lancar_jumlah: Number(r.ttltagihanlunas_lancar) || 0,
    lunas_tunggakan_lbr: Number(r.lbrlunas_tunggakan) || 0,
    lunas_tunggakan_jumlah: Number(r.ttltagihanlunas_tunggakan) || 0,
    lunas_total_lbr:
      (Number(r.lbrlunas_lancar) || 0) + (Number(r.lbrlunas_tunggakan) || 0),
    lunas_total_jumlah:
      (Number(r.ttltagihanlunas_lancar) || 0) +
      (Number(r.ttltagihanlunas_tunggakan) || 0),
    // Sisa DRD Penagihan
    sisa_lancar_lbr: Number(r.jmlrek_sisa_lancar) || 0,
    sisa_lancar_jumlah: Number(r.sisatagihan_lancar) || 0,
    sisa_tunggakan_lbr: Number(r.jmlrek_sisa_tunggakan) || 0,
    sisa_tunggakan_jumlah: Number(r.sisatagihan_tunggakan) || 0,
    sisa_total_lbr:
      (Number(r.jmlrek_sisa_lancar) || 0) +
      (Number(r.jmlrek_sisa_tunggakan) || 0),
    sisa_total_jumlah:
      (Number(r.sisatagihan_lancar) || 0) +
      (Number(r.sisatagihan_tunggakan) || 0),
    // Efisiensi (dummy zeros per request)
    ef_lancar: 0,
    ef_tunggakan: 0,
    ef_total: 0,
  }));

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
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
        Overview
      </Typography>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        <Grid size={{ xs: 12, md: 7 }}>
          <RegionalLTBarChart
            labels={labels}
            lancar={barLancar}
            tunggakan={barTunggakan}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <TotalReceiptPieChart
            totalLancar={totalLancar}
            totalTunggakan={totalTunggakan}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <MonthlyComparisonGrids
            lastMonth={lastMonthRows}
            thisMonth={thisMonthRows}
          />
        </Grid>
      </Grid>
      <Typography component='h2' variant='h6' sx={{ mb: 2 }}>
        Rekap Penerimaan Tim Tagih
      </Typography>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 12 }}>
          <CustomizedDataGrid rows={rekapRows} />
        </Grid>
      </Grid>
    </Box>
  );
}
