import { useQuery } from '@tanstack/react-query';
import { getAllChannels } from '../sevices/GetAllChannels';

export const useGetAllChannels = () =>
  useQuery({
    queryKey: ['all-channels'],
    queryFn: getAllChannels,
    retry: 2, // number of retry attempts (default is 3)
    staleTime: 1000 * 60 * 5, // data is fresh for 5 minutes
  });
