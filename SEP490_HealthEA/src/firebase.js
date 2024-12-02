import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCAql3W5BV6Hk3Mob_bLybtUadbaWtZawc",
  authDomain: "sep490-c3c0a.firebaseapp.com",
  projectId: "sep490-c3c0a",
  storageBucket: "sep490-c3c0a.appspot.com", // Sửa lại storageBucket
  messagingSenderId: "392276402070",
  appId: "1:392276402070:web:d31c42e6b12bc663c7c7b7",
  measurementId: "G-J37Q72NBG5",
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Khởi tạo messaging
const messaging = getMessaging(app);

export { messaging, getToken, onMessage };
