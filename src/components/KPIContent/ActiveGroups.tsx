import { Avatar, Card, CardContent, SvgIcon, Typography } from '@material-ui/core';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import axiosInstance from 'src/axios/axiosConfig';

function ActiveGroups() {
  const [activeGroups, setActiveGroups] = useState(0);
  const fetchData = async () => {
    const data = await axiosInstance.get('/dashboard/activeGroups');
    if (data == null || data == undefined) {
      console.log('Empty Data');
    } else {
      console.log('date', data);
      setActiveGroups(data.data);
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
              Active Groups
            </Typography>
            <Typography variant='h4'>{activeGroups}</Typography>
          </Stack>
          <Avatar>
            <SvgIcon>
              <Diversity3Icon />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default ActiveGroups;
