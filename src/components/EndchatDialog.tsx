import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useEffect, useState } from 'react';
import noChat from './../assets/images/robot.gif';
const EndchatDialog = () => {
  // small screen
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [remainingSeconds, setRemainingSeconds] = useState(58);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setRemainingSeconds(prevSeconds => {
        if (prevSeconds === 0) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => {
      clearInterval(countdownInterval);
    };
  }, []);

  useEffect(() => {
    if (remainingSeconds <= 0) {
      // You can add your logic here
    }
  }, [remainingSeconds]);

  return (
    <div>
      <DialogTitle
        style={{
          fontFamily: 'Barlow',
          display: 'block',
          margin: '0 auto',
          textAlign: 'center',
          fontSize: isMobile ? 16 : 20,
          // whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {'The host has ended the group chat'}
      </DialogTitle>
      <img
        src={noChat}
        style={{
          width: isMobile ? '10vh' : '14vh',
          height: 'auto',
          display: 'block',
          margin: '0 auto',
        }}
      />
      <DialogContent>
        <DialogContentText
          style={{
            fontFamily: 'Barlow',
            fontWeight: 500,
            display: 'block',
            textAlign: 'center',
            fontSize: isMobile ? 10 : 16,
          }}
        >
          The chat will be end in
          <span style={{ color: '#5BA5DB' }}> {remainingSeconds}s. </span>
          <br />
          Discard to chat or go to homepage to generate new link.
        </DialogContentText>
      </DialogContent>
    </div>
  );
};

export default EndchatDialog;
