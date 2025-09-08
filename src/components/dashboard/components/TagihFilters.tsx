'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import type { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';

export interface TagihFiltersProps {
  minJmlrek?: number;
  maxJmlrek?: number;
  onMinJmlrekChange?: (n?: number) => void;
  onMaxJmlrekChange?: (n?: number) => void;
  timTagih?: string;
  onTimTagihChange?: (value: string) => void;
  teamOptions?: Array<string | { id: string; label: string }>;
}

export default function TagihFilters({
  minJmlrek,
  maxJmlrek,
  onMinJmlrekChange,
  onMaxJmlrekChange,
  timTagih = '',
  onTimTagihChange,
  teamOptions,
}: TagihFiltersProps) {
  const options = React.useMemo(() => {
    if (teamOptions && teamOptions.length > 0) return teamOptions;
    // Dummy options until backend endpoint is available
    return ['Tim A', 'Tim B', 'Tim C'];
  }, [teamOptions]);

  const handleTeamChange = (e: SelectChangeEvent<string>) => {
    onTimTagihChange?.(e.target.value as string);
  };

  const parseNumber = (v: string) => {
    if (v === '') return undefined;
    const n = Number(v);
    return Number.isNaN(n) ? undefined : n;
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container spacing={1.5} alignItems='center' wrap='wrap'>
        <Grid size={{ xs: 6, sm: 'auto' }}>
          <TextField
            type='number'
            label='Jml Rek'
            size='small'
            value={minJmlrek ?? ''}
            onChange={(e) => onMinJmlrekChange?.(parseNumber(e.target.value))}
            sx={{ width: { xs: '100%', sm: 150 } }}
            inputProps={{ min: 0 }}
          />
        </Grid>
        <Typography variant='body1'>s/d</Typography>
        <Grid size={{ xs: 6, sm: 'auto' }}>
          <TextField
            type='number'
            label='Jml Rek'
            size='small'
            value={maxJmlrek ?? ''}
            onChange={(e) => onMaxJmlrekChange?.(parseNumber(e.target.value))}
            sx={{ width: { xs: '100%', sm: 150 } }}
            inputProps={{ min: 0 }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 'auto' }}>
          <FormControl size='small' fullWidth sx={{ minWidth: { sm: 160 } }}>
            <InputLabel id='tim-tagih-label'>Tim Tagih</InputLabel>
            <Select
              labelId='tim-tagih-label'
              id='tim-tagih'
              value={timTagih}
              label='Tim Tagih'
              onChange={handleTeamChange}
            >
              <MenuItem value=''>Semua Tim</MenuItem>
              {options.map((opt) => {
                if (typeof opt === 'string') {
                  return (
                    <MenuItem key={opt} value={opt}>
                      {opt}
                    </MenuItem>
                  );
                }
                return (
                  <MenuItem key={opt.id} value={opt.id}>
                    {opt.label}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}
