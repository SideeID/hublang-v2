import * as React from 'react';
import { DataGridPro, type GridColDef } from '@mui/x-data-grid-pro';
import Box from '@mui/material/Box';
import type { DrdRekapTableProps } from './DrdRekapTable';

interface RawRekapLike {
  nama: string;
  totalpel: number | string;
  total_tagihan: number | string;
}

interface MobileRow {
  id: number;
  nama: string;
  pelanggan_total: number;
  total_tagihan: number;
}

function toNum(v: unknown): number {
  if (typeof v === 'number') return v;
  const n = Number(v);
  return Number.isNaN(n) ? 0 : n;
}

export default function DrdRekapMobileList({
  data,
}: {
  data?: DrdRekapTableProps['data'];
}) {
  const rows = React.useMemo<MobileRow[]>(() => {
    if (!Array.isArray(data)) return [];
    return data.map((r, idx) => {
      const item = r as unknown as RawRekapLike;
      return {
        id: idx + 1,
        nama: item.nama,
        pelanggan_total: toNum(item.totalpel),
        total_tagihan: toNum(item.total_tagihan),
      };
    });
  }, [data]);

  const columns = React.useMemo<GridColDef<MobileRow>[]>(
    () => [
      {
        field: 'nama',
        headerName: 'Nama',
        flex: 1,
        minWidth: 140,
        headerAlign: 'center',
        align: 'left',
        colSpan: (p) => (p.row?.id === -1 ? 3 : undefined),
        renderCell: (p) => (p.row?.id === -1 ? 'Total' : p.value),
      },
      {
        field: 'pelanggan_total',
        headerName: 'Total Pelanggan',
        type: 'number',
        width: 140,
        headerAlign: 'center',
        align: 'right',
        colSpan: (p) => (p.row?.id === -1 ? 0 : undefined),
      },
      {
        field: 'total_tagihan',
        headerName: 'Total Tagihan',
        type: 'number',
        width: 150,
        headerAlign: 'center',
        align: 'right',
        colSpan: (p) => (p.row?.id === -1 ? 0 : undefined),
      },
    ],
    [],
  );

  const pinnedBottom = React.useMemo(
    () =>
      [
        rows.length
          ? {
              id: -1,
              nama: 'Total',
              pelanggan_total: rows.reduce(
                (a, r) => a + (r.pelanggan_total || 0),
                0,
              ),
              total_tagihan: rows.reduce(
                (a, r) => a + (r.total_tagihan || 0),
                0,
              ),
            }
          : undefined,
      ].filter(Boolean) as MobileRow[],
    [rows],
  );

  return (
    <Box sx={{ width: '100%' }}>
      <DataGridPro
        autoHeight
        rows={rows}
        columns={columns}
        density='compact'
        hideFooter
        disableRowSelectionOnClick
        pinnedRows={{ bottom: pinnedBottom }}
        getRowClassName={(p) => (p.id === -1 ? 'total-row' : '')}
        sx={{
          '& .MuiDataGrid-cell': {
            py: 0.5,
            px: 1,
            fontSize: '0.9rem',
            boxSizing: 'border-box',
          },
          '& .MuiDataGrid-columnHeader': {
            py: 0.5,
            fontSize: '0.95rem',
          },
          '& .MuiDataGrid-columnHeaders': {
            borderBottom: '2px solid rgba(0,0,0,0.08)',
          },
          '& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell': {
            borderRight: '1px solid rgba(0,0,0,0.08)',
          },
          '& .MuiDataGrid-columnSeparator': { display: 'none' },
          '& .MuiDataGrid-row.total-row .MuiDataGrid-cell': {
            fontWeight: 'bold',
            backgroundColor: 'action.hover',
          },
        }}
      />
    </Box>
  );
}
