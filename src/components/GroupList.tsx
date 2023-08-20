import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import { format } from 'date-fns';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#5BA5DB',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

// dummy data
function createData(create_date: Date, group_name: string, host_name: string, end_time: number) {
  const formattedCreateDate = format(create_date, 'yyyy-MM-dd');
  const hours = Math.floor(end_time / 60);
  const minutes = end_time % 60;
  const formattedEndTime = `${hours}h ${minutes}m`;

  return { create_date: formattedCreateDate, group_name, host_name, end_time: formattedEndTime };
}

const rows = [
  createData(new Date('2023-01-01'), 'Group 1', 'Host A', 456),
  createData(new Date('2023-02-15'), 'Group 2', 'Host B', 101),
  createData(new Date('2023-03-27'), 'Group 3', 'Host C', 131),
];

const GroupList = () => {
  return (
    <div>
      {/* <Grid container justifyContent='center'>
        <Grid item xs={12} sm={10} md={8} lg={6}> */}
      <TableContainer
        component={Paper}
        sx={{
          //   width: '100vh',
          //   display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Table sx={{ minWidth: 700 }} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>Create Date</StyledTableCell>
              <StyledTableCell align='right'>Group Name</StyledTableCell>
              <StyledTableCell align='right'>Host Name</StyledTableCell>
              <StyledTableCell align='right'>End Time</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component='th' scope='row'>
                  {row.create_date.toString()}
                </StyledTableCell>
                <StyledTableCell align='right'>{row.group_name}</StyledTableCell>
                <StyledTableCell align='right'>{row.host_name}</StyledTableCell>
                <StyledTableCell align='right'>{row.end_time}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* </Grid>
      </Grid> */}
    </div>
  );
};

export default GroupList;
