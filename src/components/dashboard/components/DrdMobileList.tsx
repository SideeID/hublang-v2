import * as React from 'react';
import { DataGridPro, GridColDef } from '@mui/x-data-grid-pro';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export interface DrdMobileGroupRow {
  id: number;
  nama: string;
  pelanggan_total: number;
  total_tagihan: number;
}

export interface DrdMobileListProps {
  groups: Array<{
    groupKey: string;
    rows: DrdMobileGroupRow[];
  }>;
}

const buildColumns = (): GridColDef<DrdMobileGroupRow>[] => [
  {
    field: 'nama',
    headerName: 'Nama',
    flex: 1,
    headerAlign: 'center',
    align: 'left',
    colSpan: (p) => (p.row?.id === -1 ? 3 : undefined),
    renderCell: (p) => (p.row?.id === -1 ? 'Total' : p.value),
  },
  {
    field: 'pelanggan_total',
    headerName: 'Total Pelanggan',
    type: 'number',
    headerAlign: 'center',
    align: 'right',
    colSpan: (p) => (p.row?.id === -1 ? 0 : undefined),
  },
  {
    field: 'total_tagihan',
    headerName: 'Total Tagihan',
    type: 'number',
    headerAlign: 'center',
    align: 'right',
    colSpan: (p) => (p.row?.id === -1 ? 0 : undefined),
  },
];

export default function DrdMobileList({ groups }: DrdMobileListProps) {
  const columns = React.useMemo(() => buildColumns(), []);

  return (
    <Box sx={{ width: '100%' }}>
      {groups.map(({ groupKey, rows }) => {
        const pinnedBottom = [
          {
            id: -1,
            nama: 'Total',
            pelanggan_total: rows.reduce(
              (acc, r) => acc + (r.pelanggan_total || 0),
              0,
            ),
            total_tagihan: rows.reduce(
              (acc, r) => acc + (r.total_tagihan || 0),
              0,
            ),
          } as DrdMobileGroupRow,
        ];
        return (
          <Box key={groupKey} sx={{ mb: 3 }}>
            <Typography variant='subtitle1' sx={{ mb: 1, fontWeight: 600 }}>
              {groupKey}
            </Typography>
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
      })}
    </Box>
  );
}
