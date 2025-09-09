import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { PieChart } from '@mui/x-charts/PieChart';
import { useTheme } from '@mui/material/styles';

export default function TotalReceiptPieChart({
  totalLancar,
  totalTunggakan,
  loading = false,
}: {
  totalLancar: number;
  totalTunggakan: number;
  loading?: boolean;
}) {
  const theme = useTheme();
  const data = [
    { id: 0, value: totalLancar, label: 'Lancar' },
    { id: 1, value: totalTunggakan, label: 'Tunggakan' },
  ];

  const colors = [
    (theme.vars || theme).palette.success.main,
    (theme.vars || theme).palette.error.main,
  ];

  return (
    <Card variant='outlined' sx={{ width: '100%' }}>
      <CardContent>
        <Typography component='h2' variant='subtitle2' gutterBottom>
          Total Penerimaan
        </Typography>
        {loading ? (
          <Box sx={{ display: 'grid', placeItems: 'center', height: 290 }}>
            <CircularProgress size={28} />
          </Box>
        ) : (
          <PieChart
            height={290}
            series={[
              {
                arcLabel: (item) => `${item.label}`,
                data,
                innerRadius: 40,
                outerRadius: 100,
                paddingAngle: 2,
              },
            ]}
            colors={colors}
          />
        )}
      </CardContent>
    </Card>
  );
}
