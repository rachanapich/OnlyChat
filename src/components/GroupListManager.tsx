import { IconButton } from '@material-ui/core';
import DeleteIcon from '@mui/icons-material/Delete';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import axiosInstance from 'src/axios/axiosConfig';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#5BA5DB',
    color: theme.palette.common.white,
    fontFamily: 'Barlow',
    fontWeight: 500,
    textAlign: 'center',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontFamily: 'Barlow',
    fontWeight: 500,
    textAlign: 'center',
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

interface Sender {
  username: string;
  anonymous: boolean;
  is_update: boolean;
  timestamp: number[];
  profileImage: string;
  id: string;
}

interface Message {
  id: string;
  message: string;
  timestamp: number[];
  sender: Sender;
}
interface GroupListManagerProps {
  id: string;
  name: string;
  hostId: string;
  created_at: number[] | null;
  lastActivityTime: Date;
  allowedOrigin: string;
  setTimeOut: Date;
  chats: Message[];
  userCount: number;
  groupChats: Sender[];
}

function GroupListManager() {
  const [notEmpty, setNotEmpty] = useState(true);
  const [rows, setRows] = useState<GroupListManagerProps[]>();
  const fetchData = async () => {
    const rows = await axiosInstance.get('/groups');
    const data = rows.data;
    if (data.length == 0 || data == undefined) {
      setNotEmpty(false);
    } else {
      console.log(data);
      setRows(data);
    }
  };

  const handleDeleteGroup = async (id: string) => {
    await axiosInstance.delete('/groups/' + id);
    await fetchData();
  };

  const getDate = (date: number[] | null) => {
    if (date == null) {
      return '';
    } else {
      const day = date[2];
      const month = date[1];
      const year = date[0];
      return day + '/' + month + '/' + year;
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 10 * 60 * 1000);

    console.log(rows);

    return () => clearInterval(interval);
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label='customized table'>
        <TableHead>
          <TableRow style={{ display: 'center' }}>
            <StyledTableCell align='right'>Created At</StyledTableCell>
            <StyledTableCell>Id</StyledTableCell>
            <StyledTableCell align='right'>Group Name</StyledTableCell>
            <StyledTableCell align='right'>Host Name</StyledTableCell>
            <StyledTableCell align='right'>User Count</StyledTableCell>
            <StyledTableCell align='right'>Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows != null &&
            rows.map(row => (
              <StyledTableRow key={row.id}>
                <StyledTableCell align='right'>{getDate(row.created_at)}</StyledTableCell>
                <StyledTableCell component='th' scope='row'>
                  {row.id}
                </StyledTableCell>
                <StyledTableCell align='right'>{row.name}</StyledTableCell>
                <StyledTableCell align='right'>{row.hostId}</StyledTableCell>
                <StyledTableCell align='right'>{row.userCount}</StyledTableCell>
                <StyledTableCell align='right'>
                  <IconButton aria-label='delete'>
                    <DeleteIcon
                      onClick={() => handleDeleteGroup(row.id)}
                      sx={{ ':hover': { color: 'red' } }}
                    />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default GroupListManager;
