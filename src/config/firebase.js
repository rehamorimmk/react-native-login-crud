
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAwBtV1NEGA4O34ST8Y4dAe8PuLgV-v4Nk",
  authDomain: "isabellyifal513.firebaseapp.com",
  projectId: "isabellyifal513",
  storageBucket: "isabellyifal513.appspot.com",
  messagingSenderId: "238081750806",
  appId: "1:238081750806:web:b79835585e72f8d9fd8237"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = initializeAuth(app)

export { app, db, auth }