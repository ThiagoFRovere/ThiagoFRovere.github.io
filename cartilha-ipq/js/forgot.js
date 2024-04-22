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

// ------------------------- CHECK FORMULARIO FORGOT -----------------------------
let email = document.getElementById("recoveryPass");
let form = document.querySelector("form");

form.addEventListener("submit", (e) => {
    if (email.value == "") {
        empyt();
    }else 
        if (validatorEmail(email.value) === true){
            const emailValid = email.value;
            recovery(emailValid);
        }else{
            formatEmail();
        }
    e.preventDefault();
});

function recovery(emailValid){
    firebase.auth().sendPasswordResetEmail(emailValid)
    .then(responde=>{
        success();
        setTimeout(()=>{
           window.location.href = "../index.html"
        }, 4000) 
    }).catch(erro => {
        erroSearch();
    });
}

function validatorEmail(email) {
    let emailPattern = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    return emailPattern.test(email);
}

function erroSearch(){
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

function success(){
    $("#success").removeClass("success");
    setTimeout(()=>{
        $("#success").addClass("success");
    }, 3000)
}



