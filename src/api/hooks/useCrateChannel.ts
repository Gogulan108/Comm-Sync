import { useMutation } from '@tanstack/react-query';
import { CreateChannel } from '../sevices/CreateChannel';

type ChannelInput = {
  name: string;
  description: string;
  isPrivate: boolean;
  createdBy: string;
  members?: string[];
};

export function useCreateChannel() {
  return useMutation({
    mutationFn: async (data: ChannelInput) => {
      return await CreateChannel(data);
    },
  });
}
