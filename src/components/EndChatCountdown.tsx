import { Box, CircularProgress, useTheme } from '@material-ui/core';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useEffect, useState } from 'react';

const EndChatCountdown = ({ remainingTime }: { remainingTime: number }) => {
  // small screen
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [countdown, setCountdown] = useState(remainingTime);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => setCountdown(countdown - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress variant='determinate' value={(countdown / remainingTime) * 100}
      style={{
       color: '#00b0ff'
      }} />
      <Box style={{ marginLeft: 10 }}>
        <div style={{ 
          position: 'absolute', 
          fontWeight: 'bold', 
          color: '#ff1744', 
          fontFamily: 'Barlow' }}>
            {countdown}s
        </div>
      </Box>
    </Box>
  );
};

export default EndChatCountdown;
