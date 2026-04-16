function loadHeader(file) {
  const placeholders = ["header", "header-placeholder"];
  let target = null;
  
  for (const id of placeholders) {
    const el = document.getElementById(id);
    if (el) {
      target = el;
      break;
    }
  }

  if (!target) return;

  fetch(file)
    .then(res => {
      if (!res.ok) throw new Error('Falha ao carregar header');
      return res.text();
    })
    .then(data => {
      target.innerHTML = data;
      setupMobileMenu();
      // Dispara um evento customizado para avisar que o header foi carregado
      document.dispatchEvent(new CustomEvent('headerLoaded'));
    })
    .catch(err => console.error(err));
}

function setupMobileMenu() {
  const menuToggle = document.getElementById('mobile-menu');
  const navList = document.getElementById('nav-list');

  if (menuToggle && navList) {
    menuToggle.addEventListener('click', () => {
      navList.classList.toggle('active');
      
      // Opcional: Mudar o ícone de bars para times (X)
      const icon = menuToggle.querySelector('i');
      if (icon.classList.contains('fa-bars')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });

    // Fechar o menu ao clicar em um link
    const navLinks = navList.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navList.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      });
    });
  }
}

loadHeader("hf/header.html");
