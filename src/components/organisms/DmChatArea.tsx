import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Button from '../atoms/button/Button';

type DmChatAreaProps = {
  user: any; // The selected DM user object
  onOpenThread: (msg: any) => void;
};

const DmChatArea: React.FC<DmChatAreaProps> = ({ user, onOpenThread }) => {
  const { user: currentUser } = useAuth();
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');

  // TODO: Replace with actual Firestore DM fetch logic
  useEffect(() => {
    if (!user) {
      setMessages([]);
      return;
    }
    // Simulate fetching messages between currentUser and selected DM user
    setMessages([
      {
        id: '1',
        senderId: currentUser?.uid,
        senderName: currentUser?.displayName,
        text: 'Hey there!',
        createdAt: new Date(),
      },
      {
        id: '2',
        senderId: user?.id,
        senderName: user?.displayName,
        text: 'Hello!',
        createdAt: new Date(),
      },
    ]);
  }, [user, currentUser]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    // TODO: Send message to Firestore
    setMessages([
      ...messages,
      {
        id: Date.now().toString(),
        senderId: currentUser?.uid,
        senderName: currentUser?.displayName,
        text: input,
        createdAt: new Date(),
      },
    ]);
    setInput('');
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  if (!user) {
    return <div className="p-4 text-gray-400">Select a user to start a DM.</div>;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, idx) => {
          const isMine = msg.senderId === currentUser?.uid;
          return (
            <div
              key={msg.id}
              className={`flex ${isMine ? 'justify-end' : 'justify-start'} mb-2`}
              onClick={() => onOpenThread(msg)}
            >
              <div
                className={`max-w-lg px-4 py-2 rounded-2xl shadow ${
                  isMine ? 'bg-blue-100 text-blue-900' : 'bg-gray-100 text-gray-900'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-xs">{msg.senderName}</span>
                  <span className="text-xs text-gray-400">
                    {formatTime(new Date(msg.createdAt))}
                  </span>
                </div>
                <div>{msg.text}</div>
              </div>
            </div>
          );
        })}
      </div>
      <form onSubmit={handleSend} className="p-4 flex gap-2 border-t bg-white">
        <input
          className="flex-1 px-3 py-2 border rounded-xl shadow focus:ring-2 focus:ring-blue-300 outline-none placeholder:text-gray-300"
          placeholder={`Message ${user?.displayName || 'user'}...`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          Send
        </Button>
      </form>
    </div>
  );
};
export default DmChatArea;
