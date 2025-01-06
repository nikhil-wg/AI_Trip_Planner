// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {
  apiKey: "AIzaSyAlekeARMheIEyR-3wXUYQqBXH9Zo9Onj4",
  authDomain: "ai-trip-planner-7674e.firebaseapp.com",
  projectId: "ai-trip-planner-7674e",
  storageBucket: "ai-trip-planner-7674e.firebasestorage.app",
  messagingSenderId: "700127586337",
  appId: "1:700127586337:web:23930dd2283503c24a1b60",
  measurementId: "G-MQCYS95VY4",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
