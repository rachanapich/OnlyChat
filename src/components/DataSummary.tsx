import TotalUsers from './KPIContent/TotalUsers';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import ActiveUsers from './KPIContent/ActiveUsers';
import TotalGroups from './KPIContent/TotalGroups';
import ActiveGroups from './KPIContent/ActiveGroups';
import PersistentDrawerLeft from './KPIContent/PersistentDrawerLeft';

function KPI() {
  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={6}>
        <TotalUsers />
      </Grid>
      <Grid item xs={6}>
        <ActiveUsers />
      </Grid>
      <Grid item xs={6}>
        <TotalGroups />
      </Grid>
      <Grid item xs={6}>
        <ActiveGroups />
      </Grid>
    </Grid>
  );
}

export default KPI;
