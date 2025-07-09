import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../main';

export async function getAllChannels() {
  const querySnapshot = await getDocs(collection(db, 'channels'));
  return querySnapshot;
}
