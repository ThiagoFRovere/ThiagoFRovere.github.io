const addDocument = async (collectionName, data) => {
    try {
        const docRef = await db.collection(collectionName).add(data);
        console.log("Document written with ID: ", docRef.id);
        return docRef;
    } catch (e) {
        console.error("Error adding document: ", e);
        throw e;
    }
};
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form");
    const loginEmail = document.getElementById("sendEmail");
    const loginPassword = document.getElementById("sendPassword");

    if (form && loginEmail && loginPassword) {

        form.addEventListener("submit", (e) => {
            e.preventDefault(); 

            if (loginEmail.value.trim() === "" || loginPassword.value.trim() === "") {
                empyt();
            } else if (validatorEmail(loginEmail.value)) {
                const emailValid = loginEmail.value;
                const passwordValid = loginPassword.value;
                login(emailValid, passwordValid);
            } else {
                formatEmail();
            }
        });
    } else {
        console.error("Form, loginEmail, ou loginPassword não encontrados no DOM.");
    }
});

function validatorEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}

function login(emailValid, passwordValid) {
    firebase.auth().signInWithEmailAndPassword(emailValid, passwordValid)
        .then(() => {
            window.location.href = "../pages/tabelaVeiculosADM.html";
        })
        .catch(() => {
            invalidos();
        });
}

function empyt() {
    const erro1 = document.getElementById("erro1");
    if (erro1) {
        erro1.classList.remove("hide1");
        setTimeout(() => {
            erro1.classList.add("hide1");
        }, 3000);
    }
}

function formatEmail() {
    const erro2 = document.getElementById("erro2");
    if (erro2) {
        erro2.classList.remove("hide2");
        setTimeout(() => {
            erro2.classList.add("hide2");
        }, 3000);
    }
}

function invalidos() {
    const erro3 = document.getElementById("erro3");
    if (erro3) {
        erro3.classList.remove("hide3");
        setTimeout(() => {
            erro3.classList.add("hide3");
        }, 3000);
    }
}

function administrador(){
    window.location.href = "../pages/tabelaVeiculosADM.html"
}

function singUp(){
    window.location.href = "../pages/tabelaVeiculosADM.html"
}

function recovery(){
    let emailValid = document.getElementById("recoveryPass");
    firebase.auth().sendPasswordResetEmail(emailValid).then(()=>{
            alert("email enviado com sucesso!!!");
        }).catch(erro => {
            alert(erro);
    });
}

firebase.firestore().settings({
    host: "localhost:8080",
    ssl: false,
});

