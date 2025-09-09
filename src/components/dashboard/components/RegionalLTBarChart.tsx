import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { BarChart } from '@mui/x-charts/BarChart';
import { useTheme } from '@mui/material/styles';

export default function RegionalLTBarChart({
  labels,
  lancar,
  tunggakan,
  loading = false,
}: {
  labels: string[];
  lancar: number[];
  tunggakan: number[];
  loading?: boolean;
}) {
  const theme = useTheme();

  const colors = [
    (theme.vars || theme).palette.success.main,
    (theme.vars || theme).palette.error.main,
  ];

  return (
    <Card variant='outlined' sx={{ width: '100%' }}>
      <CardContent>
        <Typography component='h2' variant='subtitle2' sx={{ mb: 2 }}>
          Penerimaan per Wilayah
        </Typography>

        {loading ? (
          <Box sx={{ display: 'grid', placeItems: 'center', height: 250 }}>
            <CircularProgress size={28} />
          </Box>
        ) : (
          <BarChart
            colors={colors}
            xAxis={[
              {
                scaleType: 'band',
                categoryGapRatio: 0.5,
                data: labels,
                height: 24,
              },
            ]}
            yAxis={[{ width: 50 }]}
            series={[
              { label: 'Lancar', data: lancar },
              { label: 'Tunggakan', data: tunggakan },
            ]}
            height={250}
            margin={{ left: 0, right: 0, top: 20, bottom: 0 }}
            grid={{ horizontal: true }}
          />
        )}
      </CardContent>
    </Card>
  );
}
