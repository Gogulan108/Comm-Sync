import React, { useState } from 'react';
import Button from '../../atoms/button/Button';
import { useSendReplies } from '../../../api/hooks/useSendReplies';
import { useAuth } from '../../../context/AuthContext';
import { useMessageReplies } from '../../../api/sevices/GetReplies';
import { Reply } from 'lucide-react';

type ThreadSliderProps = {
  open: boolean;
  message: any;
  channelId: string;
  onClose: () => void;
};

const formatTime = (ts: any) => {
  if (!ts) return '';
  const date =
    typeof ts.toDate === 'function'
      ? ts.toDate()
      : ts.seconds
        ? new Date(ts.seconds * 1000)
        : new Date(ts);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const ThreadSlider: React.FC<ThreadSliderProps> = ({ open, message, channelId, onClose }) => {
  const [reply, setReply] = useState('');
  const { user } = useAuth();
  const { mutate, isPending } = useSendReplies();
  const { replies, loading } = useMessageReplies(channelId, message?.id);

  const handleReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reply.trim() || !user || !message?.id) return;
    mutate(
      {
        channelId,
        messageId: message.id,
        replyText: reply,
        user: { uid: user.uid, displayName: user.displayName ?? '' },
      },
      {
        onSuccess: () => setReply(''),
      }
    );
  };

  // Helper to get a unique user key for grouping
  const getUserKey = (m: any) => m?.senderId || m?.user || '';

  return (
    <div
      className={`fixed top-0 right-0 h-full w-96 bg-gray-100 shadow-lg transition-transform duration-300 z-50 ${
        open ? 'translate-x-0' : 'translate-x-full'
      }`}
      style={{ willChange: 'transform' }}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <div className="font-bold text-lg flex gap-3">
          <Reply />
          Reply Thread
        </div>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-xl">
          ✕
        </button>
      </div>
      {message ? (
        <div className="flex flex-col h-[90%]">
          <div className="p-4 flex-1 overflow-y-auto">
            {/* Main message */}
            <div className="mb-6 p-4 bg-blue-50 rounded-lg shadow-sm border">
              <div className="flex items-center gap-2 mb-1">
                <div className="font-semibold text-blue-700">{message.senderName}</div>
                <span className="text-xs text-gray-400">{formatTime(message.createdAt)}</span>
              </div>
              <div className="text-gray-800">{message.text}</div>
            </div>
            {/* Replies, grouped by user */}
            <div>
              {loading ? (
                <div className="text-xs text-gray-400">Loading replies...</div>
              ) : replies.length === 0 ? (
                <div className="text-xs text-gray-400 italic">No replies yet.</div>
              ) : (
                replies.map((reply: any, idx: number) => {
                  const prevReply = replies[idx - 1];
                  const isSameUserAsPrev = idx > 0 && getUserKey(prevReply) === getUserKey(reply);
                  return (
                    <div
                      key={reply.id}
                      className={`flex items-start gap-2 ${isSameUserAsPrev ? 'mt-1' : 'mt-4'} ml-2`}
                    >
                      {/* Avatar only for first message in group */}
                      {!isSameUserAsPrev ? (
                        reply.senderPhotoURL ? (
                          <img
                            src={reply.senderPhotoURL}
                            alt={reply.senderName}
                            className="w-8 h-8 rounded-full border border-gray-300 mt-1"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-purple-400 flex items-center justify-center text-white font-bold text-base mt-1">
                            {(reply.senderName || reply.user || 'U')[0].toUpperCase()}
                          </div>
                        )
                      ) : (
                        <div className="w-8 h-8" />
                      )}
                      <div className="flex-1">
                        {/* Only show name and time for first in group */}
                        {!isSameUserAsPrev && (
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-purple-700">
                              {reply.senderName}
                            </span>
                            <span className="text-xs text-gray-400">
                              {formatTime(reply.createdAt)}
                            </span>
                          </div>
                        )}
                        <div
                          className="px-4 py-2 rounded-2xl bg-gray-100 border-gray-400 text-gray-700 shadow-sm max-w-xl break-words"
                          style={{
                            borderTopLeftRadius: isSameUserAsPrev ? '0.5rem' : '1rem',
                            borderTopRightRadius: isSameUserAsPrev ? '0.5rem' : '1rem',
                          }}
                        >
                          {reply.text}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
          {/* Reply input */}
          <form onSubmit={handleReply} className="p-4 flex gap-2 bg-gray-100">
            <input
              className="flex-1 px-3 py-2 border bg-white border-white bg-transparent placeholder:text-gray-300 text-base rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
              placeholder="Reply to thread..."
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              disabled={isPending}
              maxLength={500}
            />
            <Button
              isLoading={isPending}
              type="submit"
              className="bg-blue-500 text-white px-4 py-2"
              disabled={isPending || !reply.trim()}
            >
              Send
            </Button>
          </form>
        </div>
      ) : (
        <div className="p-4 text-gray-400">No thread selected</div>
      )}
    </div>
  );
};

export default ThreadSlider;
