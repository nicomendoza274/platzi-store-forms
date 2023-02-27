importScripts('https://www.gstatic.com/firebasejs/7.19.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.19.0/firebase-messaging.js');

firebase.initializeApp({
  apiKey: 'AIzaSyDXE_lG3kXjy8w26NYAYhA3UsXsALsvHSg',
  authDomain: 'angular-pwa-platzi-7fa0b.firebaseapp.com',
  projectId: 'angular-pwa-platzi-7fa0b',
  storageBucket: 'angular-pwa-platzi-7fa0b.appspot.com',
  messagingSenderId: '790592832985',
  appId: '1:790592832985:web:dec8e82b36a101415245c8',
});

const messaging = firebase.messaging();
