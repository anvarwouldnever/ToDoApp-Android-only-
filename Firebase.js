import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDOUeVAlB6lN25LbMPxdyUpNMzQewjZsgA",
  authDomain: "instagram-57770.firebaseapp.com",
  projectId: "instagram-57770",
  storageBucket: "instagram-57770.appspot.com",
  messagingSenderId: "422369342585",
  appId: "1:422369342585:web:7128a4ef277f3bf19150a8",
  measurementId: "G-Y2N58BZXB8"
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);