import { Typography } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/images/logo.png';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: theme.spacing(2),
    },
    logo: {
      width: 300,
      height: 'auto',
    },
    text: {
      marginTop: theme.spacing(2),
      textAlign: 'center',
    },
  }),
);

const Page404: React.FC = () => {
  const classes = useStyles();
  
  // hidden scroll bar
  useEffect(() => {
    document.body.style.overflow = 'hidden'; // Hide scroll bar on component mount
    return () => {
      document.body.style.overflow = 'auto'; // Restore scroll bar on component unmount
    };
  }, []);

  return (
    <div className={classes.root}>
      <Box component={Link} to='/'>
        <img src={Logo} alt='Logo' className={classes.logo} />
      </Box>
      <Typography variant='h4' className={classes.text}>
        404 Page Not Found!
      </Typography>
      <Typography variant='body1' className={classes.text}>
        This group chat might be deleted or even not existed.
      </Typography>
    </div>
  );
};

export default Page404;
