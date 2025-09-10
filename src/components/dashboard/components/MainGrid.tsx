import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MonthlyComparisonGrids from './MonthlyComparisonGrids';
import RegionalLTBarChart from './RegionalLTBarChart';
import TotalReceiptPieChart from './TotalReceiptPieChart';
import DateRangeFullFilter from './DateRangeFullFilter';
import dayjs, { Dayjs } from 'dayjs';
import { usePenerimaan } from '@/hooks/usePenerimaan';
import type { PenerimaanItem } from '@/lib/api/hublang';

export default function MainGrid() {
  const [startD, setStartD] = React.useState<Dayjs>(dayjs().startOf('month'));
  const [endD, setEndD] = React.useState<Dayjs>(dayjs().endOf('month'));
  const [wilayahId, setWilayahId] = React.useState<string>('');
  const [rayonId, setRayonId] = React.useState<string>('');
  const [kecamatanId, setKecamatanId] = React.useState<string>('');
  const [kelurahanId, setKelurahanId] = React.useState<string>('');
  const start = startD.format('YYYY-MM-DD');
  const end = endD.format('YYYY-MM-DD');
  const { data, isFetching } = usePenerimaan(
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

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Box sx={{ mb: 1.5 }}>
        <DateRangeFullFilter
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
            loading={isFetching}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <TotalReceiptPieChart
            totalLancar={totalLancar}
            totalTunggakan={totalTunggakan}
            loading={isFetching}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <MonthlyComparisonGrids
            lastMonth={lastMonthRows}
            thisMonth={thisMonthRows}
            loading={isFetching}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
