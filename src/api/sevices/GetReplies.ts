import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../main';

/**
 * Custom hook to subscribe to real-time replies for a specific message in a channel.
 *
 * @param channelId - The channel's ID.
 * @param messageId - The parent message's ID.
 * @returns Array of reply objects.
 */
export function useMessageReplies(channelId: string, messageId: string) {
  const [replies, setReplies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!channelId || !messageId) {
      setReplies([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const repliesRef = collection(db, 'channels', channelId, 'messages', messageId, 'replies');
    const q = query(repliesRef, orderBy('createdAt', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const replyList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReplies(replyList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [channelId, messageId]);

  return { replies, loading };
}
