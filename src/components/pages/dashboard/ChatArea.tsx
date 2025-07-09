import React from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { useSendMessage } from '../../../api/hooks/useSendMessage';
import { useAuth } from '../../../context/AuthContext';

type ChatAreaProps = {
  channelId: any;
  onOpenThread: (msg: any) => void;
};

const ChatArea: React.FC<ChatAreaProps> = ({ channelId, onOpenThread }) => {
  const { mutate: sendMessage, isPending } = useSendMessage();
  const { user } = useAuth();

  const handleSend = (text: string) => {
    if (!user || !channelId.id || !text.trim()) return;
    sendMessage({
      channelId: channelId.id,
      message: text,
      user,
    });
  };

  return (
    <div className="flex flex-col h-[90%] w-auto">
      <div className="flex-1 overflow-y-auto">
        <MessageList channelId={channelId} onOpenThread={onOpenThread} />
      </div>
      <MessageInput onSend={handleSend} isLoading={isPending} />
    </div>
  );
};

export default ChatArea;
