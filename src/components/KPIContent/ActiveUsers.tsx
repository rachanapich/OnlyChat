import { Avatar, Card, CardContent, SvgIcon, Typography } from '@material-ui/core';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import axiosInstance from 'src/axios/axiosConfig';

function ActiveUsers() {
  const [totalActiveUsers, setTotalActiveUsers] = useState(0);
  const fetchData = async () => {
    const data = await axiosInstance.get('/dashboard/activeUsers');
    if (data == null || data == undefined) {
      console.log('Empty Data');
    } else {
      setTotalActiveUsers(data.data);
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
              Active Users
            </Typography>
            <Typography variant='h4'>{totalActiveUsers}</Typography>
          </Stack>
          <Avatar>
            <SvgIcon>
              <SupervisedUserCircleIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default ActiveUsers;
