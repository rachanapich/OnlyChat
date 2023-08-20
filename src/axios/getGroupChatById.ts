import { AxiosResponse } from 'axios';
import { createBrowserHistory } from 'history';
import axiosInstance from './axiosConfig';

const history = createBrowserHistory();

export const getGroupChatByIdAPI = async (groupId: string): Promise<AxiosResponse | null> => {
  try {
    console.log(groupId);
    const response: AxiosResponse = await axiosInstance.get('/groups/' + groupId);
    return response;
  } catch (error) {
    history.push('/groups/' + groupId + '/404');
    window.location.reload();
    return null;
  }
};
