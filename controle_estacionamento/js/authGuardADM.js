const auth1 = app1.auth();

auth1.onAuthStateChanged((user) => {
    console.log("Estado do usuário:", user);
    if (!user) {
        console.log("Redirecionando para login...");
        window.location.href = "../index.html";
    } else {
        console.log("Usuário autenticado:", user.email);
    }
});