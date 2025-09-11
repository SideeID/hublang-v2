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
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '400px',
  },
  borderRadius: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: 'none',
}));

const RootContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: '100vh',
  width: '100%',
  overflow: 'hidden',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
}));

const ImageSection = styled(Box)(({ theme }) => ({
  flex: 1,
  backgroundImage: 'url("https://picsum.photos/900/1200?random")',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  [theme.breakpoints.down('md')]: {
    height: '40vh',
  },
}));

const FormSection = styled(Stack)(({ theme }) => ({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.default,
}));

export default function SignIn() {
  const [usernameError, setUsernameError] = React.useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [formError, setFormError] = React.useState<string | null>(null);

  const router = useRouter();
  const { mutateAsync: doLogin, isPending } = useLogin();

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
        <ImageSection />
        <FormSection>
          <Card variant='outlined'>
            <Typography
              component='h1'
              variant='h4'
              sx={{ textAlign: 'center', fontWeight: 600 }}
            >
              Hublang
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
                gap: 2,
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
                sx={{ py: 1.5, fontWeight: 600, borderRadius: 2 }}
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
            <Divider sx={{ my: 2 }}>atau</Divider>
            <Typography
              variant='body2'
              textAlign='center'
              color='text.secondary'
            >
              Hubungi admin jika ada kendala
            </Typography>
          </Card>
        </FormSection>
      </RootContainer>
    </>
  );
}
