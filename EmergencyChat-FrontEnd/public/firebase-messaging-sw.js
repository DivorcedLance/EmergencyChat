importScripts("https://www.gstatic.com/firebasejs/9.8.4/firebase-app-compat.js")
importScripts("https://www.gstatic.com/firebasejs/9.8.4/firebase-messaging-compat.js")

const firebaseConfig = {
    apiKey: "AIzaSyD5nYbNOlbzknjvmqEAq_2yHN1mZ80LB5w",
    authDomain: "fir-notif-e0f99.firebaseapp.com",
    projectId: "fir-notif-e0f99",
    storageBucket: "fir-notif-e0f99.appspot.com",
    messagingSenderId: "692141702201",
    appId: "1:692141702201:web:bc192d35d869828522e1e8",
    measurementId: "G-QTRV6LPSGK"
};

const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging(app);

messaging.onBackgroundMessage(payload => {
    console.log("Recibiste mensaje mientras estabas ausente");
// previo a mostrar notificación
    const notificationTitle= payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: "/logo192.png"
    }

    return self.registration.showNotification(
        notificationTitle, 
        notificationOptions
    )
})