const firebaseConfig = {
    apiKey: "AIzaSyAIA8H1JjqOq6H6zBFr0JRy7OJ_RckfTXI",
    authDomain: "adm-estacionamento.firebaseapp.com",
    projectId: "adm-estacionamento",
    storageBucket: "adm-estacionamento.firebasestorage.app",
    messagingSenderId: "578692622807",
    appId: "1:578692622807:web:5b60cd782d3a27f3f08392",
    measurementId: "G-RGPMG575ZW"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

window.auth = auth;
window.db = db;
