import * as React from 'react';
import { DataGridPro, GridColDef } from '@mui/x-data-grid-pro';
import Box from '@mui/material/Box';

type MobileRow = {
  id: number;
  wilayah: string;
  total_tagihan: number;
};

export default function DrdMobileList({ rows }: { rows: MobileRow[] }) {
  const columns: GridColDef<MobileRow>[] = [
    {
      field: 'wilayah',
      headerName: 'Nama',
      flex: 1,
      minWidth: 140,
      headerAlign: 'center',
      align: 'left',
      colSpan: (p) => (p.row?.id === -1 ? 2 : undefined),
      renderCell: (p) => (p.row?.id === -1 ? 'Total' : p.value),
    },
    {
      field: 'total_tagihan',
      headerName: 'Total Tagihan',
      type: 'number',
      width: 160,
      headerAlign: 'center',
      align: 'right',
      colSpan: (p) => (p.row?.id === -1 ? 0 : undefined),
    },
  ];

  const pinnedBottom = React.useMemo(
    () => [
      {
        id: -1,
        wilayah: 'Total',
        total_tagihan: rows.reduce((acc, r) => acc + (r.total_tagihan || 0), 0),
      },
    ],
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
