const firebaseConfigUser = {
    apiKey: "AIzaSyCB_7o5RPNTzVVBi-EV3miuDAPy_Tssk4Q",
    authDomain: "estacionamento-1ce5f.firebaseapp.com",
    projectId: "estacionamento-1ce5f",
    storageBucket: "estacionamento-1ce5f.firebasestorage.app",
    messagingSenderId: "591387024509",
    appId: "1:591387024509:web:76030e9341aa46698f2514",
    measurementId: "G-WWBBEX5C0X"
};


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfigUser);
} else {
  firebase.app();
}

const authUser = firebase.auth();
const dbUser = firebase.firestore();
















