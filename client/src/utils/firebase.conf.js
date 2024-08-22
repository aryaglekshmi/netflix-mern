import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
 apiKey: "xxxx",
 authDomain: "xxx",
 projectId: "xxx",
 storageBucket: "xxxx",
 messagingSenderId: "xx",
 appId: "xxx",
 measurementId: "xxxx"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);