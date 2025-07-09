import { collection, addDoc, updateDoc, doc, serverTimestamp, increment } from 'firebase/firestore';
import { db } from '../../main';

/**
 * Sends a reply to a specific message in a channel and updates the parent message's thread info.
 *
 * @param channelId - The channel's ID.
 * @param messageId - The parent message's ID.
 * @param replyText - The reply text.
 * @param user - The user object (must have uid and displayName).
 */
export async function sendReply(
  channelId: string,
  messageId: string,
  replyText: string,
  user: { uid: string; displayName: string }
) {
  // Add the reply to the replies subcollection
  const replyRef = collection(db, 'channels', channelId, 'messages', messageId, 'replies');
  await addDoc(replyRef, {
    text: replyText,
    senderId: user.uid,
    senderName: user.displayName,
    createdAt: serverTimestamp(),
  });

  // Update the parent message to indicate it has a thread and increment threadCount
  const messageDoc = doc(db, 'channels', channelId, 'messages', messageId);
  await updateDoc(messageDoc, {
    hasThread: true,
    threadCount: increment(1),
    lastReplyAt: serverTimestamp(),
  });
}
