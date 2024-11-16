/****************** Inicializar o FireBase ***************************/

const firebaseConfig = {
    apiKey: "AIzaSyCWzs3mLHuB0ew20JF27M0iyBmgItfoIPA",
    authDomain: "thiagofrovere-site.firebaseapp.com",
    projectId: "thiagofrovere-site",
    storageBucket: "thiagofrovere-site.appspot.com",
    messagingSenderId: "757122351189",
    appId: "1:757122351189:web:1f93a5656a60ddb76394dc",
    measurementId: "G-5WN4K1TPZH"
  };

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const newslatter = db.collection('thiagofrovere-site')

/************* Script Check Formulario Newsletter ********************/

function enviarFormulario(){
  if ($("input")[0].value == "" || $("input")[1].value == ""){
      // $("#erro").css({"display":"hide"});
      $("#erro").removeClass("hide");
      setTimeout(()=>{
        $("#erro").addClass("hide");
    }, 3000)
  }else{
    nameSet = form.nameFormulario.value;
    emailSet = form.emailFormulario.value;
  }
}

/************* Script Check Formulario Contato **********************/

form.addEventListener('submit',(event)=>{
  event.preventDefault();
  let novoCadastro = {
      nome: nameSet,
      email: emailSet};
  newslatter.add(novoCadastro).then((docRef)=>{
    $("#sucess").removeClass("hide2");
    setTimeout(()=>{
        $("#sucess").addClass("hide2");
    }, 3000)
    setTimeout(()=>{
      location.reload()
    }, 5000)
    
  }).catch((erro)=>{
      console.log("erro: ", erro)
  })

  document.getElementById('nameFormulario').value = '' ;
  document.getElementById('emailFormulario').value = '' ;
})

/************ hamburger button start script ***************/

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector("nav ul");

hamburger.addEventListener("click",() =>{
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
})
navMenu.addEventListener("click",() =>{
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
})

/**************** Script Carrossel ************************/

var swiper = new Swiper(".mySwiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  pagination: {
    el: ".swiper-pagination",
  },
});

/**************** Script Dark Light **********************/

var icon = document.getElementById("icon");
var bg = document.getElementById("home")

icon.onclick = function(){
  document.body.classList.toggle("light-theme");
  if(document.body.classList.contains("light-theme")){
    icon.src = "./pictures/moon.png";
    bg.style.cssText = 'background-image: url(../pictures/background1.png)';
    
  }else{
    icon.src = "./pictures/sun.png";
    bg.style.cssText = 'background-image: url(../pictures/background2.jpg)';
  }
}

/************** Script ScrollReveal **********************/

window.sr = ScrollReveal({ reset: true});

sr.reveal('.anim1', {
    duration: 1000,
    rotate: {x: 0, y: 100, z: 0},
    delay: 200,
    origin: 'left',
});
sr.reveal('.anim2', {
  duration: 500,
  delay: 600,
  distance: '1500px',
  origin: 'left',
});
sr.reveal('.anim3', {
  duration: 500,
  delay: 400,
  distance: '1500px',
  origin: 'left',
});
sr.reveal('.anim4', {
  duration: 500,
  delay: 600,
  distance: '1500px',
  origin: 'left',
});
sr.reveal('.anim5', {
  duration: 500,
  delay: 800,
  distance: '1500px',
  origin: 'left',
});
sr.reveal('.anim6', {
  duration: 500,
  delay: 1000,
  distance: '1500px',
  origin: 'left',
});
sr.reveal('.anim7', {
  duration: 1200,
  delay: 600,
  distance: '1500px',
  origin: 'left',
});