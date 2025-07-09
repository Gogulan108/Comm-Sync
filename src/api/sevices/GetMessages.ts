import { collection, query, orderBy, onSnapshot, QuerySnapshot } from 'firebase/firestore';
import type { DocumentData } from 'firebase/firestore';

import { db } from '../../main';

/**
 * Subscribes to real-time messages in a Firestore channel.
 *
 * @param channelId - The ID of the channel to listen to.
 * @param callback - A function that receives the latest array of messages.
 * @returns A function to unsubscribe from the listener.
 *
 * @example
 * const unsubscribe = getChannelMessages('channel_001', (messages) => {
 *   setMessages(messages);
 * });
 * // To stop listening:
 * unsubscribe();
 */
export function getChannelMessages(channelId: string, callback: (messages: any[]) => void) {
  const messagesRef = collection(db, 'channels', channelId, 'messages');
  const q = query(messagesRef, orderBy('createdAt', 'asc'));

  // Listen for real-time updates and call the callback with the latest messages
  const unsubscribe = onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
    const messages = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(messages);
  });

  return unsubscribe;
}
