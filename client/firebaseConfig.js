import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCnZRG_8Z3JK36oupS3VTIoSbyRHJNCq40",
  authDomain: "cs5500-group1-fortune-teller.firebaseapp.com",
  projectId: "cs5500-group1-fortune-teller",
  storageBucket: "cs5500-group1-fortune-teller.firebasestorage.app",
  messagingSenderId: "882982225091",
  appId: "1:882982225091:web:98b20570d8437c768d8e76",
  measurementId: "G-D8SJYZ7VHK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
