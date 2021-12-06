import { useQuery } from 'react-query';
import { axios } from '../config/axiosConfig';

const getAttendances = async (gradeId: string, subjectId: string) => {
  try {
    const response = await axios.get(`/attendances/`, {
      params: {
        gradeId,
        subjectId,
      },
    });
    return response?.data;
  } catch (error) {
    console.log('getAttendances - error -->', error);
  }
};

export const useAttendances = (gradeId: string, subjectId: string) => {
  return useQuery<any[], Error>(['grades', { gradeId, subjectId }], () => getAttendances(gradeId, subjectId), {
    keepPreviousData: true,
    enabled: !!subjectId && !!gradeId,
    staleTime: 1000 * 60 * 5, // Amount of time (5m) before the data is considered as Stale
  });
};
