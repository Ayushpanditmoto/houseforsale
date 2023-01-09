import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCy2WI-5CKPr1v5tPeYv4UJhUDzdSFtbsg",
  authDomain: "houseforsale-ca082.firebaseapp.com",
  projectId: "houseforsale-ca082",
  storageBucket: "houseforsale-ca082.appspot.com",
  messagingSenderId: "241694711420",
  appId: "1:241694711420:web:229fc1a0e12a282806f3f9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
