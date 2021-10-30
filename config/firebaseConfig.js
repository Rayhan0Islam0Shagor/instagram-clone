import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCNcnSCLDIVgQZ0dGZD0fZvfoRjFR59ilY',
  authDomain: 'instagram-clone-045.firebaseapp.com',
  projectId: 'instagram-clone-045',
  storageBucket: 'instagram-clone-045.appspot.com',
  messagingSenderId: '541736815427',
  appId: '1:541736815427:web:58297eaa59b6d257227df6',
  measurementId: 'G-BTQVKCHSYP',
};

// Initialize Firebase
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore();
export const storage = getStorage();
