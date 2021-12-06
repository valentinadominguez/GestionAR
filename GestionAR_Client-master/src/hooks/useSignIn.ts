import { useMutation } from 'react-query';
import { axios } from '../config/axiosConfig';

const BASE_URL = '/auth';

const signIn = async (req) => {
  try {
    const response = await axios.post(`${BASE_URL}/signIn`, req);
    return response.data;
  } catch (error) {
    console.log('signIn - error ->', error);
  }
};

export const useSignIn = () => {
  return useMutation<any, Error, any>((req) => signIn(req), {
    mutationKey: 'signIn',
  });
};
