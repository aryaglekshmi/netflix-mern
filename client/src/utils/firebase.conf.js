import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { FIREBASE_API } from "../utils/constants";

const firebaseConfig = {
  apiKey: FIREBASE_API,
  authDomain: "react-netflix-clone-3d959.firebaseapp.com",
  projectId: "react-netflix-clone-3d959",
  storageBucket: "react-netflix-clone-3d959.appspot.com",
  messagingSenderId: "758228196255",
  appId: "1:758228196255:web:c1786882c0a4eefa32fbaa",
  measurementId: "G-TMZ4G0DGH9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
