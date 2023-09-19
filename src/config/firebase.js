import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  MEASUREMENT_ID,
} from "@env"


const firebaseConfig = {
  apiKey: "AIzaSyBuYXyBIgeGx1mCb_EDQSDxkVDr_0EZ-Lo",
  authDomain: "mobsport-417ad.firebaseapp.com",
  projectId: "mobsport-417ad",
  storageBucket: "mobsport-417ad.appspot.com",
  messagingSenderId: "707235805875",
  appId: "1:707235805875:web:46c73ee6a029a4748f8ec6",
  measurementId: "G-GGKXQE8FR1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
})

export { auth }; 