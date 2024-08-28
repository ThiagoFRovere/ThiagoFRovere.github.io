


// ------------------------- CHECK FORMULARIO REGISTER -----------------------------
let email = document.getElementById("enterEmail");
let password = document.getElementById("enterPassword");
let confirmPassword = document.getElementById("confirmPassword");
let form = document.querySelector("form");

form.addEventListener("submit", (e) => {
    if (email.value == "" || password.value == ""|| confirmPassword.value == "") {
        empyt();
    }else 
        if (validatorEmail(email.value) === true){
            validatePassword();
        }else{
            formatEmail();
        }
    e.preventDefault();
});

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

function differentPassword(){
     $("#erro3").removeClass("hide3");
    setTimeout(()=>{
        $("#erro3").addClass("hide3");
    }, 3000)
}

function sizePassword(){
    $("#erro4").removeClass("hide4");
   setTimeout(()=>{
       $("#erro4").addClass("hide4");
   }, 3000)
}

function success(){
    $("#success").removeClass("success");
    setTimeout(()=>{
        $("#success").addClass("success");
    }, 3000)
}

function validatePassword(){
    if (password.value != confirmPassword.value){
        differentPassword();
    }else{
        const emailValid = email.value;
        const passwordValid = password.value;
        if(passwordValid.length<6){
            sizePassword();
        }else{
            register(emailValid, passwordValid);
            success();
            setTimeout(()=>{
                window.location.href = "../index.html"
            }, 4000)
        }   
    }
}

function register(emailVerificad, passwordVerificad){
    firebase.auth().createUserWithEmailAndPassword(
        emailVerificad, passwordVerificad
        ).then(()=>{
        console.log("cadastro com sucesso")
    }).catch(erro => {
        alert("erro",erro);
    })
}
