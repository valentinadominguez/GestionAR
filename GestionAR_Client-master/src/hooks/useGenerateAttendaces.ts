import { useMutation } from 'react-query';
import { axios } from '../config/axiosConfig';

const BASE_URL = '/attendances';

const generateAttendances = async (req) => {
  try {
    const response = await axios.post(`${BASE_URL}/add`, req);
    return response.data;
  } catch (error) {
    console.log('generateAttendances - error ->', error);
  }
};

export const useGenerateAttendaces = () => {
  return useMutation<any, Error, any>((req) => generateAttendances(req), {
    mutationKey: 'generateAttendances',
  });
};
