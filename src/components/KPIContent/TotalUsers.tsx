import { Avatar, Card, CardContent, SvgIcon, Typography } from '@material-ui/core';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import axiosInstance from 'src/axios/axiosConfig';

function TotalUsers() {
  const [totalUsers, setTotalUsers] = useState(0);
  const fetchData = async () => {
    const data = await axiosInstance.get('/dashboard/totalUsers/1');
    if (data == null || data == undefined) {
      console.log('Empty Data');
    } else {
      console.log('date', data);
      setTotalUsers(data.data);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Card>
      <CardContent>
        <Stack
          alignItems={'flex-start'}
          direction={'row'}
          justifyContent={'space-between'}
          spacing={'3'}
        >
          <Stack spacing={1}>
            <Typography color='secondary' variant='overline' style={{fontFamily: 'Barlow'}}>
              Total Users
            </Typography>
            <Typography variant='h4'>{totalUsers}</Typography>
          </Stack>
          <Avatar>
            <SvgIcon>
              <PersonPinCircleIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default TotalUsers;
