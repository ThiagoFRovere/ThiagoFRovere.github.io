let popUp = document.getElementById("cookiePopup");

//Quando o usuário clica no botão Fechar

document.getElementById("dontAcceptCookie").addEventListener("click", () => {
    //Hide the popup
    popUp.classList.add("hide");
    popUp.classList.remove("show");
  });


//Verifica se o cookie já está presente
const checkCookie = () => {
  //Leia o cookie e divida em "="
  let input = document.cookie.split("=");
  //Verifique nosso cookie
  if (input[0] == "https://thiagofrovere.github.io/siteIPQ/index.html") {
    //Oculta o pop-up
    popUp.classList.add("hide");
    popUp.classList.remove("show");
  } else {
    //Mostrar o pop-up
    popUp.classList.add("show");
    popUp.classList.remove("hide");
  }
};

//Verifique se o cookie existe quando a página é carregada
window.onload = () => {
  setTimeout(() => {
    checkCookie();
  }, 2000);
};



//busca o elemento a ser comparado e adiciona ele numa variavel
let politica = document.getElementById("ckeckPolitica");

//busca o item a ser clickado e adiciona o envento de click
document.getElementById("btnCheckPolitica").addEventListener("click", () => {
    politica.classList.toggle('showPolitica');
    politica.classList.remove("hidePolitica");
    //compara o click e dispara a ação na classe que esta no css
  });
  

  function ReloadForcado( ) {
    location.reload();
    }