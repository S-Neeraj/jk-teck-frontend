import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCY15Y1NW6ffS_pjOvbk-yhLZE2984z6GE",
  authDomain: "blogging-app-5cea7.firebaseapp.com",
  projectId: "blogging-app-5cea7",
  storageBucket: "blogging-app-5cea7.firebasestorage.app",
  messagingSenderId: "1050228312391",
  appId: "1:1050228312391:web:63f6abc4d7d79012106462",
  measurementId: "G-01E07Q40E9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, googleProvider, facebookProvider };
