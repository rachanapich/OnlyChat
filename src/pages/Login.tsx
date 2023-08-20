import { FormControl } from '@material-ui/core';
import { Alert, AlertTitle } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from 'src/axios/axiosConfig';
import Logo from '../assets/images/logo.png';

function Login() {
  const navigate = useNavigate();

  const [invalidUser, setInValidUser] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    const data = new FormData(event?.currentTarget);

    const login = await axiosInstance.post('/admins/login', {
      email: data.get('username'),
      password: data.get('password'),
    });
    if (login.data.loggedIn === 'true') {
      console.log(login.data);
      localStorage.setItem('token', JSON.stringify(login.data));
      navigate('/dashboard');
    } else {
      console.log('Login failed');
      setInValidUser(true);
    }
  };

  React.useEffect(() => {
    localStorage.removeItem('token');
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#F4F7FA',
        fontWeight: 500,
        border: '1px solid black',
        boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
      }}
    >
      <CssBaseline />
      <div style={{border: '1px solid white', borderRadius: '10px', padding: '3rem', boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)'}}>
        <Box>
          <img src={Logo} alt='Logo' height={200} />
        </Box>
        <Typography
          component='h1'
          variant='h5'
          style={{
            fontFamily: 'Barlow',
            fontWeight: 500,
            paddingLeft: '4rem',
            paddingBottom: '1rem',
          }}
        >
          Welcome to OnlyChat
        </Typography>
        {invalidUser && (
          <Alert
            severity='error'
            style={{ border: `none` }}
          >
            <AlertTitle style={{ marginBottom: 0 }}>
              Error <strong>Invalid Credentials!</strong>
            </AlertTitle>
          </Alert>
        )}
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <FormControl fullWidth error={invalidUser}>
            <TextField
              margin='normal'
              required
              fullWidth
              id='username'
              label='Username'
              name='username'
              autoFocus
              sx={{ borderRadius: '10px' }}
              variant='outlined'
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
            />
          </FormControl>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            style={{
              height: '56px',
              cursor: 'pointer',
              borderRadius: '10px',
              fontWeight: 'bold',
              fontFamily: 'Barlow',
              color: '#fff',
              backgroundColor: '#5BA5DB',
            }}
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
        </Box>
      </div>
    </div>
  );
}

export default Login;
