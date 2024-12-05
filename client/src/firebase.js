// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'aa-archives.firebaseapp.com',
  projectId: 'aa-archives',
  storageBucket: 'aa-archives.firebasestorage.app',
  messagingSenderId: '504719546465',
  appId: '1:504719546465:web:83771ce643ba2014e43220',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
