document.getElementById("btn-sair").addEventListener("click", function () {

    firebase.auth().signOut()
        .then(() => {
            window.location.href = "../index.html";
        })
        .catch((error) => {
            console.error("Erro ao realizar logout:", error);
            alert("Erro ao realizar logout. Tente novamente.");
        });
});
