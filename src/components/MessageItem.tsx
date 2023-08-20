import {
  AppBar,
  Box,
  Button,
  Grid,
  Modal,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Avatar from 'boring-avatars';
import { createBrowserHistory } from 'history';
import React, { useEffect, useRef, useState } from 'react';
import MediaQuery from 'react-responsive';
import { Link, useParams } from 'react-router-dom';
import SockJS from 'sockjs-client/dist/sockjs';
import { createChatAPI } from 'src/axios/createChat';
import { deleteGroupChatByIdAPI } from 'src/axios/deleteGroupChatById';
import { getAndUpdateGroupMemberAPI } from 'src/axios/getAndUpdateGroup';
import { getGroupChatByIdAPI } from 'src/axios/getGroupChatById';
import { getGroupStatusAPI } from 'src/axios/getGroupChatStatus';
import { getUserByIdAPI } from 'src/axios/getUserById';
import { updateUserByIdAPI } from 'src/axios/updateUserById';
import Stomp from 'stompjs';
import EndChat from '../assets/images/endgroup.png';
import littleIcon from '../assets/images/littleIcon.png';
import logo from '../assets/images/logo.png';
import SendIcon from '../assets/images/send.png';
import './../style/style.css';
import EndChatCountdown from './EndChatCountdown';
import EndchatDialog from './EndchatDialog';
const history = createBrowserHistory();
type Chat = {
  id: string;
  message: string;
  // event: string;
  sender: {
    id: string;
    username: string;
    profileImage: string;
  };
  timestamp: [number, number, number, number, number, number, number];
};

interface GroupChat {
  username: string;
  anonymous: boolean;
  timestamp: number[];
  profileImage: string;
  id: string;
}

interface GroupOf {
  groupof: number;
}

interface GroupStatus {
  status: string;
}

function MessageItem() {
  // Get UserId from Cookie
  function getCookieValue(cookieName: string) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(`${cookieName}=`)) {
        return cookie.substring(cookieName.length + 1);
      }
    }
    return null;
  }

  // Fetch GroupChat Data
  const [userId, setUserId] = useState(getCookieValue('UserId')); // user = groupchat.hostid
  const { groupId } = useParams();
  const [userCount, setUserCount] = useState(0);
  const [Group, setGroup] = useState<{
    name: string;
    hostId: string;
    chats: Chat[];
    groupChats: GroupChat[];
  } | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      if (userId === null) {
        setUserId('Not Found');
      }
      try {
        console.log('called1');
        if (groupId && userId) {
          const getGroupChatAPIResponse = await getGroupChatByIdAPI(groupId);
          if (getGroupChatAPIResponse) {
            console.log('called2');
            const isUserInGroup = getGroupChatAPIResponse.data.groupChats.some(
              (user: GroupChat) => user.id === userId,
            );
            console.log(userId);
            console.log('isUserInGroup', isUserInGroup);
            if (isUserInGroup) {
              console.log('called3');
              const sortedChats = getGroupChatAPIResponse.data.chats.sort((a: Chat, b: Chat) => {
                const [yearA, monthA, dayA, hourA, minuteA, secondA] = a.timestamp;
                const [yearB, monthB, dayB, hourB, minuteB, secondB] = b.timestamp;
                if (yearA !== yearB) {
                  return yearA - yearB;
                }
                if (monthA !== monthB) {
                  return monthA - monthB;
                }
                if (dayA !== dayB) {
                  return dayA - dayB;
                }
                if (hourA !== hourB) {
                  return hourA - hourB;
                }
                if (minuteA !== minuteB) {
                  return minuteA - minuteB;
                }
                return secondA - secondB;
              });
              const sortedGroupChats = getGroupChatAPIResponse.data.groupChats.sort(
                (a: GroupChat, b: GroupChat) => {
                  const [yearA, monthA, dayA, hourA, minuteA, secondA] = a.timestamp;
                  const [yearB, monthB, dayB, hourB, minuteB, secondB] = b.timestamp;
                  if (yearA !== yearB) {
                    return yearA - yearB;
                  }
                  if (monthA !== monthB) {
                    return monthA - monthB;
                  }
                  if (dayA !== dayB) {
                    return dayA - dayB;
                  }
                  if (hourA !== hourB) {
                    return hourA - hourB;
                  }
                  if (minuteA !== minuteB) {
                    return minuteA - minuteB;
                  }
                  return secondA - secondB;
                },
              );
              const updatedGroup = {
                ...getGroupChatAPIResponse.data,
                chats: sortedChats,
                groupChats: sortedGroupChats,
              };
              setGroup(updatedGroup);
              setUserCount(updatedGroup.userCount);
              console.log('updatedGroup', updatedGroup);
            } else {
              try {
                console.log('called4');
                const UpdateGroupMemberAPIResponse = await getAndUpdateGroupMemberAPI(
                  groupId,
                  userId,
                );
                if (UpdateGroupMemberAPIResponse && UpdateGroupMemberAPIResponse.data.user) {
                  console.log('UpdateGroupMemberAPIResponse', UpdateGroupMemberAPIResponse.data);
                  setUserId(UpdateGroupMemberAPIResponse.data.user.id);
                  document.cookie = `UserId=${UpdateGroupMemberAPIResponse.data.user.id}; path=/; SameSite=None; Secure;`;
                  console.log('success');
                }
              } catch (error) {
                console.error('Error fetching data:', error);
              }
            }
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [userId]);

  const showChatMessage = (id: string, message: string, username: string, profileImage: string) => {
    setMessages(prevMessages => {
      // Check if the message already exists in the array
      const messageExists = prevMessages.some(msg => msg.id === id && msg.message === message);
      if (messageExists) {
        return prevMessages; // Return the current array without adding the duplicate message
      }
      // Add the new message to the array
      return [
        ...prevMessages,
        {
          id,
          message,
          // event,
          sender: { id, username, profileImage },
          timestamp: [0, 0, 0, 0, 0, 0, 0],
        },
      ];
    });
  };

  // // broadcast
  // const broadcastChatEndEvent = () => {
  //   const chatEndedEvent = {
  //     event: 'chat ended',
  //   };

  //   if (stompClient !== null && stompClient.connected) {
  //     stompClient.send('/topic/group/' + groupId, {}, JSON.stringify(chatEndedEvent));
  //   }
  // };

  // Socket
  const [groupof, setGroupof] = useState(1);
  const [messages, setMessages] = useState<Chat[]>([]);
  const [groupStatusData, setGroupStatusData] = useState('active');
  let stompClient: Stomp.Client | null = null;
  const connect = () => {
    // const socket: any = new SockJS('http://localhost:8080/ws');
    const socket: any = new SockJS('https://chatapp-backend-production-e913.up.railway.app/ws');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, (frame: Stomp.Frame | undefined) => {
      console.log('Connected: ' + frame);
      stompClient?.subscribe('/topic/group/' + groupId, (message: Stomp.Message) => {
        console.log('Received data from SockJS:', message.body);
        const groupOf: GroupOf = JSON.parse(message.body || '');
        const chatMessage: Chat = JSON.parse(message.body || '');
        const groupStatus: GroupStatus = JSON.parse(message.body || '');
        if (groupStatus != null) {
          setGroupStatusData(groupStatus.status);
        }
        if (groupOf.groupof > 1) {
          setGroupof(groupOf.groupof);
        }
        showChatMessage(
          chatMessage.sender.id,
          chatMessage.message,
          chatMessage.sender.username,
          chatMessage.sender.profileImage,
        );
      });
    });
  };

  const disconnect = () => {
    if (stompClient !== null && stompClient.connected) {
      stompClient.disconnect(() => {
        console.log('Disconnected');
      });
    }
  };
  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, []);

  const messageInput = useRef<HTMLInputElement>(null);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const message_Input = messageInput.current?.value ?? '';
    if (message_Input.trim() !== '' && userId && groupId) {
      try {
        const createChatResponse = await createChatAPI(groupId, userId, message_Input);
        if (createChatResponse) {
          console.log('createChatResponse', createChatResponse.data);
          messageInput.current!.value = '';
        } else {
          console.log('Error fetching data');
        }
      } catch (error) {
        console.log('Error fetching data', error);
      }
    }
  };

  // Scroll to bottom
  const chatContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.lastElementChild?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
      console.log(messages, 'latest chat message');
    }
  }, [messages]);

  // Handle Enter key press submit
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit(event);
    }
  };
  // end chat countdown
  const countdownDuration = 58;
  const [showEndChatCountdown, setShowEndChatCountdown] = React.useState(false);
  const [remainingTime, setRemainingTime] = useState(countdownDuration);
  useEffect(() => {
    const storedStartTime = localStorage.getItem('countdownStartTime');
    if (storedStartTime) {
      const startTime = parseInt(storedStartTime);
      const currentTime = Math.floor(Date.now() / 1000);
      const elapsedTime = currentTime - startTime;

      if (elapsedTime >= countdownDuration) {
        // Countdown has ended, reset values
        setShowEndChatCountdown(false);
        setRemainingTime(countdownDuration);
        localStorage.removeItem('countdownStartTime');
      } else {
        // Continue the countdown
        setShowEndChatCountdown(true);
        setRemainingTime(countdownDuration - elapsedTime);
      }
    }
  }, []);

  // end chat dialog
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    console.log('called1 asd');
    if (groupStatusData == 'inactive') {
      console.log('called2 asd');
      setOpen(true);
      const startTime = Math.floor(Date.now() / 1000);
      localStorage.setItem('countdownStartTime', startTime.toString());
      localStorage.setItem('showCountdown', 'true');
      setShowEndChatCountdown(true);
      setRemainingTime(countdownDuration);
    }
    if (groupStatusData == 'deleted') {
      console.log('called3 asd');
      window.location.reload();
    }
  }, [groupStatusData]);
  // const [countdownText, setCountdownText] = useState(false);
  const handleDiscard = () => {
    setOpen(false);
    localStorage.setItem('showCountdown', 'true');
    setShowEndChatCountdown(true);
  };

  const handleEndChat = async () => {
    try {
      if (groupId) {
        const getGroupStatusAPIResponse = await getGroupStatusAPI(groupId);
        if (getGroupStatusAPIResponse) {
          console.log('getGroupStatusAPIResponse', getGroupStatusAPIResponse.data);
        } else {
          console.log('Error fetching data');
        }
        const endGroupChatAPIResponse = await deleteGroupChatByIdAPI(groupId);
        // setCountdownText(true);
        if (endGroupChatAPIResponse) {
          console.log('endGroupChatAPIResponse', endGroupChatAPIResponse.data);
          // console.log(broadcastChatEndEvent, 'broadcast called')
          history.push('/');
        }
        setTimeout(() => {
          location.reload();
        }, 60000);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Popup Once only
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const handleCheckPopupUpdateName = async () => {
      if (userId != null) {
        const userReponse = await getUserByIdAPI(userId);
        if (userReponse && userReponse.data.is_update == false) {
          console.log('userReponse2', userReponse.data);
          setShowModal(true);
        }
      }
    };
    handleCheckPopupUpdateName();
  }, [userId]);

  const handleClose = () => {
    setShowModal(false);
  };

  const handleAnonymous = () => {
    handleUpdateNameChange();
    handleClose();
  };
  const handleUpdateName = () => {
    handleUpdateNameChange();
    handleClose();
  };

  const handleUpdateNameChange = async () => {
    if (userId != null) {
      const updateUserResposne = await updateUserByIdAPI(username, userId);
      if (updateUserResposne) {
        console.log('updateUserResposne', updateUserResposne.data);
      }
    }
  };
  // hidden scroll bar
  useEffect(() => {
    document.body.style.overflow = 'hidden'; // Hide scroll bar on component mount
    return () => {
      document.body.style.overflow = 'auto'; // Restore scroll bar on component unmount
    };
  }, []);
  // small screen
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <div>
      <AppBar
        position={isMobile ? 'static' : 'fixed'}
        style={{
          justifyContent: 'center',
          // alignItems: 'center',
          minHeight: 100,
          height: 'auto',
          backgroundColor: '#ffffff',
          fontSize: '0.875rem',
          fontWeight: '700',
          borderBottom: '1px solid #ccc',
          boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Box
          style={{
            position: 'relative',
            height: 80,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '10px',
          }}
        >
          <Box style={{ position: 'absolute', left: '16px' }}>
            <MediaQuery minWidth={120}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Link to='/'>
                    <img
                      src={logo}
                      alt='Logo'
                      style={{
                        height: 'auto',
                        maxWidth: '20%',
                      }}
                    />
                  </Link>
                </Grid>
              </Grid>
            </MediaQuery>
          </Box>
          <Box
            style={{
              position: 'absolute',
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              marginLeft: '4.4vh',
            }}
          >
            <img
              src={littleIcon}
              style={{
                width: isMobile ? 20 : 30,
                padding: 20,
              }}
            />
            <Box
              style={{
                wordBreak: 'break-word',
                alignItems: 'center',
                width: isMobile ? '10vh' : '25vh',
              }}
            >
              <Box
                style={{
                  top: 20,
                  width: isMobile ? '10vh' : '25vh',
                }}
              >
                <Typography
                  variant='h6'
                  style={{
                    flex: 1,
                    fontSize: isMobile ? '1.8vh' : '2.3vh',
                    lineHeight: 1.15,
                    fontFamily: 'Barlow',
                  }}
                  className='group-name'
                >
                  {Group?.name}
                </Typography>
                {groupof && groupof > 1 ? (
                  <Typography variant='subtitle2' style={{ color: '#5F5F5F5F' }}>
                    {groupof} People
                  </Typography>
                ) : (
                  <Typography
                    variant='subtitle2'
                    style={{ color: '#5F5F5F5F', fontSize: isMobile ? '1.2vh' : '1.5vh' }}
                  >
                    {userCount} People
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>

          {userId === Group?.hostId && (
            <MediaQuery minWidth={30}>
              <Box
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '30px',
                  transform: 'translateY(-50%)',
                }}
              >
                {!showEndChatCountdown ? (
                  <Grid item sm={6}>
                    <Tooltip title='End the group chat' placement='left-start' arrow>
                      <img
                        onClick={handleEndChat}
                        src={EndChat}
                        style={{
                          width: isMobile ? 30 : 40,
                          height: 'auto',
                          verticalAlign: 'middle',
                          cursor: 'pointer',
                        }}
                        alt='End Chat Icon'
                      />
                    </Tooltip>
                  </Grid>
                ) : (
                  <EndChatCountdown remainingTime={remainingTime} />
                )}
              </Box>
            </MediaQuery>
          )}

          {userId !== Group?.hostId && showEndChatCountdown && (
            <Box
              style={{
                position: 'absolute',
                top: '50%',
                right: '30px',
                transform: 'translateY(-50%)',
              }}
            >
              <EndChatCountdown remainingTime={remainingTime} />
            </Box>
          )}
          {/* start end chat dialog */}
          <MediaQuery minWidth={100}>
            <Grid xs={12} sm={6}>
              <Dialog
                open={open}
                onClose={handleClose}
                // fullScreen={isMobile}
                style={{
                  display: 'block',
                  margin: '0 auto',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: isMobile ? '80vh' : '90vh',
                  height: 'auto',
                  minWidth: '100px',
                  maxWidth: '70vw',
                }}
              >
                <EndchatDialog />
                <DialogActions
                  style={{
                    display: 'block',
                    margin: '0 auto',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Box
                    style={{
                      padding: isMobile ? 0 : 20,
                      display: 'block',
                      margin: '0 auto',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Button
                      onClick={handleDiscard}
                      variant='outlined'
                      style={{
                        fontFamily: 'Barlow',
                        padding: 10,
                        color: '#5BA5DB',
                        borderColor: '#5BA5DB',
                        marginRight: isMobile ? 10 : 25,
                        fontSize: isMobile ? 8 : 12,
                        marginBottom: isMobile ? 10 : 0,
                      }}
                    >
                      Discard
                    </Button>
                    <a href='/' target='_blank'>
                      <Button
                        autoFocus
                        variant='contained'
                        style={{
                          fontFamily: 'Barlow',
                          padding: 10,
                          color: 'white',
                          backgroundColor: '#5BA5DB',
                          fontSize: isMobile ? 8 : 12,
                          marginBottom: isMobile ? 10 : 0,
                          textDecoration: 'none',
                        }}
                      >
                        HomePage
                      </Button>
                    </a>
                  </Box>
                </DialogActions>
              </Dialog>
            </Grid>
          </MediaQuery>
          {/* END end chat dialog */}
        </Box>
      </AppBar>

      {/* chat message */}
      <Box
        style={{
          display: 'block',
          scrollBehavior: 'auto',
          flex: 1,
          overflowY: 'auto',
          marginLeft: '20px',
          marginTop: isMobile ? 0 : '100px',
          marginBottom: 110,
          fontFamily: 'Barlow',
        }}
      >
        <div
          className='chat-container'
          ref={chatContainerRef}
          style={{
            scrollBehavior: 'auto',
            overflowY: 'auto',
            maxHeight: 'calc(100vh - 210px)',
          }}
        >
          {([...(Group?.chats || []), ...(messages || [])] as Chat[]).map((item, index) => (
            <Box
              style={{
                display: 'flex',
                justifyContent: item.sender.id === userId ? 'flex-end' : 'flex-start',
                minHeight: 50,
                marginInline: 2,
              }}
              key={index}
            >
              <Box
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginTop: isMobile ? 15 : 30,
                }}
              >
                <Box
                  style={{
                    display: 'flex',
                    justifyContent: item.sender.id === userId ? 'flex-end' : 'flex-start',
                  }}
                >
                  {item.sender.id !== userId && (
                    <Box
                      style={{
                        marginTop: 25,
                        marginRight: 25,
                      }}
                    >
                      <Avatar
                        size={isMobile ? 30 : 50}
                        name={item.sender.username}
                        variant='beam'
                        colors={['#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51']}
                        // colors={['#BCEBFF', '#8AE0FE ', '#48ADF8', '#449AE1', '#3A627B']}
                      />
                    </Box>
                  )}
                  <Box
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Box
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        // padding: 4,
                        alignItems: item.sender.id === userId ? 'flex-end' : 'flex-start',
                      }}
                    >
                      <Typography
                        variant='caption'
                        style={{
                          color: 'gray',
                          marginInline: 0,
                          minWidth: 'auto',
                          width: 'auto',
                          display: 'inline-block',
                          fontFamily: 'Barlow',
                          fontWeight: 500,
                          fontSize: isMobile ? 10 : 14,
                          marginRight: 20,
                        }}
                      >
                        {item.sender.id === userId ? 'You' : item.sender.username}
                      </Typography>
                      {/* <MediaQuery minWidth={400}> */}
                      <Grid container justify='flex-start'>
                        <Box
                          style={{
                            backgroundColor: item.sender.id === userId ? '#0091ea' : '#CCE0EE',
                            minHeight: 50,
                            display: 'flex',
                            alignItems: 'center',
                            // padding: '4px 15px',
                            borderRadius: 20,
                            maxWidth: '50vw', // Set maximum width to 70% of the viewport width
                            wordBreak: 'break-word',
                            // marginLeft: 20,
                            marginRight: 20,
                          }}
                        >
                          <Typography
                            variant='body1'
                            style={{
                              maxWidth: '100%',
                              display: 'inline-block',
                              overflowWrap: 'break-word',
                              wordWrap: 'break-word',
                              padding: '4px 15px',
                              color: item.sender.id === userId ? '#f5f5f5' : '#212121',
                              fontFamily: 'Barlow',
                              fontWeight: 500,
                              fontSize: isMobile ? 12 : 16,
                            }}
                          >
                            {item.message}
                          </Typography>
                        </Box>
                      </Grid>
                      {/* </MediaQuery> */}
                    </Box>
                  </Box>
                  {item.sender.id === userId && (
                    <Box
                      style={{
                        // marginLeft: 25,
                        marginRight: 20,
                        marginTop: 25,
                      }}
                    >
                      <Avatar
                        size={isMobile ? 30 : 50}
                        name={item.sender.username}
                        variant='beam'
                        // colors={['#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51']}
                        colors={['#BCEBFF', '#8AE0FE ', '#48ADF8', '#449AE1', '#3A627B']}
                      />
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          ))}
        </div>
      </Box>
      {/* end chat messgae */}
      {/* start input bar */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          width: '100%',
          justifyContent: 'space-between',
          alignContent: 'center',
          padding: '20px',
          borderTop: '1px solid #ccc',
          boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#ffffff',
        }}
      >
        <div
          style={{
            width: '100%',
            display: 'flex',
            paddingBottom: '2px',
            paddingTop: '2px',
            boxSizing: 'border-box',
            alignItems: 'center',
            paddingLeft: '40px',
            paddingRight: '60px',
          }}
        >
          <div
            style={{
              display: 'flex',
              width: '100%',
              marginRight: 20,
            }}
          >
            <input
              ref={messageInput}
              onKeyPress={handleKeyPress}
              type='text'
              placeholder='Write a message...'
              className='message-input'
            />
          </div>
          <button
            onClick={handleSubmit}
            style={{
              // width: 50,
              display: 'flex',
              justifyContent: 'flex-end',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            <img
              src={SendIcon}
              style={{ width: 'auto', height: 40, verticalAlign: 'middle', fontSize: 60 }}
              alt='send'
            />
          </button>
        </div>
      </div>
      {/* end input bar */}
      {/* popup */}
      <div>
        {showModal && (
          <MediaQuery minWidth={200}>
            <Grid xs={12} sm={6}>
              <Modal
                open={showModal}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
              >
                <Box
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: '#FFFFFF',
                    borderRadius: 5,
                    padding: 34,
                    minWidth: '100px',
                    maxWidth: '70vw',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    id='modal-modal-title'
                    style={{
                      textAlign: 'center',
                      // fontSize: 20,
                      fontFamily: 'Barlow',
                      fontWeight: 500,
                      fontSize: isMobile ? 16 : 20,
                    }}
                  >
                    Change username or remain random name:
                  </Typography>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      margin: '0 auto',
                    }}
                  >
                    <TextField
                      placeholder='Enter your new name..'
                      variant='outlined'
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      style={{
                        padding: '40px 0',
                        width: '70%',
                        fontSize: isMobile ? 16 : 20,
                      }}
                    >
                      Enter your name
                    </TextField>
                  </div>
                  <Box
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      margin: '0 auto',
                    }}
                  >
                    <Button
                      onClick={handleAnonymous}
                      variant='outlined'
                      style={{
                        height: '50px',
                        fontSize: isMobile ? 10 : 14,
                        cursor: 'pointer',
                        borderRadius: '10px',
                        // fontWeight: 'bold',
                        padding: 20,
                        color: '#5BA5DB',
                        borderColor: '#5BA5DB',
                        fontFamily: 'Barlow',
                        fontWeight: 400,
                      }}
                    >
                      Anonymous Name
                    </Button>
                    <Button
                      variant='contained'
                      onClick={handleUpdateName}
                      style={{
                        height: '50px',
                        fontSize: isMobile ? 10 : 14,
                        cursor: 'pointer',
                        borderRadius: '10px',
                        color: 'white',
                        // fontWeight: 'bold',
                        fontFamily: 'Barlow',
                        fontWeight: 400,
                        WebkitTextFillColor: 'white',
                        padding: 20,
                        marginLeft: 20,
                        backgroundColor: '#5BA5DB',
                      }}
                    >
                      Update Name
                    </Button>
                  </Box>
                </Box>
              </Modal>
            </Grid>
          </MediaQuery>
        )}
      </div>
    </div>
  );
}

export default MessageItem;
