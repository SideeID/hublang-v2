'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import SideMenu from './SideMenu';
import AppNavbar from './AppNavbar';
import Header from './Header';
import AppTheme from '@/components/shared-theme/AppTheme';

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

type DrdType = 'drd' | 'golongan' | 'kecamatan' | 'kelurahan';

export default function DrdSelectorCard() {
  const [selected, setSelected] = React.useState<DrdType | null>(null);

  const renderSelected = () => {
    switch (selected) {
      case 'drd':
        return <Drd />;
      case 'golongan':
        return <DrdGolongan />;
      case 'kecamatan':
        return <DrdKecamatan />;
      case 'kelurahan':
        return <DrdKelurahan />;
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
                <Header current='DRD Selector' />
              </Box>

              {!selected ? (
                <Card sx={{ p: 3 }}>
                  <CardContent>
                    <Typography variant='h6' gutterBottom>
                      Pilih Jenis DRD yang ingin ditampilkan
                    </Typography>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Button
                          variant='contained'
                          fullWidth
                          onClick={() => setSelected('drd')}
                        >
                          DRD
                        </Button>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Button
                          variant='contained'
                          fullWidth
                          onClick={() => setSelected('golongan')}
                        >
                          DRD Golongan
                        </Button>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Button
                          variant='contained'
                          fullWidth
                          onClick={() => setSelected('kecamatan')}
                        >
                          DRD Kecamatan
                        </Button>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Button
                          variant='contained'
                          fullWidth
                          onClick={() => setSelected('kelurahan')}
                        >
                          DRD Kelurahan
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              ) : (
                <Box>{renderSelected()}</Box>
              )}
            </Box>
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}
