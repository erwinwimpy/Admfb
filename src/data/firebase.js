// ============================================
// CIPTA Finansial — Firebase Configuration
// ============================================

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCD3Li_PtOi1n-76fiVxFM5AllwmwAhO-U",
  authDomain: "adamfamilybudget.firebaseapp.com",
  projectId: "adamfamilybudget",
  storageBucket: "adamfamilybudget.firebasestorage.app",
  messagingSenderId: "271655292794",
  appId: "1:271655292794:web:610b8e17eb1e04af17d0c3",
  measurementId: "G-W9P07ZCHT0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
