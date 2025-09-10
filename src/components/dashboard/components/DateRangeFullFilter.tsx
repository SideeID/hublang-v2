import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import type { SelectChangeEvent } from '@mui/material/Select';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import type { Dayjs } from 'dayjs';
import { useWilayah } from '@/hooks/useWilayah';
import { useRayon } from '@/hooks/useRayon';
import { useKecamatan } from '@/hooks/useKecamatan';
import { useKelurahan } from '@/hooks/useKelurahan';
import Alert from '@mui/material/Alert';

export interface DateRangeFullFilterProps {
  start: Dayjs;
  end: Dayjs;
  onStartChange: (d: Dayjs) => void;
  onEndChange: (d: Dayjs) => void;
  wilayahId?: string;
  onWilayahChange?: (value: string) => void;
  rayonId?: string;
  onRayonChange?: (value: string) => void;
  kecamatanId?: string;
  onKecamatanChange?: (value: string) => void;
  kelurahanId?: string;
  onKelurahanChange?: (value: string) => void;
}

export default function DateRangeFullFilter({
  start,
  end,
  onStartChange,
  onEndChange,
  wilayahId = '',
  onWilayahChange,
  rayonId = '',
  onRayonChange,
  kecamatanId = '',
  onKecamatanChange,
  kelurahanId = '',
  onKelurahanChange,
}: DateRangeFullFilterProps) {
  const { data: wilayahResp } = useWilayah(true);
  const { data: kecResp } = useKecamatan(true);
  const { data: rayonResp } = useRayon(wilayahId || undefined, true);
  const { data: kelResp } = useKelurahan(kecamatanId || undefined, true);
  const [warning, setWarning] = React.useState<string>('');

  const setMonthRange = (anchor: Dayjs) => {
    const monthStart = anchor.startOf('month');
    const monthEnd = anchor.endOf('month');
    onStartChange(monthStart);
    onEndChange(monthEnd);
    setWarning(
      `Rentang tanggal harus dalam satu bulan. Disesuaikan ke ${monthStart.format(
        'YYYY-MM',
      )} (1 s/d ${monthEnd.format('DD')}).`,
    );
  };

  const handleWilayahChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    onWilayahChange?.(value);
    onRayonChange?.('');
  };
  const handleKecamatanChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    onKecamatanChange?.(value);
    onKelurahanChange?.('');
  };
  const handleKelurahanChange = (event: SelectChangeEvent<string>) => {
    onKelurahanChange?.(event.target.value);
  };
  const handleRayonChange = (event: SelectChangeEvent<string>) => {
    onRayonChange?.(event.target.value);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ width: '100%', maxWidth: { xs: 360, sm: 'none' } }}>
        <Grid container spacing={1.5} alignItems='center' wrap='wrap'>
          {warning && (
            <Grid size={{ xs: 12 }}>
              <Alert
                severity='warning'
                onClose={() => setWarning('')}
                sx={{ py: 0, '& .MuiAlert-message': { py: 0 } }}
              >
                {warning}
              </Alert>
            </Grid>
          )}
          <Grid size={{ xs: 12, sm: 'auto' }}>
            <div suppressHydrationWarning>
              <DatePicker
                label='Tanggal awal'
                format='YYYY-MM-DD'
                value={start}
                onOpen={() => setWarning('')}
                onChange={(newValue) => {
                  if (!newValue) return;
                  const newDay = newValue.startOf('day');
                  if (!newDay.isSame(end, 'month')) {
                    setMonthRange(newDay);
                    return;
                  }
                  if (end.isBefore(newDay)) {
                    onEndChange(newDay.endOf('day'));
                  }
                  onStartChange(newDay);
                }}
                slotProps={{
                  textField: {
                    size: 'small',
                    fullWidth: true,
                    sx: { width: { xs: '100%', sm: 160 } },
                    inputProps: { readOnly: true },
                  },
                }}
              />
            </div>
          </Grid>
          <Grid size={{ xs: 12, sm: 'auto' }}>
            <div suppressHydrationWarning>
              <DatePicker
                label='Tanggal akhir'
                format='YYYY-MM-DD'
                value={end}
                onOpen={() => setWarning('')}
                onChange={(newValue) => {
                  if (!newValue) return;
                  const newDay = newValue.endOf('day');
                  if (!newDay.isSame(start, 'month')) {
                    setMonthRange(newDay);
                    return;
                  }
                  if (newDay.isBefore(start)) {
                    onStartChange(newDay.startOf('day'));
                  }
                  onEndChange(newDay);
                }}
                slotProps={{
                  textField: {
                    size: 'small',
                    fullWidth: true,
                    sx: { width: { xs: '100%', sm: 160 } },
                    inputProps: { readOnly: true },
                  },
                }}
              />
            </div>
          </Grid>
          <Grid size={{ xs: 12, sm: 'auto' }}>
            <FormControl size='small' fullWidth sx={{ minWidth: { sm: 160 } }}>
              <InputLabel id='wilayah-label'>Wilayah</InputLabel>
              <Select
                labelId='wilayah-label'
                id='wilayah'
                value={wilayahId}
                label='Wilayah'
                onChange={handleWilayahChange}
              >
                <MenuItem value=''>Semua Wilayah</MenuItem>
                {(wilayahResp?.data || []).map((w) => (
                  <MenuItem key={w.id} value={String(w.id)}>
                    {w.nama}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 'auto' }}>
            <FormControl
              size='small'
              fullWidth
              sx={{ minWidth: { sm: 160 } }}
              disabled={!wilayahId}
            >
              <InputLabel id='rayon-label'>Wilayah Rayon</InputLabel>
              <Select
                labelId='rayon-label'
                id='rayon'
                value={rayonId}
                label='Wilayah Rayon'
                onChange={handleRayonChange}
              >
                <MenuItem value=''>Semua Rayon</MenuItem>
                {(rayonResp?.data || []).map((r) => (
                  <MenuItem key={r.id} value={String(r.id)}>
                    {r.kode_rayon ? `${r.kode_rayon} - ${r.nama}` : r.nama}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 'auto' }}>
            <FormControl size='small' fullWidth sx={{ minWidth: { sm: 160 } }}>
              <InputLabel id='kecamatan-label'>Kecamatan</InputLabel>
              <Select
                labelId='kecamatan-label'
                id='kecamatan'
                value={kecamatanId}
                label='Kecamatan'
                onChange={handleKecamatanChange}
              >
                <MenuItem value=''>Semua Kecamatan</MenuItem>
                {(kecResp?.data || []).map((k) => (
                  <MenuItem key={k.id} value={String(k.id)}>
                    {k.nama}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 'auto' }}>
            <FormControl
              size='small'
              fullWidth
              sx={{ minWidth: { sm: 160 } }}
              disabled={!kecamatanId}
            >
              <InputLabel id='kelurahan-label'>Kelurahan</InputLabel>
              <Select
                labelId='kelurahan-label'
                id='kelurahan'
                value={kelurahanId}
                label='Kelurahan'
                onChange={handleKelurahanChange}
              >
                <MenuItem value=''>Semua Kelurahan</MenuItem>
                {(kelResp?.data || []).map((kel) => (
                  <MenuItem key={kel.id} value={String(kel.id)}>
                    {kel.nama}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  );
}
