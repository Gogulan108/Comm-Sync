import { useMutation } from '@tanstack/react-query';
import { sendMessage } from '../sevices/CreateMessages';

type SendMessageInput = {
  channelId: string;
  message: string;
  user: any;
};

export function useSendMessage() {
  return useMutation({
    mutationFn: async ({ channelId, message, user }: SendMessageInput) => {
      return await sendMessage(channelId, message, user);
    },
  });
}
