const img = document.getElementById("minhaImagem");
const modalteste = document.getElementById("modalteste");
const imgGrande = document.getElementById("imgGrande");
const fechar = document.querySelector(".fecharteste");

img.onclick = function () {
    modalteste.style.display = "block";
    imgGrande.src = this.src;
}

fechar.onclick = function () {
    modalteste.style.display = "none";
}


const img2 = document.getElementById("minhaImagem2");
const modalteste2 = document.getElementById("modalteste2");
const imgGrande2 = document.getElementById("imgGrande2");
const fechar2 = document.querySelector(".fecharteste2");

img2.onclick = function () {
    modalteste2.style.display = "block";
    imgGrande2.src = this.src;
}

fechar2.onclick = function () {
    modalteste2.style.display = "none";
}