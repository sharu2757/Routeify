import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// 1. ADDED: Import the Auth modules
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDWlkAySX8bm5M6AR4dj91Yzlzt5GNFnyo",
  authDomain: "routeify-f92d3.firebaseapp.com",
  projectId: "routeify-f92d3",
  storageBucket: "routeify-f92d3.firebasestorage.app",
  messagingSenderId: "422674008717",
  appId: "1:422674008717:web:7a5c826c3128afa3b6f0c4",
  measurementId: "G-18YBYYMXFS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// 2. ADDED: Initialize Auth and export it for ChatContext to use!
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();