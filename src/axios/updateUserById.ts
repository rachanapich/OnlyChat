import axiosInstance from './axiosConfig';

export const updateUserByIdAPI = async (username: string, userId: string) => {
  try {
    const response = await axiosInstance.put('/users/' + userId, {
      username: username,
    });
    return response;
  } catch (error) {
    return null;
  }
};
