/****************** Inicializar o FireBase ***************************/

// const firebaseConfig = {
//     apiKey: "AIzaSyCWzs3mLHuB0ew20JF27M0iyBmgItfoIPA",
//     authDomain: "thiagofrovere-site.firebaseapp.com",
//     projectId: "thiagofrovere-site",
//     storageBucket: "thiagofrovere-site.appspot.com",
//     messagingSenderId: "757122351189",
//     appId: "1:757122351189:web:1f93a5656a60ddb76394dc",
//     measurementId: "G-5WN4K1TPZH"
//   };

// firebase.initializeApp(firebaseConfig);
// const auth = firebase.auth();
// const db = firebase.firestore();
// const newslatter = db.collection('thiagofrovere-site')

// /************* Script Check Formulario Newsletter ********************/

// function enviarFormulario(){
//   if ($("input")[0].value == "" || $("input")[1].value == ""){
//       // $("#erro").css({"display":"hide"});
//       $("#erro").removeClass("hide");
//       setTimeout(()=>{
//         $("#erro").addClass("hide");
//     }, 3000)
//   }else{
//     nameSet = form.nameFormulario.value;
//     emailSet = form.emailFormulario.value;
//   }
// }

// /************* Script Check Formulario Contato **********************/

// form.addEventListener('submit',(event)=>{
//   event.preventDefault();
//   let novoCadastro = {
//       nome: nameSet,
//       email: emailSet};
//   newslatter.add(novoCadastro).then((docRef)=>{
//     $("#sucess").removeClass("hide2");
//     setTimeout(()=>{
//         $("#sucess").addClass("hide2");
//     }, 3000)
//     setTimeout(()=>{
//       location.reload()
//     }, 5000)
    
//   }).catch((erro)=>{
//       console.log("erro: ", erro)
//   })

//   document.getElementById('nameFormulario').value = '' ;
//   document.getElementById('emailFormulario').value = '' ;
// })

// /************ hamburger button start script ***************/

// const hamburger = document.querySelector(".hamburger");
// const navMenu = document.querySelector("nav ul");

// hamburger.addEventListener("click",() =>{
//     hamburger.classList.toggle('active');
//     navMenu.classList.toggle('active');
// })
// navMenu.addEventListener("click",() =>{
//   hamburger.classList.toggle('active');
//   navMenu.classList.toggle('active');
// })

// /**************** Script Carrossel ************************/

// var swiper = new Swiper(".mySwiper", {
//   effect: "coverflow",
//   grabCursor: true,
//   centeredSlides: true,
//   slidesPerView: "auto",
//   coverflowEffect: {
//     rotate: 50,
//     stretch: 0,
//     depth: 100,
//     modifier: 1,
//     slideShadows: true,
//   },
//   pagination: {
//     el: ".swiper-pagination",
//   },
// });

// /**************** Script Dark Light **********************/

// var icon = document.getElementById("icon");
// var bg = document.getElementById("home")

// icon.onclick = function(){
//   document.body.classList.toggle("light-theme");
//   if(document.body.classList.contains("light-theme")){
//     icon.src = "./pictures/moon.png";
//     bg.style.cssText = 'background-image: url(../pictures/background1.png)';
    
//   }else{
//     icon.src = "./pictures/sun.png";
//     bg.style.cssText = 'background-image: url(../pictures/background2.jpg)';
//   }
// }

// /************** Script ScrollReveal **********************/

// window.sr = ScrollReveal({ reset: true});

// sr.reveal('.anim1', {
//     duration: 1000,
//     rotate: {x: 0, y: 100, z: 0},
//     delay: 200,
//     origin: 'left',
// });
// sr.reveal('.anim2', {
//   duration: 500,
//   delay: 600,
//   distance: '1500px',
//   origin: 'left',
// });
// sr.reveal('.anim3', {
//   duration: 500,
//   delay: 400,
//   distance: '1500px',
//   origin: 'left',
// });
// sr.reveal('.anim4', {
//   duration: 500,
//   delay: 600,
//   distance: '1500px',
//   origin: 'left',
// });
// sr.reveal('.anim5', {
//   duration: 500,
//   delay: 800,
//   distance: '1500px',
//   origin: 'left',
// });
// sr.reveal('.anim6', {
//   duration: 500,
//   delay: 1000,
//   distance: '1500px',
//   origin: 'left',
// });
// sr.reveal('.anim7', {
//   duration: 1200,
//   delay: 600,
//   distance: '1500px',
//   origin: 'left',
// });


 (function () {
            var progressBar = document.getElementById('scrollProgressBar');
            var spotlight = document.getElementById('cursorSpotlight');
            var heroVisual = document.getElementById('heroVisual');
            var tiltTargets = document.querySelectorAll('.interactive-card, .hero-copy, .hero-panel, .timeline-item, .metric-card, .focus-item, .section-card, .recruiter-note');
            var parallaxLayers = heroVisual ? heroVisual.querySelectorAll('.parallax-layer') : [];
            var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            function updateScrollProgress() {
                var scrollTop = window.scrollY || document.documentElement.scrollTop;
                var maxScroll = document.documentElement.scrollHeight - window.innerHeight;
                var progress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
                if (progressBar) progressBar.style.width = progress.toFixed(2) + '%';
            }

            updateScrollProgress();
            window.addEventListener('scroll', updateScrollProgress, { passive: true });
            window.addEventListener('resize', updateScrollProgress);

            if (!prefersReducedMotion && spotlight) {
                window.addEventListener('pointermove', function (event) {
                    spotlight.style.opacity = '1';
                    spotlight.style.left = event.clientX + 'px';
                    spotlight.style.top = event.clientY + 'px';
                }, { passive: true });

                window.addEventListener('pointerleave', function () {
                    spotlight.style.opacity = '0';
                });
            }

            if (prefersReducedMotion) return;

            tiltTargets.forEach(function (card) {
                card.addEventListener('mousemove', function (event) {
                    var rect = card.getBoundingClientRect();
                    var x = event.clientX - rect.left;
                    var y = event.clientY - rect.top;
                    var rotateY = ((x / rect.width) - 0.5) * 10;
                    var rotateX = (0.5 - (y / rect.height)) * 10;
                    card.style.transform = 'perspective(1100px) rotateX(' + rotateX.toFixed(2) + 'deg) rotateY(' + rotateY.toFixed(2) + 'deg) translateY(-6px)';
                    card.classList.add('is-active');
                });

                card.addEventListener('mouseleave', function () {
                    card.style.transform = '';
                    card.classList.remove('is-active');
                });
            });

            if (heroVisual && parallaxLayers.length) {
                heroVisual.addEventListener('mousemove', function (event) {
                    var rect = heroVisual.getBoundingClientRect();
                    var x = (event.clientX - rect.left) / rect.width - 0.5;
                    var y = (event.clientY - rect.top) / rect.height - 0.5;

                    parallaxLayers.forEach(function (layer) {
                        var depth = parseFloat(layer.getAttribute('data-depth') || '0');
                        var moveX = x * 38 * depth;
                        var moveY = y * 38 * depth;
                        layer.style.setProperty('--shift-x', moveX.toFixed(2) + 'px');
                        layer.style.setProperty('--shift-y', moveY.toFixed(2) + 'px');
                    });
                });

                heroVisual.addEventListener('mouseleave', function () {
                    parallaxLayers.forEach(function (layer) {
                        layer.style.setProperty('--shift-x', '0px');
                        layer.style.setProperty('--shift-y', '0px');
                    });
                });
            }
        })();

 const menuToggle = document.querySelector(".menu-toggle");
        const navWrap = document.querySelector(".nav-wrap");
        const navAnchors = document.querySelectorAll(".nav-links a");
        const whatsappForm = document.querySelector("#whatsappForm");

        if (menuToggle && navWrap) {
            menuToggle.addEventListener("click", () => {
                const expanded = menuToggle.getAttribute("aria-expanded") === "true";
                menuToggle.setAttribute("aria-expanded", String(!expanded));
                navWrap.classList.toggle("is-open");
                document.body.classList.toggle("menu-open");
            });

            navAnchors.forEach((anchor) => {
                anchor.addEventListener("click", () => {
                    menuToggle.setAttribute("aria-expanded", "false");
                    navWrap.classList.remove("is-open");
                    document.body.classList.remove("menu-open");
                });
            });
        }

        if (whatsappForm) {
            whatsappForm.addEventListener("submit", (event) => {
                event.preventDefault();

                const name = document.querySelector("#waName").value.trim();
                const subject = document.querySelector("#waSubject").value.trim();
                const message = document.querySelector("#waMessage").value.trim();
                const isEnglishPage = document.documentElement.lang.toLowerCase().startsWith("en");

                const text = isEnglishPage
                    ? [
                        "Hello, Thiago!",
                        "",
                        `My name is: ${name}`,
                        `Subject: ${subject}`,
                        "",
                        "Message:",
                        message
                    ].join("\n")
                    : [
                        "Olá, Thiago!",
                        "",
                        `Meu nome é: ${name}`,
                        `Assunto: ${subject}`,
                        "",
                        "Mensagem:",
                        message
                    ].join("\n");

                const url = `https://wa.me/5548991358913?text=${encodeURIComponent(text)}`;
                window.open(url, "_blank", "noopener,noreferrer");
            });
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.16
        });

        document.querySelectorAll(".reveal").forEach((element) => {
            observer.observe(element);
        });
