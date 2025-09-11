import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {
  DataGridPro,
  GridColDef,
  GridColumnGroupingModel,
} from '@mui/x-data-grid-pro';

export type MonthlyRow = {
  id: number;
  wilayah: string;
  lancar: number;
  tunggakan: number;
  efisiensi: number;
};

type CombinedRow = {
  id: number;
  wilayah: string;
  this_lancar?: number;
  this_tunggakan?: number;
  this_efisiensi?: number;
  last_lancar?: number;
  last_tunggakan?: number;
  last_efisiensi?: number;
  selisih_rp?: number;
};

const baseColumns: GridColDef<CombinedRow>[] = [
  {
    field: 'wilayah',
    headerName: '',
    flex: 1,
    headerAlign: 'center',
  },
  {
    field: 'this_lancar',
    headerName: 'Lancar',
    type: 'number',
    align: 'right',
    headerAlign: 'center',
  },
  {
    field: 'this_tunggakan',
    headerName: 'Tunggakan',
    type: 'number',
    align: 'right',
    headerAlign: 'center',
  },
  {
    field: 'this_efisiensi',
    headerName: 'Efisiensi',
    type: 'number',
    align: 'right',
    headerAlign: 'center',
  },
  {
    field: 'last_lancar',
    headerName: 'Lancar',
    type: 'number',
    align: 'right',
    headerAlign: 'center',
  },
  {
    field: 'last_tunggakan',
    headerName: 'Tunggakan',
    type: 'number',
    align: 'right',
    headerAlign: 'center',
  },
  {
    field: 'last_efisiensi',
    headerName: 'Efisiensi',
    type: 'number',
    align: 'right',
    headerAlign: 'center',
  },
  {
    field: 'selisih_rp',
    headerName: 'Selisih',
    type: 'number',
    align: 'right',
    headerAlign: 'center',
  },
];

const columnGroupingModel: GridColumnGroupingModel = [
  { groupId: 'Wilayah', children: [{ field: 'wilayah' }] },
  {
    groupId: 'Bulan sekarang',
    children: [
      { field: 'this_lancar' },
      { field: 'this_tunggakan' },
      { field: 'this_efisiensi' },
    ],
  },
  {
    groupId: 'Bulan lalu',
    children: [
      { field: 'last_lancar' },
      { field: 'last_tunggakan' },
      { field: 'last_efisiensi' },
    ],
  },
  {
    groupId: 'Selisih (Rp)',
    children: [{ field: 'selisih_rp' }],
  },
];
export default function MonthlyComparisonGrids({
  lastMonth,
  thisMonth,
  loading = false,
}: {
  lastMonth: MonthlyRow[];
  thisMonth: MonthlyRow[];
  loading?: boolean;
}) {
  const computedData = React.useMemo(() => {
    const map = new Map<string, CombinedRow>();
    let id = 1;
    for (const r of thisMonth) {
      const key = r.wilayah;
      const existing = map.get(key) || { id: id++, wilayah: key };
      existing.this_lancar = r.lancar;
      existing.this_tunggakan = r.tunggakan;
      existing.this_efisiensi = r.efisiensi;
      map.set(key, existing);
    }
    for (const r of lastMonth) {
      const key = r.wilayah;
      const existing = map.get(key) || { id: id++, wilayah: key };
      existing.last_lancar = r.lancar;
      existing.last_tunggakan = r.tunggakan;
      existing.last_efisiensi = r.efisiensi;
      map.set(key, existing);
    }
    for (const v of map.values()) {
      const thisSum = (v.this_lancar ?? 0) + (v.this_tunggakan ?? 0);
      const lastSum = (v.last_lancar ?? 0) + (v.last_tunggakan ?? 0);
      v.selisih_rp = lastSum - thisSum;
    }
    const dataRows = Array.from(map.values());
    const totalRow: CombinedRow = {
      id: -1,
      wilayah: 'Total',
      this_lancar: dataRows.reduce((sum, r) => sum + (r.this_lancar ?? 0), 0),
      this_tunggakan: dataRows.reduce(
        (sum, r) => sum + (r.this_tunggakan ?? 0),
        0,
      ),
      this_efisiensi: dataRows.reduce(
        (sum, r) => sum + (r.this_efisiensi ?? 0),
        0,
      ),
      last_lancar: dataRows.reduce((sum, r) => sum + (r.last_lancar ?? 0), 0),
      last_tunggakan: dataRows.reduce(
        (sum, r) => sum + (r.last_tunggakan ?? 0),
        0,
      ),
      last_efisiensi: dataRows.reduce(
        (sum, r) => sum + (r.last_efisiensi ?? 0),
        0,
      ),
      selisih_rp: dataRows.reduce((sum, r) => sum + (r.selisih_rp ?? 0), 0),
    };
    return { dataRows, totalRow };
  }, [thisMonth, lastMonth]);

  const { dataRows, totalRow } = computedData;

  const columns = React.useMemo(() => {
    const charWidth = 8;
    const basePadding = 24;
    const minWidth = 80;
    const maxWidth = 220;

    const allRows = [...dataRows, totalRow];

    return baseColumns.map((col) => {
      if (col.type === 'number') {
        const headerLen = (col.headerName || '').length;
        let maxLen = headerLen;
        for (const r of allRows) {
          const raw = r[col.field as keyof CombinedRow];
          const num = typeof raw === 'number' ? raw : undefined;
          const str = num != null ? num.toLocaleString('id-ID') : '';
          if (str.length > maxLen) maxLen = str.length;
        }
        const computed = Math.min(
          Math.max(minWidth, basePadding + maxLen * charWidth),
          maxWidth,
        );
        return {
          ...col,
          width: computed,
        } as GridColDef<CombinedRow>;
      }
      return col;
    });
  }, [dataRows, totalRow]);

  const [rows, setRows] = React.useState<CombinedRow[]>([]);
  React.useEffect(() => {
    if (!loading) {
      setRows(dataRows);
    }
  }, [dataRows, loading]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box>
        <Card variant='outlined' sx={{ width: '100%' }}>
          <CardContent>
            <Typography component='h2' variant='subtitle2' gutterBottom>
              Laporan Penerimaan
            </Typography>
            <DataGridPro
              autoHeight
              density='compact'
              disableRowSelectionOnClick
              rows={rows}
              columns={columns}
              columnGroupingModel={columnGroupingModel}
              columnGroupHeaderHeight={36}
              loading={loading}
              initialState={{
                pagination: { paginationModel: { pageSize: 20 } },
                pinnedColumns: { left: ['wilayah'] },
              }}
              pageSizeOptions={[10, 20, 50]}
              pinnedRows={{ bottom: [totalRow] }}
              slotProps={{
                loadingOverlay: {
                  variant: 'skeleton',
                  noRowsVariant: 'skeleton',
                },
              }}
              sx={{
                '& .MuiDataGrid-columnHeaderTitle': {
                  textAlign: 'center',
                },
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
                '& .MuiDataGrid-row': {
                  border: '1px solid rgba(0,0,0,0.06)',
                },
                '& .MuiDataGrid-cell': {
                  border: '1px solid rgba(0,0,0,0.06)',
                },
                '& .MuiDataGrid-columnSeparator': {
                  display: 'none',
                },
              }}
            />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
