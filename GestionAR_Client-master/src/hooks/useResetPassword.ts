import { useMutation } from 'react-query';
import { axios } from '../config/axiosConfig';

const BASE_URL = '/auth';

const resetPassword = async (req) => {
  try {
    const response = await axios.post(`${BASE_URL}/resetPassword`, req);
    return response.data;
  } catch (error) {
    console.log('resetPassword - error ->', error);
  }
};

export const useResetPassword = () => {
  return useMutation<any, Error, any>((req) => resetPassword(req), {
    mutationKey: 'resetPassword',
  });
};
