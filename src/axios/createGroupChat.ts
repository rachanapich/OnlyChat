import axiosInstance from './axiosConfig';

export const createGroupChatAPI = async (group_name: string, given_time: number) => {
  try {
    console.log(group_name);
    console.log(given_time);
    const response = await axiosInstance.post('/groups', {
      group_name: group_name,
      given_time: given_time,
    });
    return response;
  } catch (error) {
    return null;
  }
};
