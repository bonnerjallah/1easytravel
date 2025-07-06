import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence, } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage"; // ✅ import this!

const firebaseConfig = {
  apiKey: "AIzaSyAyI6MVoN5tCjwM17yPykuyRdk4cjQXn5A",
  authDomain: "easytravel-f3a2d.firebaseapp.com",
  projectId: "easytravel-f3a2d",
  storageBucket: "easytravel-f3a2d.firebasestorage.app",
  messagingSenderId: "1093914501803",
  appId: "1:1093914501803:web:62af935ac8d0ce379c0dee",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
export const db = getFirestore(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage), // ✅ fixed
});
