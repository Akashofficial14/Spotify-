// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// 1. IMPORT PHONE AUTH UTILITIES FROM THE MULTI-FACTOR SDK
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKFCOb01_xNgmiG-hTxWA443IDZn4c-4c",
  authDomain: "spotify-clone-e3c47.firebaseapp.com",
  projectId: "spotify-clone-e3c47",
  storageBucket: "spotify-clone-e3c47.firebasestorage.app",
  messagingSenderId: "682997435647",
  appId: "1:682997435647:web:f7442eca5dd30296a250ca",
  measurementId: "G-BMKRLXC7RS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

// 2. INITIALIZE AND EXPORT AUTH SYSTEM LAYER
export const auth = getAuth(app);
export { RecaptchaVerifier, signInWithPhoneNumber };