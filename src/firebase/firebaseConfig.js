import { initializeApp } from "firebase/app";

import { getMessaging } from "firebase/messaging";

//Firebase Config values imported from .env file
const firebaseConfig = {
  apiKey: 'AIzaSyDey7Wz0qma2oUJMcX23Zk_ma5ibhY1Bcw',
  authDomain: 'samh-notification.firebaseapp.com',
  projectId: 'samh-notification',
  storageBucket: 'samh-notification.appspot.com',
  messagingSenderId: '160385775189',
  appId: '1:160385775189:web:550582f0c4ed600b8806dc',
  measurementId: 'G-BNW0KTQ6PX',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Messaging service
export const messaging = getMessaging(app);