importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyCAql3W5BV6Hk3Mob_bLybtUadbaWtZawc",
  authDomain: "sep490-c3c0a.firebaseapp.com",
  projectId: "sep490-c3c0a",
  storageBucket: "sep490-c3c0a.appspot.com",
  messagingSenderId: "392276402070",
  appId: "1:392276402070:web:d31c42e6b12bc663c7c7b7",
});
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Received background message ", payload);
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: "/icon.png",
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
