import axiosInstance from './axiosConfig';

export const deleteGroupChatByIdAPI = async (groupId: string) => {
  try {
    console.log(groupId);
    const response = await axiosInstance.delete('/groups/' + groupId);
    return response;
  } catch (error) {
    return null;
  }
};
