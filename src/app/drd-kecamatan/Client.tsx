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
import SideMenu from '../../components/dashboard/components/SideMenu';
import AppNavbar from '../../components/dashboard/components/AppNavbar';
import Header from '../../components/dashboard/components/Header';
import AppTheme from '../../components/shared-theme/AppTheme';
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from '../../components/dashboard/theme/customizations';
import dayjs from 'dayjs';
import { useDrd } from '@/hooks/useDrd';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Typography from '@mui/material/Typography';

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

type Row = {
  id: number;
  no: number;
  kecamatan: string; // name column label changed
  wilayah: string;
  pelanggan_total: number;
  pelanggan_aktif: number;
  pelanggan_pasif: number;
  pelanggan_m3: number;
  tagihan_harga_air: number;
  tagihan_administrasi: number;
  tagihan_data_meter: number;
  total_tagihan: number;
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
    colSpan: (p) => (p.row?.id === -1 ? 2 : undefined),
    renderCell: (p) => (p.row?.id === -1 ? 'Total' : p.value),
  },
  {
    field: 'kecamatan',
    headerName: 'KECAMATAN',
    minWidth: 180,
    flex: 1,
    colSpan: (p) => (p.row?.id === -1 ? 0 : undefined),
  },
  { field: 'wilayah', headerName: 'WILAYAH', minWidth: 160, flex: 1 },
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
  {
    field: 'total_tagihan',
    headerName: 'TOTAL TAGIHAN',
    type: 'number',
    width: 160,
    align: 'right',
    headerAlign: 'right',
  },
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
  const count = data.length || 1;
  return {
    sum,
    avg: { rata_m3: sum.rata_m3 / count, rata_rupiah: sum.rata_rupiah / count },
  };
}

export default function Client() {
  const [month, setMonth] = React.useState(dayjs());
  const periode = React.useMemo(() => month.format('YYYYMM'), [month]);
  const { data, isLoading, isError, error } = useDrd(periode, true);

  const toInt = (s?: string | number) => {
    if (typeof s === 'number') return s;
    const n = Number(s);
    return Number.isNaN(n) ? 0 : n;
  };
  const toFloat = (s?: string | number) => {
    if (typeof s === 'number') return s;
    const n = parseFloat(String(s ?? '0'));
    return Number.isNaN(n) ? 0 : n;
  };

  const grouped = React.useMemo(() => {
    const items = data?.data ?? [];
    const map = new Map<string, Row[]>();
    items.forEach((it) => {
      const key = it.wilayah || 'Tanpa Wilayah';
      const arr = map.get(key) ?? [];
      const row: Row = {
        id: it.id,
        no: arr.length + 1,
        kecamatan: it.nama,
        wilayah: it.wilayah,
        pelanggan_total: toInt(it.totalpel),
        pelanggan_aktif: toInt(it.jmlaktif),
        pelanggan_pasif: toInt(it.jmlpelpasif),
        pelanggan_m3: toInt(it.jmlm3),
        tagihan_harga_air: toInt(it.harga_air),
        tagihan_administrasi: toInt(it.administrasi),
        tagihan_data_meter: toInt(it.danameter),
        total_tagihan: toInt(it.total_tagihan),
        rata_m3: toFloat(it.rata2m3),
        rata_rupiah: toFloat(it.rata2rp),
      };
      arr.push(row);
      map.set(key, arr);
    });
    return map;
  }, [data]);

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
                <Header current='Ikhtisar Rekening By IKK (Kecamatan)' />
              </Box>
              <Box sx={{ mb: 1 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Box sx={{ mb: 1 }}>
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
                  </Box>
                </LocalizationProvider>
              </Box>

              {isLoading ? (
                <Box sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
                  <CircularProgress size={24} />
                </Box>
              ) : isError ? (
                <Alert severity='error'>
                  {(error as Error)?.message || 'Gagal memuat data'}
                </Alert>
              ) : Array.from(grouped.entries()).length === 0 ? (
                <Alert severity='info'>Tidak ada data untuk periode ini.</Alert>
              ) : (
                Array.from(grouped.entries()).map(([wilayah, rows]) => {
                  const { sum, avg } = computeTotals(rows);
                  const pinnedBottom = [
                    {
                      id: -1,
                      no: 0,
                      kecamatan: 'Total',
                      wilayah: '',
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
                  ];
                  return (
                    <Box key={wilayah} sx={{ mb: 3 }}>
                      <Typography variant='h6' sx={{ mb: 1 }}>
                        {wilayah}
                      </Typography>
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
                  );
                })
              )}
            </Box>
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}
