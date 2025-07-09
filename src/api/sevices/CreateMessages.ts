import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../main';

export async function sendMessage(channelId: string, message: string, user: any) {
  const messageRef = collection(db, 'channels', channelId, 'messages');

  await addDoc(messageRef, {
    text: message,
    senderId: user.uid,
    senderName: user.displayName,
    senderPhotoURL: user.photoURL,
    createdAt: serverTimestamp(),
    hasThread: false,
    threadCount: 0,
  });
}
