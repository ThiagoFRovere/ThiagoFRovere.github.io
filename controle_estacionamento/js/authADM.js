firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log('Usuário está logado:', user.email);
    } else {
        console.log('Nenhum usuário logado');
    }
});

const loginUser = async (email, password) => {
    try {
        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
        return userCredential.user;
    } catch (error) {
        console.error("Erro ao fazer login: ", error);
        throw error;
    }
};

const logoutUser = () => {
    return firebase.auth().signOut();
};


window.loginUser = loginUser;
window.logoutUser = logoutUser;