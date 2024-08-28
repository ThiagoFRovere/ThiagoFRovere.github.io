/********** hamburger button start script ************/
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
/*****************************************************/

const observer = new IntersectionObserver(entries => {
    console.log(entries)
    Array.from(entries).forEach(entry => {
        if (entry.intersectionRatio >=1){
            entry.target.classList.add('init-hidden-off')
        }else{
            entry.target.classList.remove('init-hidden-off')
        }
    })
}, {
    threshold: [0, .5, 1]
})

Array.from(document.querySelectorAll('.init-hidden')).forEach( element => {
    observer.observe(element)
})

window.sr = ScrollReveal({ reset: true});

sr.reveal('.anim1', {
    duration: 1000,
    rotate: {x: 0, y: 100, z: 0},
    // interval: 200,
    // reset: true,
    //origin: buttom, left, right, top
    delay: 200,
    //distance: '1500px',
    origin: 'left',
});
sr.reveal('.anim2', {
    duration: 500,
    //rotate: {x: 0, y: 100, z: 0},
    // interval: 200,
    // reset: true,
    //origin: buttom, left, right, top
    delay: 600,
    distance: '1500px',
    origin: 'left',
});
sr.reveal('.anim3', {
    duration: 500,
    //rotate: {x: 0, y: 100, z: 0},
    // interval: 200,
    // reset: true,
    //origin: buttom, left, right, top
    delay: 600,
    distance: '1500px',
    origin: 'right',
});