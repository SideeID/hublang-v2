import * as React from 'react';
import {
  DataGridPro,
  GridColDef,
  GridColumnGroupingModel,
} from '@mui/x-data-grid-pro';

type Row = {
  id: number;
  kasir: string;
  // jumlahRayon: number;
  // Total DRD Penagihan
  tdrd_lancar_lbr: number;
  tdrd_lancar_jumlah: number;
  tdrd_tunggakan_lbr: number;
  tdrd_tunggakan_jumlah: number;
  tdrd_total_lbr: number;
  tdrd_total_jumlah: number;
  // Total Lunas DRD Penagihan
  lunas_lancar_lbr: number;
  lunas_lancar_jumlah: number;
  lunas_tunggakan_lbr: number;
  lunas_tunggakan_jumlah: number;
  lunas_total_lbr: number;
  lunas_total_jumlah: number;
  // Sisa DRD Penagihan
  sisa_lancar_lbr: number;
  sisa_lancar_jumlah: number;
  sisa_tunggakan_lbr: number;
  sisa_tunggakan_jumlah: number;
  sisa_total_lbr: number;
  sisa_total_jumlah: number;
  // Efisiensi
  ef_lancar: number;
  ef_tunggakan: number;
  ef_total: number;
};

const columns: GridColDef<Row>[] = [
  {
    field: 'kasir',
    headerName: 'Kasir',
    minWidth: 140,
    flex: 1,
    headerAlign: 'center',
  },
  // {
  //   field: 'jumlahRayon',
  //   headerName: 'Jumlah Rayon',
  //   type: 'number',
  //   width: 130,
  //   align: 'right',
  //   headerAlign: 'right',
  // },
  // Total DRD Penagihan - Lancar
  {
    field: 'tdrd_lancar_lbr',
    headerName: 'Lbr',
    type: 'number',
    width: 100,
    align: 'right',
    headerAlign: 'center',
  },
  {
    field: 'tdrd_lancar_jumlah',
    headerName: 'Jumlah',
    type: 'number',
    width: 120,
    align: 'right',
    headerAlign: 'center',
  },
  // Total DRD Penagihan - Tunggakan
  {
    field: 'tdrd_tunggakan_lbr',
    headerName: 'Lbr',
    type: 'number',
    width: 100,
    align: 'right',
    headerAlign: 'center',
  },
  {
    field: 'tdrd_tunggakan_jumlah',
    headerName: 'Jumlah',
    type: 'number',
    width: 120,
    align: 'right',
    headerAlign: 'center',
  },
  // Total DRD Penagihan - Total
  {
    field: 'tdrd_total_lbr',
    headerName: 'Lbr',
    type: 'number',
    width: 100,
    align: 'right',
    headerAlign: 'center',
  },
  {
    field: 'tdrd_total_jumlah',
    headerName: 'Jumlah',
    type: 'number',
    width: 120,
    align: 'right',
    headerAlign: 'center',
  },
  // Total Lunas DRD Penagihan - Lancar
  {
    field: 'lunas_lancar_lbr',
    headerName: 'Lbr',
    type: 'number',
    width: 100,
    align: 'right',
    headerAlign: 'center',
  },
  {
    field: 'lunas_lancar_jumlah',
    headerName: 'Jumlah',
    type: 'number',
    width: 120,
    align: 'right',
    headerAlign: 'center',
  },
  // Total Lunas DRD Penagihan - Tunggakan
  {
    field: 'lunas_tunggakan_lbr',
    headerName: 'Lbr',
    type: 'number',
    width: 100,
    align: 'right',
    headerAlign: 'center',
  },
  {
    field: 'lunas_tunggakan_jumlah',
    headerName: 'Jumlah',
    type: 'number',
    width: 120,
    align: 'right',
    headerAlign: 'center',
  },
  // Total Lunas DRD Penagihan - Total
  {
    field: 'lunas_total_lbr',
    headerName: 'Lbr',
    type: 'number',
    width: 100,
    align: 'right',
    headerAlign: 'center',
  },
  {
    field: 'lunas_total_jumlah',
    headerName: 'Jumlah',
    type: 'number',
    width: 120,
    align: 'right',
    headerAlign: 'center',
  },
  // Sisa DRD Penagihan - Lancar
  {
    field: 'sisa_lancar_lbr',
    headerName: 'Lbr',
    type: 'number',
    width: 100,
    align: 'right',
    headerAlign: 'right',
  },
  {
    field: 'sisa_lancar_jumlah',
    headerName: 'Jumlah',
    type: 'number',
    width: 120,
    align: 'right',
    headerAlign: 'right',
  },
  // Sisa DRD Penagihan - Tunggakan
  {
    field: 'sisa_tunggakan_lbr',
    headerName: 'Lbr',
    type: 'number',
    width: 100,
    align: 'right',
    headerAlign: 'right',
  },
  {
    field: 'sisa_tunggakan_jumlah',
    headerName: 'Jumlah',
    type: 'number',
    width: 120,
    align: 'right',
    headerAlign: 'right',
  },
  // Sisa DRD Penagihan - Total
  {
    field: 'sisa_total_lbr',
    headerName: 'Lbr',
    type: 'number',
    width: 100,
    align: 'right',
    headerAlign: 'right',
  },
  {
    field: 'sisa_total_jumlah',
    headerName: 'Jumlah',
    type: 'number',
    width: 120,
    align: 'right',
    headerAlign: 'right',
  },
  // Efisiensi
  {
    field: 'ef_lancar',
    headerName: 'Lancar',
    type: 'number',
    width: 110,
    align: 'right',
    headerAlign: 'right',
  },
  {
    field: 'ef_tunggakan',
    headerName: 'Tunggakan',
    type: 'number',
    width: 130,
    align: 'right',
    headerAlign: 'right',
  },
  {
    field: 'ef_total',
    headerName: 'Total',
    type: 'number',
    width: 110,
    align: 'right',
    headerAlign: 'right',
  },
];

const columnGroupingModel: GridColumnGroupingModel = [
  { groupId: 'Kasir', children: [{ field: 'kasir' }] },
  // { groupId: 'Jumlah Rayon', children: [{ field: 'jumlahRayon' }] },
  {
    groupId: 'Total DRD Penagihan',
    children: [
      {
        groupId: 'Lancar',
        children: [
          { field: 'tdrd_lancar_lbr' },
          { field: 'tdrd_lancar_jumlah' },
        ],
      },
      {
        groupId: 'Tunggakan',
        children: [
          { field: 'tdrd_tunggakan_lbr' },
          { field: 'tdrd_tunggakan_jumlah' },
        ],
      },
      {
        groupId: 'Total',
        children: [{ field: 'tdrd_total_lbr' }, { field: 'tdrd_total_jumlah' }],
      },
    ],
  },
  {
    groupId: 'Total Lunas DRD Penagihan',
    children: [
      {
        groupId: 'Lancar',
        children: [
          { field: 'lunas_lancar_lbr' },
          { field: 'lunas_lancar_jumlah' },
        ],
      },
      {
        groupId: 'Tunggakan',
        children: [
          { field: 'lunas_tunggakan_lbr' },
          { field: 'lunas_tunggakan_jumlah' },
        ],
      },
      {
        groupId: 'Total',
        children: [
          { field: 'lunas_total_lbr' },
          { field: 'lunas_total_jumlah' },
        ],
      },
    ],
  },
  {
    groupId: 'Sisa DRD Penagihan',
    children: [
      {
        groupId: 'Lancar',
        children: [
          { field: 'sisa_lancar_lbr' },
          { field: 'sisa_lancar_jumlah' },
        ],
      },
      {
        groupId: 'Tunggakan',
        children: [
          { field: 'sisa_tunggakan_lbr' },
          { field: 'sisa_tunggakan_jumlah' },
        ],
      },
      {
        groupId: 'Total',
        children: [{ field: 'sisa_total_lbr' }, { field: 'sisa_total_jumlah' }],
      },
    ],
  },
  {
    groupId: 'Efisiensi',
    children: [
      { field: 'ef_lancar' },
      { field: 'ef_tunggakan' },
      { field: 'ef_total' },
    ],
  },
];

const sampleRows: Row[] = [
  {
    id: 1,
    kasir: 'Kasir A',
    // jumlahRayon: 12,
    tdrd_lancar_lbr: 120,
    tdrd_lancar_jumlah: 24000000,
    tdrd_tunggakan_lbr: 30,
    tdrd_tunggakan_jumlah: 6000000,
    tdrd_total_lbr: 150,
    tdrd_total_jumlah: 30000000,
    lunas_lancar_lbr: 110,
    lunas_lancar_jumlah: 22000000,
    lunas_tunggakan_lbr: 20,
    lunas_tunggakan_jumlah: 4000000,
    lunas_total_lbr: 130,
    lunas_total_jumlah: 26000000,
    sisa_lancar_lbr: 10,
    sisa_lancar_jumlah: 2000000,
    sisa_tunggakan_lbr: 10,
    sisa_tunggakan_jumlah: 2000000,
    sisa_total_lbr: 20,
    sisa_total_jumlah: 4000000,
    ef_lancar: 88.5,
    ef_tunggakan: 40.0,
    ef_total: 86.7,
  },
  {
    id: 2,
    kasir: 'Kasir B',
    // jumlahRayon: 8,
    tdrd_lancar_lbr: 90,
    tdrd_lancar_jumlah: 18000000,
    tdrd_tunggakan_lbr: 25,
    tdrd_tunggakan_jumlah: 5000000,
    tdrd_total_lbr: 115,
    tdrd_total_jumlah: 23000000,
    lunas_lancar_lbr: 85,
    lunas_lancar_jumlah: 17000000,
    lunas_tunggakan_lbr: 18,
    lunas_tunggakan_jumlah: 3600000,
    lunas_total_lbr: 103,
    lunas_total_jumlah: 20600000,
    sisa_lancar_lbr: 5,
    sisa_lancar_jumlah: 1000000,
    sisa_tunggakan_lbr: 7,
    sisa_tunggakan_jumlah: 1400000,
    sisa_total_lbr: 12,
    sisa_total_jumlah: 2400000,
    ef_lancar: 90.0,
    ef_tunggakan: 41.5,
    ef_total: 89.6,
  },
];

export default function CustomizedDataGrid({
  rows = sampleRows,
}: {
  rows?: Row[];
}) {
  return (
    <DataGridPro
      density='compact'
      disableColumnMenu
      disableRowSelectionOnClick
      rows={rows}
      columns={columns}
      columnGroupingModel={columnGroupingModel}
      columnGroupHeaderHeight={36}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
      }
      initialState={{
        pagination: { paginationModel: { pageSize: 20 } },
      }}
      pageSizeOptions={[10, 20, 50]}
      slotProps={{
        filterPanel: {
          filterFormProps: {
            logicOperatorInputProps: { variant: 'outlined', size: 'small' },
            columnInputProps: {
              variant: 'outlined',
              size: 'small',
              sx: { mt: 'auto' },
            },
            operatorInputProps: {
              variant: 'outlined',
              size: 'small',
              sx: { mt: 'auto' },
            },
            valueInputProps: {
              InputComponentProps: { variant: 'outlined', size: 'small' },
            },
          },
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
  );
}
