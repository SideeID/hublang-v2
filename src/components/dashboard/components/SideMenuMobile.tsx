import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer, { drawerClasses } from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import MenuContent from './MenuContent';
import { doLogout } from '@/lib/api/client';

interface SideMenuMobileProps {
  open: boolean | undefined;
  toggleDrawer: (newOpen: boolean) => () => void;
}

export default function SideMenuMobile({
  open,
  toggleDrawer,
}: SideMenuMobileProps) {
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
      anchor='right'
      open={open}
      onClose={toggleDrawer(false)}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        [`& .${drawerClasses.paper}`]: {
          backgroundImage: 'none',
          backgroundColor: 'background.paper',
        },
      }}
    >
      <Stack
        sx={{
          maxWidth: '70dvw',
          height: '100%',
        }}
      >
        <Stack direction='row' sx={{ p: 2, pb: 0, gap: 1 }}>
          <Stack
            direction='row'
            sx={{ gap: 1, alignItems: 'center', flexGrow: 1, p: 1 }}
          >
            <Avatar
              sizes='small'
              alt={userName}
              src='/static/images/avatar/7.jpg'
              sx={{ width: 24, height: 24 }}
            />
            <Stack>
              <Typography component='p' variant='h6'>
                {userName}
              </Typography>
              <Typography variant='caption' sx={{ color: 'text.secondary' }}>
                {userEmail}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <Divider />
        <Stack sx={{ flexGrow: 1 }}>
          <MenuContent />
          <Divider />
        </Stack>
        <Stack sx={{ p: 2 }}>
          <Button
            variant='outlined'
            fullWidth
            startIcon={<LogoutRoundedIcon />}
            onClick={() => doLogout()}
          >
            Logout
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  );
}
