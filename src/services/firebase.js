// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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