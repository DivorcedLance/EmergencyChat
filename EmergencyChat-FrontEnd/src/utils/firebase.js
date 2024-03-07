import { initializeApp } from "firebase/app";
import {getMessaging } from "firebase/messaging"
 
const firebaseConfig = {
  apiKey: "AIzaSyD5nYbNOlbzknjvmqEAq_2yHN1mZ80LB5w",
  authDomain: "fir-notif-e0f99.firebaseapp.com",
  projectId: "fir-notif-e0f99",
  storageBucket: "fir-notif-e0f99.appspot.com",
  messagingSenderId: "692141702201",
  appId: "1:692141702201:web:bc192d35d869828522e1e8",
  measurementId: "G-QTRV6LPSGK"
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);