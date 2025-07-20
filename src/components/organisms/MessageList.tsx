import React, { useEffect, useState } from 'react';
import { getChannelMessages } from '../../api/sevices/GetMessages';
import { useAuth } from '../../context/AuthContext';

type MessageListProps = {
  channelId: any;
  onOpenThread: (msg: any) => void;
};

const MessageList: React.FC<MessageListProps> = ({ channelId, onOpenThread }) => {
  const [messages, setMessages] = useState<any[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!channelId || !channelId.id) return;
    const unsubscribe = getChannelMessages(channelId.id, setMessages);
    return () => unsubscribe && unsubscribe();
  }, [channelId]);

  if (!channelId || !channelId.id) {
    return <div className="p-4 text-gray-400">Select a channel to view messages.</div>;
  }

  // Helper to get a unique user key for grouping
  const getUserKey = (m: any) => m?.senderId || m?.user || '';

  return (
    <div className="p-4">
      {messages.map((msg, idx) => {
        // Convert Firestore Timestamp to JS Date
        let time = '';
        if (msg.createdAt) {
          const date =
            typeof msg.createdAt.toDate === 'function'
              ? msg.createdAt.toDate()
              : new Date(msg.createdAt.seconds * 1000);
          time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }

        // Group messages by same user
        const prevMsg = messages[idx - 1];
        const isSameUserAsPrev = idx > 0 && getUserKey(prevMsg) === getUserKey(msg);

        return (
          <div
            key={msg.id}
            className={`flex items-start gap-2 ${isSameUserAsPrev ? 'mt-1' : 'mt-4'}`}
            onClick={() => onOpenThread(msg)}
          >
            {/* Avatar only for first message in group */}
            {!isSameUserAsPrev ? (
              msg.senderPhotoURL ? (
                <img
                  src={msg.senderPhotoURL}
                  alt={msg.senderName}
                  className="w-8 h-8 rounded-full border border-gray-300 mt-1"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold text-base mt-1">
                  {(msg.senderName || msg.user || 'U')[0].toUpperCase()}
                </div>
              )
            ) : (
              <div className="w-8 h-8" />
            )}
            <div className="flex-1">
              {/* Only show name and time for first in group */}
              {!isSameUserAsPrev && (
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold">{msg.user || msg.senderName}</span>
                  <span className="text-xs text-gray-400">{time}</span>
                </div>
              )}
              <div
                className={`relative px-4 py-2 rounded-2xl w-full break-words ${
                  user?.uid === msg.senderId
                    ? 'bg-blue-100 text-blue-900'
                    : 'bg-gray-100 text-gray-900'
                }`}
                style={{
                  borderTopLeftRadius: isSameUserAsPrev ? '0.5rem' : '1rem',
                  borderTopRightRadius: isSameUserAsPrev ? '0.5rem' : '1rem',
                }}
              >
                {msg.text}
              </div>
              {msg.hasThread && (
                <button
                  className="text-xs text-blue-500 mt-1 ml-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenThread(msg);
                  }}
                >
                  {msg.threadCount} replies
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
