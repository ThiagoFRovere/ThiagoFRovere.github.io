const firebaseConfig = {
    apiKey: "AIzaSyDO4uGqIeG1HDQSWUCe0MPjSjHdn5dqEKc",
    authDomain: "cartilha-8704a.firebaseapp.com",
    projectId: "cartilha-8704a",
    storageBucket: "cartilha-8704a.appspot.com",
    messagingSenderId: "579869099325",
    appId: "1:579869099325:web:1dcf646189211ed54d7154",
    measurementId: "G-3LGBZMJ3MJ"
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const newslatter = db.collection('thiagofrovere-site')