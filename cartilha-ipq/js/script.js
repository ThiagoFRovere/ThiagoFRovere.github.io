
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

// ------------------------- CHECK FORMULARIO LOGIN -----------------------------
let email = document.getElementById("sendEmail");
let password = document.getElementById("sendPassword");
let form = document.querySelector("form");

form.addEventListener("submit", (e) => {
    if (email.value == "" || password.value == "") {
        empyt();
    }else 
        if (validatorEmail(email.value) === true){
            const emailValid = email.value;
            const passwordValid = password.value;
            login(emailValid, passwordValid);
        }else{
            formatEmail();
        }
    e.preventDefault();
});

function login(emailValid, passwordValid){
    firebase.auth().signInWithEmailAndPassword(
        emailValid, passwordValid
        ).then(response=>{
            window.location.href = "./pages/home.html";
        }).catch(erro=>{
            invalidos();
        })
}

function validatorEmail(email) {
    let emailPattern = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    return emailPattern.test(email);
}

function empyt(){
    $("#erro1").removeClass("hide1");
    setTimeout(()=>{
        $("#erro1").addClass("hide1");
    }, 3000)
}

function formatEmail(){
    $("#erro2").removeClass("hide2");
    setTimeout(()=>{
        $("#erro2").addClass("hide2");
    }, 3000)
}

function invalidos(){
    $("#erro3").removeClass("hide3");
        setTimeout(()=>{
            $("#erro3").addClass("hide3");
        }, 3000)
}

function singUp(){
    window.location.href = "pages/register.html"
}

function recovery(){
    let emailValid = document.getElementById("recoveryPass");
    firebase.auth().sendPasswordResetEmail(emailValid).then(()=>{
            alert("email enviado com sucesso!!!");
        }).catch(erro => {
            alert(erro);
    });
}