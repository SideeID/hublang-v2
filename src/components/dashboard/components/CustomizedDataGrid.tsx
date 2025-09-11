import * as React from 'react';
import useSWR from 'swr';
import {
  DataGridPro,
  GridColDef,
  GridColumnGroupingModel,
} from '@mui/x-data-grid-pro';
import type {
  RekapParams,
  RekapResponse,
  RekapDetailItem,
} from '@/lib/api/hublang';
import { getRekap } from '@/lib/api/hublang';

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
  // {
  //   field: 'tdrd_lancar_lbr',
  //   headerName: 'Lbr',
  //   type: 'number',
  //   width: 100,
  //   align: 'right',
  //   headerAlign: 'center',
  // },
  {
    field: 'tdrd_lancar_jumlah',
    headerName: 'Jumlah',
    type: 'number',
    width: 120,
    align: 'right',
    headerAlign: 'center',
  },
  // Total DRD Penagihan - Tunggakan
  // {
  //   field: 'tdrd_tunggakan_lbr',
  //   headerName: 'Lbr',
  //   type: 'number',
  //   width: 100,
  //   align: 'right',
  //   headerAlign: 'center',
  // },
  {
    field: 'tdrd_tunggakan_jumlah',
    headerName: 'Jumlah',
    type: 'number',
    width: 120,
    align: 'right',
    headerAlign: 'center',
  },
  // Total DRD Penagihan - Total
  // {
  //   field: 'tdrd_total_lbr',
  //   headerName: 'Lbr',
  //   type: 'number',
  //   width: 100,
  //   align: 'right',
  //   headerAlign: 'center',
  // },
  {
    field: 'tdrd_total_jumlah',
    headerName: 'Jumlah',
    type: 'number',
    width: 120,
    align: 'right',
    headerAlign: 'center',
  },
  // Total Lunas DRD Penagihan - Lancar
  // {
  //   field: 'lunas_lancar_lbr',
  //   headerName: 'Lbr',
  //   type: 'number',
  //   width: 100,
  //   align: 'right',
  //   headerAlign: 'center',
  // },
  {
    field: 'lunas_lancar_jumlah',
    headerName: 'Jumlah',
    type: 'number',
    width: 120,
    align: 'right',
    headerAlign: 'center',
  },
  // Total Lunas DRD Penagihan - Tunggakan
  // {
  //   field: 'lunas_tunggakan_lbr',
  //   headerName: 'Lbr',
  //   type: 'number',
  //   width: 100,
  //   align: 'right',
  //   headerAlign: 'center',
  // },
  {
    field: 'lunas_tunggakan_jumlah',
    headerName: 'Jumlah',
    type: 'number',
    width: 120,
    align: 'right',
    headerAlign: 'center',
  },
  // Total Lunas DRD Penagihan - Total
  // {
  //   field: 'lunas_total_lbr',
  //   headerName: 'Lbr',
  //   type: 'number',
  //   width: 100,
  //   align: 'right',
  //   headerAlign: 'center',
  // },
  {
    field: 'lunas_total_jumlah',
    headerName: 'Jumlah',
    type: 'number',
    width: 120,
    align: 'right',
    headerAlign: 'center',
  },
  // Sisa DRD Penagihan - Lancar
  // {
  //   field: 'sisa_lancar_lbr',
  //   headerName: 'Lbr',
  //   type: 'number',
  //   width: 100,
  //   align: 'right',
  //   headerAlign: 'right',
  // },
  {
    field: 'sisa_lancar_jumlah',
    headerName: 'Jumlah',
    type: 'number',
    width: 120,
    align: 'right',
    headerAlign: 'right',
  },
  // Sisa DRD Penagihan - Tunggakan
  // {
  //   field: 'sisa_tunggakan_lbr',
  //   headerName: 'Lbr',
  //   type: 'number',
  //   width: 100,
  //   align: 'right',
  //   headerAlign: 'right',
  // },
  {
    field: 'sisa_tunggakan_jumlah',
    headerName: 'Jumlah',
    type: 'number',
    width: 120,
    align: 'right',
    headerAlign: 'right',
  },
  // Sisa DRD Penagihan - Total
  // {
  //   field: 'sisa_total_lbr',
  //   headerName: 'Lbr',
  //   type: 'number',
  //   width: 100,
  //   align: 'right',
  //   headerAlign: 'right',
  // },
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

// Base grouping model (excluding the dynamic single-field Kasir/Loket group which will be added per source).
const baseColumnGroupingModel: GridColumnGroupingModel = [
  // { groupId: 'Kasir', children: [{ field: 'kasir' }] },
  // { groupId: 'Jumlah Rayon', children: [{ field: 'jumlahRayon' }] },
  {
    groupId: 'Total DRD Penagihan',
    children: [
      {
        groupId: 'Lancar',
        children: [
          // { field: 'tdrd_lancar_lbr' },
          { field: 'tdrd_lancar_jumlah' },
        ],
      },
      {
        groupId: 'Tunggakan',
        children: [
          // { field: 'tdrd_tunggakan_lbr' },
          { field: 'tdrd_tunggakan_jumlah' },
        ],
      },
      {
        groupId: 'Total',
        children: [
          // { field: 'tdrd_total_lbr' },
          { field: 'tdrd_total_jumlah' },
        ],
      },
    ],
  },
  {
    groupId: 'Total Lunas DRD Penagihan',
    children: [
      {
        groupId: 'Lancar',
        children: [
          // { field: 'lunas_lancar_lbr' },
          { field: 'lunas_lancar_jumlah' },
        ],
      },
      {
        groupId: 'Tunggakan',
        children: [
          // { field: 'lunas_tunggakan_lbr' },
          { field: 'lunas_tunggakan_jumlah' },
        ],
      },
      {
        groupId: 'Total',
        children: [
          // { field: 'lunas_total_lbr' },
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
          // { field: 'sisa_lancar_lbr' },
          { field: 'sisa_lancar_jumlah' },
        ],
      },
      {
        groupId: 'Tunggakan',
        children: [
          // { field: 'sisa_tunggakan_lbr' },
          { field: 'sisa_tunggakan_jumlah' },
        ],
      },
      {
        groupId: 'Total',
        children: [
          // { field: 'sisa_total_lbr' },
          { field: 'sisa_total_jumlah' },
        ],
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

function computeTotals(data: Row[]) {
  const sum = {
    tdrd_lancar_lbr: 0,
    tdrd_lancar_jumlah: 0,
    tdrd_tunggakan_lbr: 0,
    tdrd_tunggakan_jumlah: 0,
    tdrd_total_lbr: 0,
    tdrd_total_jumlah: 0,
    lunas_lancar_lbr: 0,
    lunas_lancar_jumlah: 0,
    lunas_tunggakan_lbr: 0,
    lunas_tunggakan_jumlah: 0,
    lunas_total_lbr: 0,
    lunas_total_jumlah: 0,
    sisa_lancar_lbr: 0,
    sisa_lancar_jumlah: 0,
    sisa_tunggakan_lbr: 0,
    sisa_tunggakan_jumlah: 0,
    sisa_total_lbr: 0,
    sisa_total_jumlah: 0,
  };

  data.forEach((r) => {
    sum.tdrd_lancar_lbr += (r.tdrd_lancar_lbr as number) || 0;
    sum.tdrd_lancar_jumlah += (r.tdrd_lancar_jumlah as number) || 0;
    sum.tdrd_tunggakan_lbr += (r.tdrd_tunggakan_lbr as number) || 0;
    sum.tdrd_tunggakan_jumlah += (r.tdrd_tunggakan_jumlah as number) || 0;
    sum.tdrd_total_lbr += (r.tdrd_total_lbr as number) || 0;
    sum.tdrd_total_jumlah += (r.tdrd_total_jumlah as number) || 0;
    sum.lunas_lancar_lbr += (r.lunas_lancar_lbr as number) || 0;
    sum.lunas_lancar_jumlah += (r.lunas_lancar_jumlah as number) || 0;
    sum.lunas_tunggakan_lbr += (r.lunas_tunggakan_lbr as number) || 0;
    sum.lunas_tunggakan_jumlah += (r.lunas_tunggakan_jumlah as number) || 0;
    sum.lunas_total_lbr += (r.lunas_total_lbr as number) || 0;
    sum.lunas_total_jumlah += (r.lunas_total_jumlah as number) || 0;
    sum.sisa_lancar_lbr += (r.sisa_lancar_lbr as number) || 0;
    sum.sisa_lancar_jumlah += (r.sisa_lancar_jumlah as number) || 0;
    sum.sisa_tunggakan_lbr += (r.sisa_tunggakan_lbr as number) || 0;
    sum.sisa_tunggakan_jumlah += (r.sisa_tunggakan_jumlah as number) || 0;
    sum.sisa_total_lbr += (r.sisa_total_lbr as number) || 0;
    sum.sisa_total_jumlah += (r.sisa_total_jumlah as number) || 0;
  });

  const pct = (num: number, den: number) =>
    den > 0 ? Math.round((num / den) * 1000) / 10 : 0;

  return {
    sum,
    ef: {
      ef_lancar: pct(sum.lunas_lancar_jumlah, sum.tdrd_lancar_jumlah),
      ef_tunggakan: pct(sum.lunas_tunggakan_jumlah, sum.tdrd_tunggakan_jumlah),
      ef_total: pct(sum.lunas_total_jumlah, sum.tdrd_total_jumlah),
    },
  };
}

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
  rows: propRows,
  fetchParams,
  source = 'kasir',
}: {
  rows?: Row[];
  fetchParams?: RekapParams;
  source?: 'kasir' | 'loket';
}) {
  const gridColumns = React.useMemo<GridColDef<Row>[]>(
    () =>
      columns.map((c) =>
        c.field === 'kasir'
          ? {
              ...c,
              headerName: source === 'loket' ? 'Loket' : 'Kasir',
            }
          : c,
      ),
    [source],
  );

  const gridColumnGroupingModel = React.useMemo<GridColumnGroupingModel>(() => {
    const parentLabel = source === 'loket' ? 'Loket' : 'Kasir';
    return [
      { groupId: parentLabel, children: [{ field: 'kasir' }] },
      ...baseColumnGroupingModel,
    ];
  }, [source]);

  const toNum = React.useCallback((s?: string) => {
    const n = Number(s);
    return Number.isNaN(n) ? 0 : n;
  }, []);

  const pct = React.useCallback(
    (num: number, den: number) =>
      den > 0 ? Math.round((num / den) * 1000) / 10 : 0,
    [],
  );

  const mapDetailToRow = React.useCallback(
    (detail: RekapDetailItem[]) =>
      detail.map((r, idx) => {
        // const tdrdLancarLbr = toNum(r.jmlrek_lancar);
        const tdrdLancarJumlah = toNum(r.ttltagihan_lancar);
        // const tdrdTunggakanLbr = toNum(r.jmlrek_tunggakan);
        const tdrdTunggakanJumlah = toNum(r.ttltagihan_tunggakan);
        // const tdrdTotalLbr = toNum(r.jmlrek);
        const tdrdTotalJumlah = toNum(r.ttltagihan);

        // const lunasLancarLbr = toNum(r.lbrlunas_lancar);
        const lunasLancarJumlah = toNum(r.ttltagihanlunas_lancar);
        // const lunasTunggakanLbr = toNum(r.lbrlunas_tunggakan);
        const lunasTunggakanJumlah = toNum(r.ttltagihanlunas_tunggakan);
        // const lunasTotalLbr = toNum(r.lbrlunas);
        const lunasTotalJumlah = toNum(r.ttltagihanlunas);

        // const sisaLancarLbr = toNum(r.jmlrek_sisa_lancar);
        const sisaLancarJumlah = toNum(r.sisatagihan_lancar);
        // const sisaTunggakanLbr = toNum(r.jmlrek_sisa_tunggakan);
        const sisaTunggakanJumlah = toNum(r.sisatagihan_tunggakan);
        // const sisaTotalLbr = toNum(r.jmlrek_sisa);
        const sisaTotalJumlah = toNum(r.sisatagihan);

        return {
          id: idx + 1,
          kasir: r.nama,
          // Total DRD Penagihan
          // tdrd_lancar_lbr: tdrdLancarLbr,
          tdrd_lancar_jumlah: tdrdLancarJumlah,
          // tdrd_tunggakan_lbr: tdrdTunggakanLbr,
          tdrd_tunggakan_jumlah: tdrdTunggakanJumlah,
          // tdrd_total_lbr: tdrdTotalLbr,
          tdrd_total_jumlah: tdrdTotalJumlah,
          // Total Lunas DRD Penagihan
          // lunas_lancar_lbr: lunasLancarLbr,
          lunas_lancar_jumlah: lunasLancarJumlah,
          // lunas_tunggakan_lbr: lunasTunggakanLbr,
          lunas_tunggakan_jumlah: lunasTunggakanJumlah,
          // lunas_total_lbr: lunasTotalLbr,
          lunas_total_jumlah: lunasTotalJumlah,
          // Sisa DRD Penagihan
          // sisa_lancar_lbr: sisaLancarLbr,
          sisa_lancar_jumlah: sisaLancarJumlah,
          // sisa_tunggakan_lbr: sisaTunggakanLbr,
          sisa_tunggakan_jumlah: sisaTunggakanJumlah,
          // sisa_total_lbr: sisaTotalLbr,
          sisa_total_jumlah: sisaTotalJumlah,
          // Efisiensi
          ef_lancar: pct(lunasLancarJumlah, tdrdLancarJumlah),
          ef_tunggakan: pct(lunasTunggakanJumlah, tdrdTunggakanJumlah),
          ef_total: pct(lunasTotalJumlah, tdrdTotalJumlah),
        } as Row;
      }),
    [pct, toNum],
  );

  const swrKey = fetchParams
    ? [
        'rekap',
        fetchParams.periode,
        fetchParams.wil_id ?? '',
        fetchParams.rayon_id ?? '',
        fetchParams.kec_id ?? '',
        fetchParams.kel_id ?? '',
        fetchParams.rekfrom ?? '',
        fetchParams.rekto ?? '',
        fetchParams.timtagih ?? '',
      ].join('|')
    : null;
  const {
    data: rekapData,
    isLoading: swrLoading,
    isValidating,
  } = useSWR<RekapResponse>(
    swrKey,
    () => getRekap(fetchParams as RekapParams),
    { revalidateOnFocus: false },
  );

  const fetchedRows = React.useMemo(() => {
    if (!rekapData) return undefined;
    const block =
      source === 'loket' ? rekapData.data?.loket : rekapData.data?.kasir;
    const detail = (block?.detail ?? []) as RekapDetailItem[];
    return mapDetailToRow(detail);
  }, [rekapData, mapDetailToRow, source]);

  const [rows, setRows] = React.useState<Row[]>(propRows ?? sampleRows);
  React.useEffect(() => {
    if (Array.isArray(propRows)) setRows(propRows);
  }, [propRows]);
  React.useEffect(() => {
    if (Array.isArray(fetchedRows)) setRows(fetchedRows);
  }, [fetchedRows]);

  const showLoading = swrLoading || isValidating;

  const pinnedBottom = React.useMemo(() => {
    const data = rows ?? [];
    if (!data.length) return [] as Row[];
    const { sum, ef } = computeTotals(data);
    return [
      {
        id: -1,
        kasir: 'Total',
        // tdrd_lancar_lbr: sum.tdrd_lancar_lbr,
        tdrd_lancar_jumlah: sum.tdrd_lancar_jumlah,
        // tdrd_tunggakan_lbr: sum.tdrd_tunggakan_lbr,
        tdrd_tunggakan_jumlah: sum.tdrd_tunggakan_jumlah,
        // tdrd_total_lbr: sum.tdrd_total_lbr,
        tdrd_total_jumlah: sum.tdrd_total_jumlah,
        // lunas_lancar_lbr: sum.lunas_lancar_lbr,
        lunas_lancar_jumlah: sum.lunas_lancar_jumlah,
        // lunas_tunggakan_lbr: sum.lunas_tunggakan_lbr,
        lunas_tunggakan_jumlah: sum.lunas_tunggakan_jumlah,
        // lunas_total_lbr: sum.lunas_total_lbr,
        lunas_total_jumlah: sum.lunas_total_jumlah,
        // sisa_lancar_lbr: sum.sisa_lancar_lbr,
        sisa_lancar_jumlah: sum.sisa_lancar_jumlah,
        // sisa_tunggakan_lbr: sum.sisa_tunggakan_lbr,
        sisa_tunggakan_jumlah: sum.sisa_tunggakan_jumlah,
        // sisa_total_lbr: sum.sisa_total_lbr,
        sisa_total_jumlah: sum.sisa_total_jumlah,
        ef_lancar: ef.ef_lancar,
        ef_tunggakan: ef.ef_tunggakan,
        ef_total: ef.ef_total,
      } as Row,
    ];
  }, [rows]);

  return (
    <DataGridPro
      density='compact'
      disableRowSelectionOnClick
      rows={rows}
      columns={gridColumns}
      columnGroupingModel={gridColumnGroupingModel}
      columnGroupHeaderHeight={36}
      pinnedRows={{ bottom: pinnedBottom }}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
      }
      loading={showLoading}
      slotProps={{
        loadingOverlay: {
          variant: 'skeleton',
          noRowsVariant: 'skeleton',
        },
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
      initialState={{
        pagination: { paginationModel: { pageSize: 20 } },
      }}
      pageSizeOptions={[10, 20, 50]}
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
