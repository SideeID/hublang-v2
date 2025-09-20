'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/navigation';
import { useLogin } from '@/hooks/useAuth';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: theme.spacing(5),
  gap: theme.spacing(3),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '400px',
  },
  borderRadius: theme.spacing(3),
  backgroundColor:
    theme.palette.mode === 'light'
      ? '#ffffff'
      : theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: theme.shadows[8],
  transition: 'box-shadow .2s ease',
  '&:hover': {
    boxShadow: theme.shadows[12],
  },
}));

const RootContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
  background:
    theme.palette.mode === 'light'
      ? 'linear-gradient(135deg, #f5f7fa 0%, #eef2f6 100%)'
      : 'linear-gradient(135deg, #0b0f19 0%, #0f172a 100%)',
}));

const FormSection = styled(Stack)(({ theme }) => ({
  width: '100%',
  maxWidth: 440,
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(2),
}));

export default function SignIn() {
  const [usernameError, setUsernameError] = React.useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [formError, setFormError] = React.useState<string | null>(null);

  const router = useRouter();
  const { mutateAsync: doLogin, isPending } = useLogin();

  React.useEffect(() => {
    if (typeof document === 'undefined') return;
    const hasToken = document.cookie
      .split('; ')
      .some((c) => c.startsWith('hublang_token=') && c.split('=')[1]);
    if (hasToken) router.replace('/dashboard');
  }, [router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);
    if (!validateInputs()) return;

    const data = new FormData(event.currentTarget);
    const username = String(data.get('username') || '');
    const password = String(data.get('password') || '');

    const sanitize = (raw: string): string => {
      const lower = raw.toLowerCase();
      if (
        /(unauthorized|invalid|password|username|credential|401)/.test(lower)
      ) {
        return 'Username atau password salah.';
      }
      if (/(forbidden|403)/.test(lower)) return 'Akses ditolak.';
      if (/(timeout|timed out)/.test(lower))
        return 'Permintaan timeout. Coba lagi.';
      if (/(network|failed to fetch|connection)/.test(lower)) {
        return 'Koneksi ke server gagal. Periksa jaringan Anda.';
      }
      if (/(token).*tidak/i.test(lower)) return 'Sesi tidak valid.';
      return 'Login gagal. Silakan coba lagi.';
    };

    try {
      const res = await doLogin({ username, password });
      const token = res?.data?.token;
      const user = res?.data?.user?.nama;
      const email = res?.data?.user?.email;
      if (!token || !user || !email) {
        throw new Error('invalid-structure');
      }
      const attrs = ['Path=/', 'Max-Age=604800', 'SameSite=Lax'];
      if (
        typeof window !== 'undefined' &&
        window.location.protocol === 'https:'
      ) {
        attrs.push('Secure');
      }
      const common = attrs.join('; ');
      document.cookie = `hublang_token=${token}; ${common}`;
      document.cookie = `hublang_user=${encodeURIComponent(user)}; ${common}`;
      document.cookie = `hublang_email=${encodeURIComponent(email)}; ${common}`;
      router.replace('/dashboard');
    } catch (err) {
      const raw = err instanceof Error ? err.message : '';
      setFormError(sanitize(raw));
      setUsernameError(true);
      setPasswordError(true);
    }
  };

  const validateInputs = () => {
    const username = document.getElementById('username') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;
    let isValid = true;

    if (!username.value || username.value.length < 3) {
      setUsernameError(true);
      setUsernameErrorMessage('Username must be at least 3 characters long.');
      isValid = false;
    } else {
      setUsernameError(false);
      setUsernameErrorMessage('');
    }

    if (!password.value || password.value.length < 4) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 4 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  return (
    <>
      <CssBaseline enableColorScheme />
      <RootContainer>
        <FormSection>
          <Card variant='outlined'>
            <Typography
              component='h1'
              variant='h4'
              sx={{ textAlign: 'center', fontWeight: 600 }}
            >
              Hublang
            </Typography>
            <Typography
              variant='body2'
              color='text.secondary'
              sx={{ textAlign: 'center', mt: -1 }}
            >
              Masuk untuk melanjutkan ke dashboard
            </Typography>
            {formError && (
              <Alert severity='error' variant='outlined'>
                {formError}
              </Alert>
            )}
            <Box
              component='form'
              onSubmit={handleSubmit}
              noValidate
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                gap: 3,
              }}
            >
              <FormControl>
                <FormLabel htmlFor='username'>Username</FormLabel>
                <TextField
                  error={usernameError}
                  helperText={usernameErrorMessage}
                  id='username'
                  name='username'
                  placeholder='yourusername'
                  autoComplete='username'
                  autoFocus
                  required
                  fullWidth
                  variant='outlined'
                  color={usernameError ? 'error' : 'primary'}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                  onChange={(e) => {
                    if (e.currentTarget.value.length >= 3) {
                      setUsernameError(false);
                      setUsernameErrorMessage('');
                    }
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor='password'>Password</FormLabel>
                <TextField
                  error={passwordError}
                  helperText={passwordErrorMessage}
                  name='password'
                  placeholder='••••••'
                  type='password'
                  id='password'
                  autoComplete='current-password'
                  required
                  fullWidth
                  variant='outlined'
                  color={passwordError ? 'error' : 'primary'}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                  onChange={(e) => {
                    if (e.currentTarget.value.length >= 6) {
                      setPasswordError(false);
                      setPasswordErrorMessage('');
                    }
                  }}
                />
              </FormControl>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                disabled={isPending}
                sx={{
                  py: 1.4,
                  fontWeight: 700,
                  letterSpacing: 0.2,
                  borderRadius: 2,
                  boxShadow: (theme) => theme.shadows[2],
                }}
              >
                {isPending ? (
                  <>
                    <CircularProgress size={20} sx={{ mr: 1 }} /> Memproses...
                  </>
                ) : (
                  'Masuk'
                )}
              </Button>
            </Box>
            <Divider sx={{ my: 1.5, color: 'text.secondary' }}>atau</Divider>
            <Typography
              variant='body2'
              textAlign='center'
              color='text.secondary'
              sx={{ mt: 0.5 }}
            >
              Hubungi admin jika ada kendala
            </Typography>
          </Card>
        </FormSection>
      </RootContainer>
    </>
  );
}
