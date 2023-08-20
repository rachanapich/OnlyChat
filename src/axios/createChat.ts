import axiosInstance from './axiosConfig';

export const createChatAPI = async (group_id: string, user_id: string, message: string) => {
  console.log('groupid', group_id, 'userid', user_id, 'message', message);
  try {
    const response = await axiosInstance.post('/chats', {
      group_id: group_id,
      user_id: user_id,
      message: message,
    });
    return response;
  } catch (error) {
    return null;
  }
};
