import { useMutation } from '@tanstack/react-query';
import { sendReply } from '../sevices/ReplyMessages';

type SendReplyInput = {
  channelId: string;
  messageId: string;
  replyText: string;
  user: { uid: string; displayName: string };
};

export function useSendReplies() {
  return useMutation({
    mutationFn: async (data: SendReplyInput) => {
      return await sendReply(data.channelId, data.messageId, data.replyText, data.user);
    },
  });
}
