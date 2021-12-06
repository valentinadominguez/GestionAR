import { useQuery } from 'react-query';
import { axios } from '../config/axiosConfig';

const getGrades = async () => {
  try {
    const response = await axios.get(`/grades/`);
    return response.data;
  } catch (error) {
    console.log('error ->', error);
  }
};

export const useGrades = () => {
  return useQuery<any[], Error>(['grades'], () => getGrades(), {
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5, // Amount of time (5m) before the data is considered as Stale
  });
};
