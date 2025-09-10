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
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
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

  const [draftWilayahId, setDraftWilayahId] = React.useState<string>('');
  const [draftRayonId, setDraftRayonId] = React.useState<string>('');
  const [draftKecamatanId, setDraftKecamatanId] = React.useState<string>('');
  const [draftKelurahanId, setDraftKelurahanId] = React.useState<string>('');
  const [draftMinJmlrek, setDraftMinJmlrek] = React.useState<
    number | undefined
  >();
  const [draftMaxJmlrek, setDraftMaxJmlrek] = React.useState<
    number | undefined
  >();
  const [draftTimTagih, setDraftTimTagih] = React.useState<string>('');

  const [filtersOpen, setFiltersOpen] = React.useState(false);

  const openFilters = () => {
    setDraftWilayahId(wilayahId);
    setDraftRayonId(rayonId);
    setDraftKecamatanId(kecamatanId);
    setDraftKelurahanId(kelurahanId);
    setDraftMinJmlrek(minJmlrek);
    setDraftMaxJmlrek(maxJmlrek);
    setDraftTimTagih(timTagih);
    setFiltersOpen(true);
  };
  const closeFilters = () => setFiltersOpen(false);
  const applyFilters = () => {
    setWilayahId(draftWilayahId);
    setRayonId(draftRayonId);
    setKecamatanId(draftKecamatanId);
    setKelurahanId(draftKelurahanId);
    setMinJmlrek(draftMinJmlrek);
    setMaxJmlrek(draftMaxJmlrek);
    setTimTagih(draftTimTagih);
    setFiltersOpen(false);
  };

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
      wil_id: wilayahId || undefined,
      rayon_id: rayonId || undefined,
      rekfrom: minJmlrek !== undefined ? String(minJmlrek) : undefined,
      rekto: maxJmlrek !== undefined ? String(maxJmlrek) : undefined,
      kec_id: kecamatanId || undefined,
      kel_id: kelurahanId || undefined,
    }),
    [
      periode,
      wilayahId,
      rayonId,
      kecamatanId,
      kelurahanId,
      minJmlrek,
      maxJmlrek,
    ],
  );

  return (
    <AppTheme themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex' }}>
        <SideMenu />
        <AppNavbar />
        <Box component='main' sx={{ flexGrow: 1, overflow: 'auto' }}>
          <Stack
            spacing={2}
            sx={{ alignItems: 'center', mx: 3, pb: 5, mt: { xs: 8, md: 0 } }}
          >
            <Header current='Penerimaan Petugas Tagih' />
            <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
              <Box
                sx={{
                  mb: 1.5,
                  display: 'flex',
                  gap: 1,
                  flexWrap: 'nowrap',
                  alignItems: 'center',
                }}
              >
                <DateRangeFilter
                  start={startD}
                  end={endD}
                  onStartChange={setStartD}
                  onEndChange={setEndD}
                  hideLocations
                  compact
                />
                <Button variant='outlined' size='small' onClick={openFilters}>
                  Filter Lainnya
                </Button>
              </Box>

              <Dialog
                open={filtersOpen}
                onClose={closeFilters}
                fullWidth
                maxWidth='md'
              >
                <DialogTitle>Filter Data</DialogTitle>
                <DialogContent dividers>
                  <Typography variant='subtitle2' sx={{ mb: 1 }}>
                    Lokasi
                  </Typography>
                  <DateRangeFilter
                    start={startD}
                    end={endD}
                    onStartChange={setStartD}
                    onEndChange={setEndD}
                    wilayahId={draftWilayahId}
                    onWilayahChange={(v) => {
                      setDraftWilayahId(v);
                      setDraftRayonId('');
                    }}
                    rayonId={draftRayonId}
                    onRayonChange={setDraftRayonId}
                    kecamatanId={draftKecamatanId}
                    onKecamatanChange={(v) => {
                      setDraftKecamatanId(v);
                      setDraftKelurahanId('');
                    }}
                    kelurahanId={draftKelurahanId}
                    onKelurahanChange={setDraftKelurahanId}
                  />
                  <Divider sx={{ my: 2 }} />
                  <Typography variant='subtitle2' sx={{ mb: 1 }}>
                    Penerimaan
                  </Typography>
                  <TagihFilters
                    minJmlrek={draftMinJmlrek}
                    maxJmlrek={draftMaxJmlrek}
                    onMinJmlrekChange={setDraftMinJmlrek}
                    onMaxJmlrekChange={setDraftMaxJmlrek}
                    timTagih={draftTimTagih}
                    onTimTagihChange={setDraftTimTagih}
                    teamOptions={teamOptions}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={closeFilters}>Batal</Button>
                  <Button variant='contained' onClick={applyFilters}>
                    Terapkan
                  </Button>
                </DialogActions>
              </Dialog>
              <Grid container spacing={2} columns={12}>
                <Grid size={{ xs: 12 }}>
                  <Typography component='h2' variant='h6' sx={{ mb: 2 }}>
                    Rekap Penerimaan Kasir
                  </Typography>
                  <CustomizedDataGrid
                    fetchParams={fetchParams}
                    source='kasir'
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Typography component='h2' variant='h6' sx={{ mb: 2 }}>
                    Rekap Penerimaan Loket
                  </Typography>
                  <CustomizedDataGrid
                    fetchParams={fetchParams}
                    source='loket'
                  />
                </Grid>
              </Grid>
            </Box>
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}
