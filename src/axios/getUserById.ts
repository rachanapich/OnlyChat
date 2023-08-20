import axiosInstance from './axiosConfig';

export const getUserByIdAPI = async (userId: string) => {
  try {
    const response = await axiosInstance.get('/users/' + userId);
    return response;
  } catch (error) {
    return null;
  }
};
