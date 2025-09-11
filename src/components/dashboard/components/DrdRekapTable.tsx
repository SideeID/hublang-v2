'use client';

import * as React from 'react';
import {
  DataGridPro,
  type GridColDef,
  type GridColumnGroupingModel,
} from '@mui/x-data-grid-pro';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface RawRekapItem {
  nama: string;
  totalpel: number | string;
  jmlaktif: number | string;
  jmlpelpasif: number | string;
  jmlm3: number | string;
  harga_air: number | string;
  danameter: number | string;
  administrasi: number | string;
  total_tagihan: number | string;
  rata2m3: number | string;
  rata2rp: number | string;
}

export interface DrdRekapTableProps {
  data?: RawRekapItem[] | null;
  title?: string;
}

type Row = {
  id: number;
  nama: string;
  pelanggan_total: number;
  pelanggan_aktif: number;
  pelanggan_pasif: number;
  pelanggan_m3: number;
  tagihan_harga_air: number;
  tagihan_data_meter: number;
  tagihan_administrasi: number;
  total_tagihan: number;
  rata_m3: number;
  rata_rupiah: number;
};

const columns: GridColDef<Row>[] = [
  {
    field: 'nama',
    headerName: 'Nama',
    cellClassName: 'wrap-text',
    width: 200,
    colSpan: (p) => (p?.row && (p.row as Row).id === -1 ? 3 : undefined),
    renderCell: (p) => (p?.row && (p.row as Row).id === -1 ? 'Total' : p.value),
  },
  {
    field: 'pelanggan_total',
    headerName: 'Total',
    minWidth: 100,
    type: 'number',
    align: 'right',
    headerAlign: 'right',
    colSpan: (p) => (p?.row && (p.row as Row).id === -1 ? 0 : undefined),
  },
  {
    field: 'pelanggan_aktif',
    headerName: 'Aktif',
    minWidth: 100,
    type: 'number',
    align: 'right',
    headerAlign: 'right',
  },
  {
    field: 'pelanggan_pasif',
    headerName: 'Pasif',
    minWidth: 100,
    type: 'number',
    align: 'right',
    headerAlign: 'right',
  },
  {
    field: 'pelanggan_m3',
    headerName: 'M3',
    minWidth: 100,
    type: 'number',
    align: 'right',
    headerAlign: 'right',
  },
  {
    field: 'tagihan_harga_air',
    headerName: 'Harga Air',
    minWidth: 150,
    type: 'number',
    align: 'right',
    headerAlign: 'right',
  },
  {
    field: 'tagihan_data_meter',
    headerName: 'Data Meter',
    minWidth: 150,
    type: 'number',
    align: 'right',
    headerAlign: 'right',
  },
  {
    field: 'tagihan_administrasi',
    headerName: 'Administrasi',
    minWidth: 150,
    type: 'number',
    align: 'right',
    headerAlign: 'right',
  },
  {
    field: 'total_tagihan',
    headerName: 'TOTAL TAGIHAN',
    minWidth: 150,
    type: 'number',
    align: 'right',
    headerAlign: 'right',
  },
  {
    field: 'rata_m3',
    headerName: 'M3',
    minWidth: 100,
    type: 'number',
    align: 'right',
    headerAlign: 'right',
  },
  {
    field: 'rata_rupiah',
    headerName: 'RUPIAH',
    minWidth: 150,
    type: 'number',
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
      { field: 'tagihan_data_meter' },
      { field: 'tagihan_administrasi' },
    ],
  },
  {
    groupId: 'RATA-RATA',
    children: [{ field: 'rata_m3' }, { field: 'rata_rupiah' }],
  },
];

function toNum(v: number | string | undefined): number {
  if (typeof v === 'number') return v;
  const n = Number(v);
  return Number.isNaN(n) ? 0 : n;
}
function toFloat(v: number | string | undefined): number {
  if (typeof v === 'number') return v;
  const n = parseFloat(String(v ?? '0'));
  return Number.isNaN(n) ? 0 : n;
}

export default function DrdRekapTable({ data, title }: DrdRekapTableProps) {
  const rows = React.useMemo<Row[]>(() => {
    if (!Array.isArray(data)) return [];
    return data.map((r, idx) => ({
      id: idx + 1,
      nama: r.nama,
      pelanggan_total: toNum(r.totalpel),
      pelanggan_aktif: toNum(r.jmlaktif),
      pelanggan_pasif: toNum(r.jmlpelpasif),
      pelanggan_m3: toNum(r.jmlm3),
      tagihan_harga_air: toNum(r.harga_air),
      tagihan_data_meter: toNum(r.danameter),
      tagihan_administrasi: toNum(r.administrasi),
      total_tagihan: toNum(r.total_tagihan),
      rata_m3: toFloat(r.rata2m3),
      rata_rupiah: toFloat(r.rata2rp),
    }));
  }, [data]);

  const totals = React.useMemo(() => {
    const sum = {
      pelanggan_total: 0,
      pelanggan_aktif: 0,
      pelanggan_pasif: 0,
      pelanggan_m3: 0,
      tagihan_harga_air: 0,
      tagihan_data_meter: 0,
      tagihan_administrasi: 0,
      total_tagihan: 0,
      rata_m3: 0,
      rata_rupiah: 0,
    };
    rows.forEach((r) => {
      sum.pelanggan_total += r.pelanggan_total;
      sum.pelanggan_aktif += r.pelanggan_aktif;
      sum.pelanggan_pasif += r.pelanggan_pasif;
      sum.pelanggan_m3 += r.pelanggan_m3;
      sum.tagihan_harga_air += r.tagihan_harga_air;
      sum.tagihan_data_meter += r.tagihan_data_meter;
      sum.tagihan_administrasi += r.tagihan_administrasi;
      sum.total_tagihan += r.total_tagihan;
      sum.rata_m3 += r.rata_m3;
      sum.rata_rupiah += r.rata_rupiah;
    });
    const count = rows.length || 1;
    return {
      sum,
      avg: {
        rata_m3: sum.rata_m3 / count,
        rata_rupiah: sum.rata_rupiah / count,
      },
    };
  }, [rows]);

  if (!rows.length) return null;

  const pinnedBottom = [
    {
      id: -1,
      nama: 'Total',
      pelanggan_total: totals.sum.pelanggan_total,
      pelanggan_aktif: totals.sum.pelanggan_aktif,
      pelanggan_pasif: totals.sum.pelanggan_pasif,
      pelanggan_m3: totals.sum.pelanggan_m3,
      tagihan_harga_air: totals.sum.tagihan_harga_air,
      tagihan_data_meter: totals.sum.tagihan_data_meter,
      tagihan_administrasi: totals.sum.tagihan_administrasi,
      total_tagihan: totals.sum.total_tagihan,
      rata_m3: totals.avg.rata_m3,
      rata_rupiah: totals.avg.rata_rupiah,
    } as unknown as Row,
  ];

  return (
    <Box sx={{ mb: 3 }}>
      {title && (
        <Typography variant='h6' sx={{ mb: 1 }}>
          {title}
        </Typography>
      )}
      <DataGridPro
        rows={rows}
        columns={columns}
        columnGroupingModel={columnGroupingModel}
        getRowHeight={() => 'auto'}
        autosizeOnMount
        density='compact'
        autoHeight
        disableRowSelectionOnClick
        hideFooter
        pinnedRows={{ bottom: pinnedBottom }}
        sx={{
          '& .wrap-text .MuiDataGrid-cellContent': {
            whiteSpace: 'normal',
            overflow: 'visible',
            textOverflow: 'clip',
            wordBreak: 'break-word',
            lineHeight: 1.3,
            display: 'block',
          },
          '& .MuiDataGrid-columnHeaderTitle': { textAlign: 'center' },
          '& .MuiDataGrid-columnHeaderTitleContainer': {
            justifyContent: 'center',
          },
          '& .MuiDataGrid-columnGroupHeaderTitle': {
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          },
          '& .MuiDataGrid-columnGroupHeader': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          },
          '& .MuiDataGrid-columnHeaders': {
            borderBottom: '2px solid rgba(0,0,0,0.08)',
          },
          '& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell': {
            borderRight: '1px solid rgba(0,0,0,0.08)',
            borderBottom: '1px solid rgba(0,0,0,0.08)',
          },
          '& .MuiDataGrid-row': { border: '1px solid rgba(0,0,0,0.06)' },
          '& .MuiDataGrid-cell': { border: '1px solid rgba(0,0,0,0.06)' },
          '& .MuiDataGrid-columnSeparator': { display: 'none' },
        }}
      />
    </Box>
  );
}
