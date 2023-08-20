import { MenuItem, Select } from '@material-ui/core';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Box, Button, Checkbox, TextField } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import MediaQuery from 'react-responsive';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import { createGroupChatAPI } from '../axios/createGroupChat';

type Group = {
  id: string;
  name: string;
  hostId: string;
  // Add other properties if necessary
};

function HomePage() {
  const [isGenerate, setIsGenerate] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [group, setGroup] = useState<Group | null>(null);
  const [givenTime, setGivenTime] = useState(0);
  const [customizeTime, setCustomizeTime] = useState(false);

  const handleGenerateLink = async () => {
    const groupName = inputRef.current?.value ?? '';
    if (groupName === '') {
      setErrorMessage('Please enter a group name');
      return false;
    }
    try {
      console.log(givenTime);
      const createGroupChatAPIresponse = await createGroupChatAPI(groupName, givenTime);

      if (createGroupChatAPIresponse) {
        setIsGenerate(true);
        setGroup(createGroupChatAPIresponse.data as Group);
        const last_index = createGroupChatAPIresponse.data.groupChats.length - 1;
        document.cookie = `UserId=${createGroupChatAPIresponse.data.groupChats[last_index].id}; path=/; SameSite=None; Secure;`;
      } else {
        console.log('Error fetching data');
      }
    } catch (error) {
      console.log('Error fetching data', error);
    }
  };

  const [errorMessage, setErrorMessage] = useState('');

  const handleCopy = () => {
    const textToCopy = document.getElementById('text-copy');
    const text = textToCopy?.textContent;
    if (text) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          setErrorMessage('Text copied to clipboard');
        })
        .catch(error => {
          setErrorMessage('Failed to copy text');
          console.log('Error fetching data', error);
        });
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden'; // Hide scroll bar on component mount
    return () => {
      document.body.style.overflow = 'auto'; // Restore scroll bar on component unmount
    };
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#F4F7FA',
        fontWeight: 500,
        overflow: 'hidden',
      }}
    >
      <MediaQuery minWidth={250}>
        <div
          style={{
            minWidth: '40vh',
            minHeight: 400,
            marginLeft: 15,
            marginRight: 15,
          }}
        >
          <MediaQuery minWidth={250}>
            <Box textAlign='center' bgcolor='white' p={'2vh'} borderRadius={10} minWidth={'auto'}>
              <img
                alt='logo'
                style={{
                  width: '90%',
                  maxWidth: '600px',
                  minWidth: '20px',
                }}
                src={String(logo)}
              ></img>
              <Box>
                {!isGenerate ? (
                  <Box display='flex' flexDirection='column' alignItems='center' gap={2}>
                    <TextField
                      inputRef={inputRef}
                      inputProps={{ maxLength: 50 }}
                      type='text'
                      variant='outlined'
                      placeholder='Group Name'
                    />
                    <Box display='flex' alignItems='center' style={{ fontFamily: 'Barlow' }}>
                      <Checkbox
                        checked={customizeTime}
                        onChange={event => setCustomizeTime(event.target.checked)}
                      />
                      <span style={{ paddingRight: '15px' }}> Set Timelimit </span>

                      {customizeTime && (
                        <Box display='flex' alignItems='center' mt={1}>
                          <Select
                            value={givenTime}
                            onChange={event => setGivenTime(event.target.value as number)}
                            variant='outlined'
                            style={{ minWidth: '120px', marginRight: '10px' }}
                          >
                            <MenuItem value={1 * 86400}>1 Day</MenuItem>
                            <MenuItem value={3 * 86400}>3 Days</MenuItem>
                            <MenuItem value={7 * 86400}>7 Days</MenuItem>
                            <MenuItem value={14 * 86400}>14 Days</MenuItem>
                            <MenuItem value={30 * 86400}>30 Days</MenuItem>
                          </Select>
                        </Box>
                      )}
                    </Box>
                    <Button
                      variant='contained'
                      style={{
                        height: '56px',
                        cursor: 'pointer',
                        borderRadius: '10px',
                        fontWeight: 'bold',
                        fontFamily: 'Barlow',
                        color: '#fff',
                        backgroundColor: '#5BA5DB',
                      }}
                      onClick={handleGenerateLink}
                    >
                      Generate the Link
                    </Button>
                  </Box>
                ) : (
                  <Box
                    display='flex'
                    alignItems='center'
                    bgcolor='#cbeaff'
                    p={2}
                    borderRadius={10}
                    mt={2}
                    width='90%'
                    maxWidth='400px'
                    justifyContent='center'
                    margin='auto'
                  >
                    <h4 style={{ marginRight: '10px', fontFamily: 'Barlow' }}>Link:</h4>
                    <Link
                      id='text-copy'
                      to={`/groups/${group?.id}`}
                      style={{
                        flex: 1,
                        fontSize: '2.3vh',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        fontFamily: 'Barlow',
                        // fontWeight: 500,
                      }}
                    >
                      {/* http://localhost:3000/groups/{group?.id.toString()} */}
                      https://onlychat.vercel.app/groups/{group?.id.toString()}
                    </Link>
                    <Button onClick={handleCopy} style={{ marginLeft: 'auto' }}>
                      <ContentCopyIcon style={{ fontSize: '2.5vh' }} />
                    </Button>
                  </Box>
                )}
              </Box>
              <Box display='flex' justifyContent='center' mt={2}>
                {errorMessage.length > 0 && <p style={{ color: 'green' }}>{errorMessage}</p>}
              </Box>
            </Box>
          </MediaQuery>
        </div>
      </MediaQuery>
    </div>
  );
}

export default HomePage;
