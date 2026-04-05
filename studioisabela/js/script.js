

// ============ MENU TOGGLE ============

const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    // Animar hamburger
    const spans = menuToggle.querySelectorAll('span');
    spans.forEach((span, index) => {
        if (navMenu.classList.contains('active')) {
            if (index === 0) {
                span.style.transform = 'rotate(45deg) translateY(10px)';
            } else if (index === 1) {
                span.style.opacity = '0';
            } else if (index === 2) {
                span.style.transform = 'rotate(-45deg) translateY(-10px)';
            }
        } else {
            span.style.transform = 'none';
            span.style.opacity = '1';
        }
    });
});

// Fechar menu ao clicar em um link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans.forEach(span => {
            span.style.transform = 'none';
            span.style.opacity = '1';
        });
    });
});


// ============ SCROLL REVEAL ANIMATION ============

// ============ SCROLL REVEAL (CORRIGIDO E OTIMIZADO) ============

document.addEventListener('DOMContentLoaded', () => {

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // TODOS elementos animados
    const elements = document.querySelectorAll(`
        .reveal,
        .service-card,
        .instructor-card,
        .testimonial-card,
        .feature-item,
        .sr1, .sr2, .sr3,
        .sr11, .sr111, .sr12, .sr122, .sr13, .sr133,
        .sr20, .sr21, .sr22,
        .srtop
    `);

    elements.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });

});


// 🔥 CORREÇÃO MOBILE (elementos já visíveis)
window.addEventListener('load', () => {
    document.querySelectorAll('.reveal').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            el.classList.add('active');
        }
    });
});

// ============ FORM SUBMISSION ============

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Obter valores do formulário
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const phone = contactForm.querySelector('input[type="tel"]').value;
        const message = contactForm.querySelector('textarea').value;

        // Simular envio
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;

        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;

        // Simular delay de envio
        setTimeout(() => {
            submitButton.textContent = 'Mensagem Enviada!';
            submitButton.style.background = '#27AE60';

            // Resetar formulário
            contactForm.reset();

            // Voltar ao estado original após 3 segundos
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.style.background = '';
                submitButton.disabled = false;
            }, 3000);
        }, 1500);

        console.log('Formulário enviado:', { name, email, phone, message });
    });
}

// ============ SMOOTH SCROLL PARA SEÇÕES ============

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============ PARALLAX EFFECT ============

let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            applyParallax();
            ticking = false;
        });
        ticking = true;
    }
});

function applyParallax() {
    const scrolled = window.pageYOffset;
    const heroImages = document.querySelectorAll('.hero-image img, .about-image img');

    heroImages.forEach(img => {
        const rect = img.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const yPos = scrolled * 0.5;
            img.style.transform = `translateY(${yPos * 0.1}px)`;
        }
    });
}

// ============ COUNTER ANIMATION ============

function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ============ ACTIVE NAV LINK ============

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const headerHeight = document.querySelector('.header').offsetHeight;

        if (pageYOffset >= sectionTop - headerHeight - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--primary-color)';
        } else {
            link.style.color = '';
        }
    });
});

// ============ HEADER SHADOW ON SCROLL ============

window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.pageYOffset > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
});

// ============ RIPPLE EFFECT NO BOTÃO ============

function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');

    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    button.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Adicionar efeito ripple aos botões
const buttons = document.querySelectorAll('.cta-button');
buttons.forEach(button => {
    button.addEventListener('click', createRipple);
});

// ============ LAZY LOADING IMAGES ============

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============ KEYBOARD NAVIGATION ============

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans.forEach(span => {
            span.style.transform = 'none';
            span.style.opacity = '1';
        });
    }
});

// ============ FOCUS VISIBLE ============

document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ============ UTILITY: ADD RIPPLE EFFECT CSS ============

const style = document.createElement('style');
style.textContent = `
    .cta-button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .keyboard-nav *:focus {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
    }
`;
document.head.appendChild(style);

// ============ PAGE LOAD ANIMATION ============

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Inicializar com opacidade 0
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease-in';

// ============ PREFERS REDUCED MOTION ============

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
    document.documentElement.style.scrollBehavior = 'auto';
}

// ============ CONSOLE LOG ============

console.log('%c🧘 Bem-vindo ao Estúdio de Pilates Moderno', 'font-size: 20px; color: #E8756B; font-weight: bold;');
console.log('%cDesign Philosophy: Minimalismo Elegante com Foco em Movimento', 'font-size: 14px; color: #2C3E50;');


// ============ INSTRUCTOR MODAL ============

// Dados dos instrutores com formações e certificações
const instructorsData = {
    1: {
        name: 'Dra. Isabela Passos',
        title: 'Mestre em Ciências do Movimento Humano',
        specialty: 'Especialista em Reabilitação',
        image: './img/perfil/isabela.jpeg',
        about: 'Isabela Passos é fisioterapeuta graduada e mestre em ciências do movimento humano  pela Universidade do Estado de Santa Catarina. Possui especialização em reabilitação neurofuncional e experiências clínica que integra atendimentos ambulatoriais e hospitalares. Seu conhecimento em biomecânica e métodos de reabilitação faz do seu atendimento em fisioterapia e pilates instrumentos de transformação nas vidas dos seus pacientes.',
        education: [
            'Graduação em fisioterapia pela universidade do Estado de Santa Catarina',
            'Mestre em Ciências do Movimento Humano pra Universidade do Estado de Santa Catarina',
            'Pós Graduada em Fisioterapia neurofuncional pela Faculdade Inspirar',
            'Pós graduada em Acupuntura para Faculdade Praktus'
        ],
        // certifications: [
        //     'Especialização no método Pilates Posturelle',
        //     'Especialização no método Pilates clínico Unicfisio',
        //     'Especialização em Terapia dos Meridianos pela faculdade Inspirar'
        // ],
        expertise: [
            'Especialização no método Pilates Posturelle',
            'Especialização no método Pilates clínico Unicfisio',
            'Especialização em Terapia dos Meridianos pela faculdade Inspirar'
        ]
    },
    2: {
        name: 'Dra. Ariany Prazeres Ferreira Nunes',
        title: 'Especialista em Fisioterapia Ortopédica',
        specialty: 'Fisioterapia Dermatofuncional com Injetáveis',
        image: './img/perfil/ariany.jpeg',
        about: 'Marina é especialista em pilates para gestantes e trabalho pós-parto. Com 6 anos de experiência, ela ajuda mulheres a manter a saúde e o bem-estar durante a gravidez e na recuperação pós-parto, com segurança e conforto.',
        education: [
            'Graduação em Fisioterapia pela Estácio',
            'Pós-graduação em Fisioterapia Ortopédica, com ênfase em Terapias Manuais, pela Anhanguera.',
            'Pós-graduação em Fisioterapia Dermatofuncional com Injetáveis pela Faculdade Nepuga.'
        ],
        // certifications: [
        //     'Certificação Pilates para Gestantes - FPPA (2017)',
        //     'Certificação em Saúde da Mulher - IBRAPE (2018)',
        //     'Certificação em Pós-parto - APTA (2019)',
        //     'Certificação em Pilates Avançado - STOTT (2020)'
        // ],
        expertise: [
            'Pilates',
            'Liberação miofascial',
            'Ventosaterapia',
            'Dry needling',
            'Kinesio taping'
        ]
    },
    3: {
        name: 'Felipe Ferreira Rôvere',
        title: 'Graduado em Administração',
        specialty: 'Administração de Empresas',
        image: './img/perfil/felipe.jpeg',
        about: 'Sócio e proprietário do estúdio Isabela Passos.',
        education: [
            'Graduado em Administração pela faculdade FEAN.'
        ],
        // certifications: [
        //     'Certificação Pilates para Gestantes - FPPA (2017)',
        //     'Certificação em Saúde da Mulher - IBRAPE (2018)',
        //     'Certificação em Pós-parto - APTA (2019)',
        //     'Certificação em Pilates Avançado - STOTT (2020)'
        // ],
        expertise: [
            'Especialização em gestão em saúde.'
        ]
    }
};

// Elementos do modal
const modal = document.getElementById('instructorModal');
const modalClose = document.getElementById('modalClose');
const modalOverlay = document.querySelector('.modal-overlay');
const instructorCards = document.querySelectorAll('.instructor-card');

// Função para abrir o modal
function openInstructorModal(instructorId) {
    const data = instructorsData[instructorId];

    if (!data) return;

    // Preencher dados do modal
    document.getElementById('modalImage').src = data.image;
    document.getElementById('modalImage').alt = data.name;
    document.getElementById('modalName').textContent = data.name;
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalSpecialty').textContent = data.specialty;
    document.getElementById('modalAbout').textContent = data.about;

    // Preencher formação acadêmica
    const educationList = document.getElementById('modalEducation');
    educationList.innerHTML = data.education.map(item => `<li>${item}</li>`).join('');

    // Preencher certificações
    // const certificationList = document.getElementById('modalCertifications');
    // certificationList.innerHTML = data.certifications.map(item => `<li>${item}</li>`).join('');

    // Preencher especialidades
    const expertiseList = document.getElementById('modalExpertise');
    expertiseList.innerHTML = data.expertise.map(item => `<li>${item}</li>`).join('');

    // Mostrar modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Função para fechar o modal
function closeInstructorModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Event listeners para abrir modal
instructorCards.forEach(card => {
    card.addEventListener('click', () => {
        const instructorId = card.getAttribute('data-instructor-id');
        openInstructorModal(instructorId);
    });
});

// Event listeners para fechar modal
modalClose.addEventListener('click', closeInstructorModal);

modalOverlay.addEventListener('click', closeInstructorModal);

// Fechar modal ao pressionar ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeInstructorModal();
    }
});

// Prevenir fechamento ao clicar no conteúdo do modal
document.querySelector('.modal-content').addEventListener('click', (e) => {
    e.stopPropagation();
});


// ============ TESTIMONIALS CAROUSEL ============

const testimonialsWrapper = document.getElementById('testimonialsWrapper');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const carouselDotsContainer = document.getElementById('carouselDots');

// Número total de depoimentos
const totalTestimonials = document.querySelectorAll('.testimonial-card').length;
let currentSlide = 0;

// Criar dots dinamicamente
function createDots() {
    for (let i = 0; i < totalTestimonials; i++) {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot';
        if (i === 0) dot.classList.add('active');
        dot.setAttribute('aria-label', `Ir para depoimento ${i + 1}`);
        dot.addEventListener('click', () => goToSlide(i));
        carouselDotsContainer.appendChild(dot);
    }
}

// Função para atualizar a posição do carrossel
function updateCarousel() {
    const offset = -currentSlide * 100;
    testimonialsWrapper.style.transform = `translateX(${offset}%)`;

    // Atualizar dots
    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
        if (index === currentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Função para ir para um slide específico
function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateCarousel();
}

// Função para próximo slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % totalTestimonials;
    updateCarousel();
}

// Função para slide anterior
function prevSlide() {
    currentSlide = (currentSlide - 1 + totalTestimonials) % totalTestimonials;
    updateCarousel();
}

// Event listeners para botões
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Inicializar dots
createDots();

// Auto-play (opcional - comentado por padrão)
 let autoPlayInterval = setInterval(nextSlide, 5000);

// Pausar auto-play ao hover (opcional)
 testimonialsWrapper.addEventListener('mouseenter', () => {
     clearInterval(autoPlayInterval);
 });

// Retomar auto-play ao sair do hover (opcional)
// testimonialsWrapper.addEventListener('mouseleave', () => {
//     autoPlayInterval = setInterval(nextSlide, 5000);
// });

// Suporte a teclado (setas)
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
});


// ============ SWIPER CAROUSEL ============
// ====================================================
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});


// whatsapp form submission
const leadForm = document.getElementById("leadForm");
const ctaSuccess = document.getElementById("ctaSuccess");

leadForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const nome = document.getElementById("nome").value.trim();
    const whatsapp = document.getElementById("whatsapp").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();

    let texto = "Olá! Tenho interesse em conhecer mais sobre o estúdio.%0A%0A";
    if (nome) texto += "*Nome:* " + encodeURIComponent(nome) + "%0A";
    if (whatsapp) texto += "*WhatsApp:* " + encodeURIComponent(whatsapp) + "%0A";
    if (mensagem) texto += "%0A*Mensagem:* " + encodeURIComponent(mensagem);

    // Troque pelo seu número com DDI/DDD, exemplo: 5548999999999
    const numeroWhatsApp = "48988219717";
    const url = "https://wa.me/" + 48988219717 + "?text=" + texto;

    window.open(url, "_blank");
    ctaSuccess.style.display = "block";
});


// --------------------------------------------------------------------------------

const sr = ScrollReveal({ 
    reset: true,
    viewFactor: 0.2, // 20% do elemento precisa aparecer
    mobile: true
});

sr.reveal('.sr1', {
    duration: 1000,
    origin: 'left',
    distance: '100px'
});

sr.reveal('.sr2', {
    duration: 1000,
    origin: 'top',
    distance: '100px',
    delay: 300
});

sr.reveal('.sr3', {
    duration: 1000,
    origin: 'right',
    distance: '100px',
    delay: 500
});

// sobre o estúdio
sr.reveal('.sr11', {
    duration: 1000,
    origin: 'left',
    distance: '600px'
});
sr.reveal('.sr111', {
    duration: 1000,
    origin: 'left',
    distance: '400px'
});
sr.reveal('.sr12', {
    duration: 1000,
    origin: 'left',
    distance: '800px'
});
sr.reveal('.sr122', {
    duration: 1000,
    origin: 'left',
    distance: '600px'
});
sr.reveal('.sr13', {
    duration: 1000,
    origin: 'left',
    distance: '1000px'
});
sr.reveal('.sr133', {
    duration: 1000,
    origin: 'left',
    distance: '800px'
});
sr.reveal('.sr20', {
    duration: 1000,
    origin: 'right',
    distance: '1000px',
    delay: 500
});
sr.reveal('.sr21', {
    duration: 1000,
    origin: 'right',
    distance: '1000px',
    delay: 500
});
sr.reveal('.sr22', {
    duration: 1000,
    origin: 'right',
    distance: '1000px',
    delay: 500
});
sr.reveal('.srtop', {
    duration: 1000,
    origin: 'top',
    distance: '1000px',
    delay: 500
});




// ScrollReveal().reveal('.anim-mail', {
//     origin: 'left',
//     distance: '50px',
//     duration: 1000,
//     delay: 300,
//     opacity: 0,
//     scale: 0.9,
//     easing: 'cubic-bezier(0.5, 0, 0, 1)',
//     reset: false
// });




function updateClock() {
    const now = new Date();

    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();

    const secDeg = seconds * 6;
    const minDeg = minutes * 6 + seconds * 0.1;
    const hourDeg = hours * 30 + minutes * 0.5;

    document.querySelector('.second').style.transform =
        `translateX(-50%) rotate(${secDeg}deg)`;

    document.querySelector('.minute').style.transform =
        `translateX(-50%) rotate(${minDeg}deg)`;

    document.querySelector('.hour').style.transform =
        `translateX(-50%) rotate(${hourDeg}deg)`;
}

setInterval(updateClock, 1000);
updateClock();



