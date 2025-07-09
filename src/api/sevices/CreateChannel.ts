// src/services/createChannel.ts
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../main';

export async function CreateChannel({
  name,
  description,
  isPrivate,
  createdBy,
  members = [],
}: {
  name: string;
  description: string;
  isPrivate: boolean;
  createdBy: string;
  members?: string[]; // required for private channels
}) {
  const docRef = await addDoc(collection(db, 'channels'), {
    name,
    description,
    isPrivate,
    createdBy,
    createdAt: serverTimestamp(),
    members: isPrivate ? members : [], // only include if private
  });

  return docRef.id;
}
