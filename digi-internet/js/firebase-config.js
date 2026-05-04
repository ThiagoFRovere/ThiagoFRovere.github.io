export const firebaseConfig = {
    apiKey: "AIzaSyBP97Zos0L8OtMns6D1c4KimpRXEu2Itu0",
    authDomain: "digi-internet.firebaseapp.com",
    projectId: "digi-internet",
    storageBucket: "digi-internet.firebasestorage.app",
    messagingSenderId: "186314091344",
    appId: "1:186314091344:web:11db9a12f827455464da55"
};

export function isFirebaseConfigured() {
    return Object.values(firebaseConfig).every((value) => value && !String(value).startsWith("COLE_AQUI"));
}
