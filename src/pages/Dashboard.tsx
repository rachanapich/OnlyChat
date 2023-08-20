import { Button } from '@material-ui/core';
import { useState } from 'react';
import KPI from 'src/components/DataSummary';
import GroupListManager from 'src/components/GroupListManager';

function Dashboard() {
  const [display, setDisplay] = useState(true);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '3rem',
        height: '100vh',
      }}
    >
      <div>
        {/* <ChatBar /> */}
      </div>
      <div style={{ paddingTop: '4rem', display: 'flex' }}>
        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Button onClick={() => setDisplay(true)} variant='contained' fullWidth color='primary'>
            Group List
          </Button>
          <Button onClick={() => setDisplay(false)} variant='contained' fullWidth color='primary'>
            KPI
          </Button>
        </div>
        {display ? <GroupListManager /> : <KPI />}
      </div>
    </div>
  );
}

export default Dashboard;
