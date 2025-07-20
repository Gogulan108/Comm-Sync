// Import the functions you need from the SDKs you need
//import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { initializeApp, getApps } from 'firebase/app';
import type { FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: 'AIzaSyBU6m0S3banypiSceDfZUAkcPY1HiR2T04',
  authDomain: 'slack-clone-625b8.firebaseapp.com',
  projectId: 'slack-clone-625b8',
  storageBucket: 'slack-clone-625b8.appspot.com',
  messagingSenderId: '93362152118',
  appId: '1:93362152118:web:b6949f464182be88057c17',
  measurementId: 'G-GK7CWH6XME',
};

export function initializeFirebase(): { appFirebase: FirebaseApp; db: Firestore } {
  const appFirebase = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  const db = getFirestore(appFirebase);
  return { appFirebase, db };
}
