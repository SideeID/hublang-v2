'use client';

import * as React from 'react';
import type {} from '@mui/x-data-grid-pro/themeAugmentation';
import {
  DataGridPro,
  type GridColDef,
  type GridColumnGroupingModel,
} from '@mui/x-data-grid-pro';
import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import SideMenu from '../../components/dashboard/components/SideMenu';
import AppNavbar from '../../components/dashboard/components/AppNavbar';
import AppTheme from '../../components/shared-theme/AppTheme';
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from '../../components/dashboard/theme/customizations';

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

type Row = {
  id: number;
  no: number;
  golongan: string;
  // Pelanggan
  pelanggan_total: number;
  pelanggan_aktif: number;
  pelanggan_pasif: number;
  pelanggan_m3: number;
  // Tagihan
  tagihan_harga_air: number;
  tagihan_administrasi: number;
  tagihan_data_meter: number;
  // Total Tagihan (single column spans 2 header rows)
  total_tagihan: number;
  // Rata-rata
  rata_m3: number;
  rata_rupiah: number;
};

const columns: GridColDef<Row>[] = [
  {
    field: 'no',
    headerName: 'No',
    width: 70,
    align: 'right',
    headerAlign: 'right',
    colSpan: (params) => (params.row?.id === -1 ? 2 : undefined),
    renderCell: (params) => (params.row?.id === -1 ? 'Total' : params.value),
  },
  {
    field: 'golongan',
    headerName: 'GOLONGAN',
    minWidth: 140,
    flex: 1,
    colSpan: (params) => (params.row?.id === -1 ? 0 : undefined),
  },
  // Pelanggan group
  {
    field: 'pelanggan_total',
    headerName: 'Total',
    type: 'number',
    width: 110,
    align: 'right',
    headerAlign: 'right',
  },
  {
    field: 'pelanggan_aktif',
    headerName: 'Aktif',
    type: 'number',
    width: 110,
    align: 'right',
    headerAlign: 'right',
  },
  {
    field: 'pelanggan_pasif',
    headerName: 'Pasif',
    type: 'number',
    width: 110,
    align: 'right',
    headerAlign: 'right',
  },
  {
    field: 'pelanggan_m3',
    headerName: 'M3',
    type: 'number',
    width: 110,
    align: 'right',
    headerAlign: 'right',
  },
  // Tagihan group
  {
    field: 'tagihan_harga_air',
    headerName: 'Harga Air',
    type: 'number',
    width: 140,
    align: 'right',
    headerAlign: 'right',
  },
  {
    field: 'tagihan_administrasi',
    headerName: 'Administrasi',
    type: 'number',
    width: 140,
    align: 'right',
    headerAlign: 'right',
  },
  {
    field: 'tagihan_data_meter',
    headerName: 'Data Meter',
    type: 'number',
    width: 140,
    align: 'right',
    headerAlign: 'right',
  },
  // Total Tagihan single column
  {
    field: 'total_tagihan',
    headerName: 'TOTAL TAGIHAN',
    type: 'number',
    width: 160,
    align: 'right',
    headerAlign: 'right',
  },
  // Rata-rata group
  {
    field: 'rata_m3',
    headerName: 'M3',
    type: 'number',
    width: 110,
    align: 'right',
    headerAlign: 'right',
  },
  {
    field: 'rata_rupiah',
    headerName: 'RUPIAH',
    type: 'number',
    width: 140,
    align: 'right',
    headerAlign: 'right',
  },
];

const columnGroupingModel: GridColumnGroupingModel = [
  // Leave 'no', 'golongan', and 'total_tagihan' ungrouped so they span 2 header rows
  {
    groupId: 'Pelanggan',
    children: [
      { field: 'pelanggan_total' },
      { field: 'pelanggan_aktif' },
      { field: 'pelanggan_pasif' },
      { field: 'pelanggan_m3' },
    ],
  },
  {
    groupId: 'TAGIHAN',
    children: [
      { field: 'tagihan_harga_air' },
      { field: 'tagihan_administrasi' },
      { field: 'tagihan_data_meter' },
    ],
  },
  {
    groupId: 'RATA-RATA',
    children: [{ field: 'rata_m3' }, { field: 'rata_rupiah' }],
  },
];

const rows: Row[] = [
  {
    id: 1,
    no: 1,
    golongan: 'Sosial A',
    pelanggan_total: 120,
    pelanggan_aktif: 110,
    pelanggan_pasif: 10,
    pelanggan_m3: 1450,
    tagihan_harga_air: 22500000,
    tagihan_administrasi: 1200000,
    tagihan_data_meter: 800000,
    total_tagihan: 24500000,
    rata_m3: 12.1,
    rata_rupiah: 204167,
  },
  {
    id: 2,
    no: 2,
    golongan: 'Rumah Tangga A',
    pelanggan_total: 200,
    pelanggan_aktif: 188,
    pelanggan_pasif: 12,
    pelanggan_m3: 3100,
    tagihan_harga_air: 42000000,
    tagihan_administrasi: 2000000,
    tagihan_data_meter: 1500000,
    total_tagihan: 45500000,
    rata_m3: 16.5,
    rata_rupiah: 242021,
  },
];

function computeTotals(data: Row[]) {
  const sum = {
    pelanggan_total: 0,
    pelanggan_aktif: 0,
    pelanggan_pasif: 0,
    pelanggan_m3: 0,
    tagihan_harga_air: 0,
    tagihan_administrasi: 0,
    tagihan_data_meter: 0,
    total_tagihan: 0,
    rata_m3: 0,
    rata_rupiah: 0,
  };
  data.forEach((r) => {
    sum.pelanggan_total += r.pelanggan_total;
    sum.pelanggan_aktif += r.pelanggan_aktif;
    sum.pelanggan_pasif += r.pelanggan_pasif;
    sum.pelanggan_m3 += r.pelanggan_m3;
    sum.tagihan_harga_air += r.tagihan_harga_air;
    sum.tagihan_administrasi += r.tagihan_administrasi;
    sum.tagihan_data_meter += r.tagihan_data_meter;
    sum.total_tagihan += r.total_tagihan;
    sum.rata_m3 += r.rata_m3;
    sum.rata_rupiah += r.rata_rupiah;
  });
  // For averages, keep simple mean across rows
  const count = data.length || 1;
  return {
    sum,
    avg: { rata_m3: sum.rata_m3 / count, rata_rupiah: sum.rata_rupiah / count },
  };
}

export default function Page() {
  const { sum, avg } = React.useMemo(() => computeTotals(rows), []);

  const pinnedBottom = React.useMemo(
    () => [
      {
        id: -1,
        no: 0,
        golongan: 'Total',
        pelanggan_total: sum.pelanggan_total,
        pelanggan_aktif: sum.pelanggan_aktif,
        pelanggan_pasif: sum.pelanggan_pasif,
        pelanggan_m3: sum.pelanggan_m3,
        tagihan_harga_air: sum.tagihan_harga_air,
        tagihan_administrasi: sum.tagihan_administrasi,
        tagihan_data_meter: sum.tagihan_data_meter,
        total_tagihan: sum.total_tagihan,
        rata_m3: avg.rata_m3,
        rata_rupiah: avg.rata_rupiah,
      } as unknown as Row,
    ],
    [sum, avg],
  );

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
              <Typography component='h2' variant='h6' sx={{ mb: 2 }}>
                DRD
              </Typography>
              <Box sx={{ height: 'auto', width: '100%' }}>
                <DataGridPro
                  rows={rows}
                  columns={columns}
                  columnGroupingModel={columnGroupingModel}
                  density='compact'
                  autoHeight
                  disableRowSelectionOnClick
                  hideFooter
                  pinnedRows={{ bottom: pinnedBottom }}
                />
              </Box>
            </Box>
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}
