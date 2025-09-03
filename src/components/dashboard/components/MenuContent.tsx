'use client';
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const mainListItems = [
  { text: 'Penerimaan', icon: <HomeRoundedIcon />, href: '/penerimaan' },
  { text: 'DRD', icon: <AnalyticsRoundedIcon />, href: '/drd' },
  {
    text: 'Ikhtisar Rekening By IKK (Golongan)',
    icon: <AnalyticsRoundedIcon />,
    href: '/drd-golongan',
  },
  {
    text: 'Ikhtisar Rekening By IKK (Kecamatan)',
    icon: <AnalyticsRoundedIcon />,
    href: '/drd-kecamatan',
  },
  {
    text: 'Ikhtisar Rekening By IKK (Kelurahan)',
    icon: <AnalyticsRoundedIcon />,
    href: '/drd-kelurahan',
  },
];

export default function MenuContent() {
  const pathname = usePathname();
  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'flex-start' }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              component={Link}
              href={item.href}
              selected={pathname === item.href}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
