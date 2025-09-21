'use client';

import * as React from 'react';
import Image from 'next/image';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MenuContent from './MenuContent';
import OptionsMenu from './OptionsMenu';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
});

export default function SideMenu() {
  const [userName, setUserName] = React.useState('Riley Carter');
  const [userEmail, setUserEmail] = React.useState('riley@email.com');

  React.useEffect(() => {
    const getCookie = (name: string) =>
      typeof document === 'undefined'
        ? null
        : document.cookie
            .split('; ')
            .find((row) => row.startsWith(name + '='))
            ?.split('=')[1] ?? null;
    const name = getCookie('hublang_user');
    const email = getCookie('hublang_email');
    if (name) setUserName(decodeURIComponent(name));
    if (email) setUserEmail(decodeURIComponent(email));
  }, []);

  return (
    <Drawer
      variant='permanent'
      sx={{
        display: { xs: 'none', md: 'block' },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: 'background.paper',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          mt: 'calc(var(--template-frame-height, 0px) + 4px)',
          p: 1.5,
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Image
          src='/icon-hublang.png'
          alt='Logo Hublang'
          width={50}
          height={50}
          priority
        />
        <Typography
          variant='h6'
          sx={{
            fontWeight: 700,
            letterSpacing: 0.5,
            px: 1,
            userSelect: 'none',
          }}
        >
          Hublang
        </Typography>
      </Box>
      <Divider />
      <Box
        sx={{
          overflow: 'auto',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <MenuContent />
      </Box>
      <Stack
        direction='row'
        sx={{
          p: 2,
          gap: 1,
          alignItems: 'center',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Avatar
          sizes='small'
          alt={userName}
          src='/static/images/avatar/7.jpg'
          sx={{ width: 36, height: 36 }}
        />
        <Box sx={{ mr: 'auto' }}>
          <Typography
            variant='body2'
            sx={{ fontWeight: 500, lineHeight: '16px' }}
          >
            {userName}
          </Typography>
          <Typography variant='caption' sx={{ color: 'text.secondary' }}>
            {userEmail}
          </Typography>
        </Box>
        <OptionsMenu />
      </Stack>
    </Drawer>
  );
}
