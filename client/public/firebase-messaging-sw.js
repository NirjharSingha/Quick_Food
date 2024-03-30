importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("../firebase-messaging-sw.js")
    .then(function (registration) {
      console.log("Registration successful, scope is:", registration.scope);
    })
    .catch(function (err) {
      console.log("Service worker registration failed, error:", err);
    });
}

firebase.initializeApp({
  messagingSenderId: "743681292384",
  apiKey: "AIzaSyAvybg3hKj0oHV60hdrD668Q8fxs7R1FMg",
  authDomain: "quick-food-fcm.firebaseapp.com",
  projectId: "quick-food-fcm",
  storageBucket: "quick-food-fcm.appspot.com",
  appId: "1:743681292384:web:b1a44dc7d1bfa4d0dd2b05",
});

const initMessaging = firebase.messaging();
