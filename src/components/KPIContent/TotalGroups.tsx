import { Avatar, Card, CardContent, SvgIcon, Typography } from '@material-ui/core';
import GroupsIcon from '@mui/icons-material/Groups';
import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import axiosInstance from 'src/axios/axiosConfig';

function TotalGroups() {
  const [totalGroups, setTotalGroups] = useState(0);
  const fetchData = async () => {
    const data = await axiosInstance.get('/dashboard/totalGroups');
    if (data == null || data == undefined) {
      console.log('Empty Data');
    } else {
      console.log('total groups');
      setTotalGroups(data.data);
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
              Total Groups
            </Typography>
            <Typography variant='h4'>{totalGroups}</Typography>
          </Stack>
          <Avatar>
            <SvgIcon>
              <GroupsIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default TotalGroups;
