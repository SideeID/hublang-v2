import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { DataGridPro, GridColDef } from '@mui/x-data-grid-pro';

export type MonthlyRow = {
  id: number;
  wilayah: string;
  lancar: number;
  tunggakan: number;
  efisiensi: number; // percentage 0-100
};

const columns: GridColDef<MonthlyRow>[] = [
  { field: 'wilayah', headerName: 'Wilayah', flex: 1, minWidth: 140 },
  {
    field: 'lancar',
    headerName: 'Lancar',
    type: 'number',
    align: 'right',
    headerAlign: 'right',
    width: 110,
  },
  {
    field: 'tunggakan',
    headerName: 'Tunggakan',
    type: 'number',
    align: 'right',
    headerAlign: 'right',
    width: 130,
  },
  {
    field: 'efisiensi',
    headerName: 'Efisiensi',
    type: 'number',
    align: 'right',
    headerAlign: 'right',
    width: 120,
  },
];
export default function MonthlyComparisonGrids({
  lastMonth,
  thisMonth,
}: {
  lastMonth: MonthlyRow[];
  thisMonth: MonthlyRow[];
}) {
  return (
    <Grid container spacing={2} columns={12}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Card variant='outlined' sx={{ width: '100%' }}>
          <CardContent>
            <Typography component='h2' variant='subtitle2' gutterBottom>
              Bulan lalu
            </Typography>
            <DataGridPro
              autoHeight
              density='compact'
              disableRowSelectionOnClick
              hideFooter
              rows={lastMonth}
              columns={columns}
              disableColumnMenu
              sx={{ mt: 1 }}
            />
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Card variant='outlined' sx={{ width: '100%' }}>
          <CardContent>
            <Typography component='h2' variant='subtitle2' gutterBottom>
              Bulan sekarang
            </Typography>
            <DataGridPro
              autoHeight
              density='compact'
              disableRowSelectionOnClick
              hideFooter
              rows={thisMonth}
              columns={columns}
              disableColumnMenu
              sx={{ mt: 1 }}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
