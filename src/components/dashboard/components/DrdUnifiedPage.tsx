'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import AppTheme from '@/components/shared-theme/AppTheme';
import SideMenu from './SideMenu';
import AppNavbar from './AppNavbar';
import Header from './Header';
import { alpha } from '@mui/material/styles';
import Drd from './DrdUtama';
import DrdGolongan from './DrdGolongan';
import DrdKecamatan from './DrdKecamatan';
import DrdKelurahan from './DrdKelurahan';
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from '@/components/dashboard/theme/customizations';

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

type OptionKey = 'drd' | 'golongan' | 'kecamatan' | 'kelurahan';

const OPTIONS: { value: OptionKey; label: string }[] = [
  { value: 'drd', label: 'DRD' },
  { value: 'golongan', label: 'DRD Golongan' },
  { value: 'kecamatan', label: 'DRD Kecamatan' },
  { value: 'kelurahan', label: 'DRD Kelurahan' },
];

export default function DrdUnifiedPage() {
  const [month, setMonth] = React.useState<Dayjs>(dayjs());
  const periode = React.useMemo(() => month.format('YYYYMM'), [month]);
  const [selected, setSelected] = React.useState<OptionKey | ''>('');
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const renderSelected = () => {
    if (!selected) return null;
    const commonProps = {
      externalPeriode: periode,
      hideInternalFilter: true,
    } as const;
    switch (selected) {
      case 'drd':
        return <Drd {...commonProps} />;
      case 'golongan':
        return <DrdGolongan {...commonProps} />;
      case 'kecamatan':
        return <DrdKecamatan {...commonProps} />;
      case 'kelurahan':
        return <DrdKelurahan {...commonProps} />;
      default:
        return null;
    }
  };

  return (
    <AppTheme themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex' }}>
        <SideMenu />
        <AppNavbar />
        <Box
          component='main'
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: 'auto',
          })}
        >
          <Stack
            spacing={2}
            sx={{ alignItems: 'center', mx: 3, pb: 5, mt: { xs: 8, md: 0 } }}
          >
            <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
              <Box sx={{ mb: 2 }}>
                <Header current='DRD' />
              </Box>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                sx={{ mb: 2 }}
              >
                {mounted && (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label='Periode'
                      views={['year', 'month']}
                      openTo='month'
                      value={month}
                      onChange={(v) => v && setMonth(v)}
                      format='MMMM YYYY'
                      slotProps={{
                        textField: { size: 'small', sx: { width: 220 } },
                      }}
                    />
                  </LocalizationProvider>
                )}
                <TextField
                  select
                  size='small'
                  label='Jenis DRD'
                  sx={{ width: { xs: '100%', sm: 340 } }}
                  value={selected}
                  onChange={(e) =>
                    setSelected(e.target.value as OptionKey | '')
                  }
                  helperText={!selected ? 'Pilih salah satu jenis DRD' : ' '}
                  slotProps={{
                    formHelperText: { sx: { minHeight: 20, mt: 0.5 } },
                  }}
                  SelectProps={{
                    MenuProps: {
                      PaperProps: { sx: { maxWidth: 420 } },
                    },
                  }}
                  InputLabelProps={{ shrink: true }}
                >
                  {!selected && (
                    <MenuItem disabled value=''>
                      <em style={{ opacity: 0.7 }}>Pilih Jenis DRD</em>
                    </MenuItem>
                  )}
                  {OPTIONS.map((o) => (
                    <MenuItem key={o.value} value={o.value} sx={{ py: 0.75 }}>
                      <Typography variant='body2' fontWeight={600}>
                        {o.label}
                      </Typography>
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
              <Box>{renderSelected()}</Box>
            </Box>
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}
