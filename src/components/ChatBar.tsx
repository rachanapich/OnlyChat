import { AppBar, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from './../assets/images/logo.png';

const ChatBar = () => {
  return (
    <div>
      <AppBar
        style={{
          height: 100,
          backgroundColor: '#ffffff',
          fontSize: '0.875rem',
          fontWeight: '700',
          borderBottom: '1px solid #ccc',
          boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            p: 1,
            m: 1,
            alignItems: 'center',
          }}
          height={80}
        >
          <Box component={Link} to='/'>
            <img src={logo} alt='Logo' height={100} />
          </Box>
        </Box>
      </AppBar>
    </div>
  );
};

export default ChatBar;
