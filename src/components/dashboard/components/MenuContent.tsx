'use client';
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const mainListItems = [
  { text: 'Penerimaan Air', icon: <HomeRoundedIcon />, href: '/penerimaan' },
  {
    text: 'Penerimaan Petugas Tagih',
    icon: <ReceiptLongRoundedIcon />,
    href: '/penerimaan-tagih',
  },
  { text: 'DRD', icon: <AnalyticsRoundedIcon />, href: '/drd' },
  { text: 'Penerimaan Non Air', icon: <ReceiptLongRoundedIcon />, href: '/non-air' },
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
