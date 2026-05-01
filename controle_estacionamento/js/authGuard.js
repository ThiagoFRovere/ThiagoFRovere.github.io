const auth = firebase.auth();

auth.onAuthStateChanged((user) => {
    console.log("Estado do usuário:", user);
    if (!user) {
        console.log("Redirecionando para login...");
        window.location.href = "../index.html";
    } else {
        console.log("Usuário autenticado:", user.email);
    }
});



