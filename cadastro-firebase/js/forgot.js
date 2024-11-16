const firebaseConfig = {
    apiKey: "AIzaSyB02e9Vtf9vYDehp89pYJ1IV0gyp3pt8h0",
    authDomain: "formulario-e539d.firebaseapp.com",
    projectId: "formulario-e539d",
    storageBucket: "formulario-e539d.appspot.com",
    messagingSenderId: "624814207902",
    appId: "1:624814207902:web:411399c0c88452c4f8dc8f",
    measurementId: "G-79DMRWSEJ8"
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



