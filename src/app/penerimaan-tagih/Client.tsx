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
import TagihFilters from '@/components/dashboard/components/TagihFilters';
import { useTimTagih } from '@/hooks/useTimTagih';
import type { RekapParams } from '@/lib/api/hublang';
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
  const [minJmlrek, setMinJmlrek] = React.useState<number | undefined>();
  const [maxJmlrek, setMaxJmlrek] = React.useState<number | undefined>();
  const [timTagih, setTimTagih] = React.useState<string>('');

  const periode = startD.format('YYYYMM');

  const { data: timTagihResp } = useTimTagih(true);
  const teamOptions = React.useMemo(
    () =>
      (timTagihResp?.data ?? []).map((t) => ({
        id: String(t.id),
        label: t.nama,
      })),
    [timTagihResp],
  );

  const fetchParams: RekapParams = React.useMemo(
    () => ({
      periode,
      rekfrom: minJmlrek !== undefined ? String(minJmlrek) : undefined,
      rekto: maxJmlrek !== undefined ? String(maxJmlrek) : undefined,
    }),
    [periode, minJmlrek, maxJmlrek],
  );

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
          <Box sx={{ mb: 2 }}>
            <TagihFilters
              minJmlrek={minJmlrek}
              maxJmlrek={maxJmlrek}
              onMinJmlrekChange={setMinJmlrek}
              onMaxJmlrekChange={setMaxJmlrek}
              timTagih={timTagih}
              onTimTagihChange={setTimTagih}
              teamOptions={teamOptions}
            />
          </Box>

          <Typography component='h2' variant='h6' sx={{ mb: 2 }}>
            Rekap Penerimaan Kasir
          </Typography>

          <Box sx={{ mb: 3 }}>
            <CustomizedDataGrid fetchParams={fetchParams} source='kasir' />
          </Box>

          <Typography component='h2' variant='h6' sx={{ mb: 2 }}>
            Rekap Penerimaan Loket
          </Typography>

          <Box>
            <CustomizedDataGrid fetchParams={fetchParams} source='loket' />
          </Box>
        </Box>
      </Box>
    </AppTheme>
  );
}
