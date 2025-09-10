'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';

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
    return ['Tim A', 'Tim B', 'Tim C'];
  }, [teamOptions]);

  const normalizedOptions = React.useMemo(
    () =>
      options.map((opt) =>
        typeof opt === 'string' ? { id: opt, label: opt } : opt,
      ),
    [options],
  );

  const selectedTeam = React.useMemo(
    () => normalizedOptions.find((o) => o.id === timTagih) ?? null,
    [normalizedOptions, timTagih],
  );

  const handleTeamChange = (
    _event: React.SyntheticEvent,
    newValue: { id: string; label: string } | null,
  ) => {
    onTimTagihChange?.(newValue?.id ?? '');
  };

  const parseNumber = (v: string) => {
    if (v === '') return undefined;
    const n = Number(v);
    return Number.isNaN(n) ? undefined : n;
  };

  return (
    <Box sx={{ width: '100%', maxWidth: { xs: 360, sm: 'none' } }}>
      <Grid container spacing={1.5} alignItems='center' wrap='wrap'>
        <Grid size={{ xs: 12, sm: 'auto' }}>
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
        <Grid
          size={{ xs: 12 }}
          sx={{ display: { xs: 'block', sm: 'none' }, pl: 0.5, mt: -0.5 }}
        >
          <Typography variant='caption' color='text.secondary'>
            Jml s/d brp
          </Typography>
        </Grid>
        <Grid
          size={{ xs: 'auto' }}
          sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}
        >
          <Typography variant='body1'>s/d</Typography>
        </Grid>
        <Grid size={{ xs: 12, sm: 'auto' }}>
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
          <Autocomplete<{ id: string; label: string }>
            size='small'
            fullWidth
            options={normalizedOptions}
            value={selectedTeam}
            onChange={handleTeamChange}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={(option) => option.label}
            forcePopupIcon={false}
            sx={{ minWidth: { sm: 160 } }}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Tim Tagih'
                placeholder='Cari tim…'
              />
            )}
            clearOnEscape
          />
        </Grid>
      </Grid>
    </Box>
  );
}
