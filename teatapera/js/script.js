/********** hamburger button start script ************/
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector("nav ul");
hamburger.addEventListener("click",() =>{
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
})



const navLinks = document.querySelectorAll("nav ul li, nav ul li a");
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    });
});


// Funcionalidades da Intranet Hospitalar

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar a página
    renderNewsCards();
    renderQuickAccessIcons();
    setupNavigation();
    setupEventListeners();
    setupModalListeners();
});

/**
 * Renderizar cards de notícias (resumo na página inicial - máximo 6 itens)
 */
function renderNewsCards() {
    const newsGrid = document.getElementById('newsGrid');
    
    if (!newsGrid) return;
    
    newsGrid.innerHTML = '';
    
    // Inverter a ordem para mostrar os novos primeiro e pegar os 6 mais recentes
    const latestNews = [...newsData].slice(0, 6);
    
    latestNews.forEach(news => {
        const card = createNewsCard(news);
        newsGrid.appendChild(card);
    });
}

/**
 * Criar um card de notícia
 */
function createNewsCard(news) {
    const card = document.createElement('div');
    card.className = 'news-card';
    
    let cardHTML = '';
    
    // Imagem (se existir)
    if (news.image) {
        cardHTML += `
            <div class="news-card-image">
                <img src="${news.image}" alt="${news.title}">
            </div>
        `;
    }
    
    // Conteúdo
    const badgeClass = `badge-${news.category}`;
    const badgeText = getBadgeText(news.category);
    
    cardHTML += `
        <div class="news-card-content">
            <div class="news-card-header">
                <span class="news-badge ${badgeClass}">${badgeText}</span>
                <div class="news-date">
                    <i class="fas fa-calendar"></i>
                    <span>${news.date}</span>
                </div>
            </div>
            <h3 class="news-card-title">${news.title}</h3>
            <p class="news-card-excerpt">${news.excerpt}</p>
            <div class="news-card-footer">
                <button class="btn-read-more" onclick="handleReadMore(${news.id})">
                    Leia mais
                    <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
    `;
    
    card.innerHTML = cardHTML;
    return card;
}

/**
 * Obter texto do badge baseado na categoria
 */
function getBadgeText(category) {
    const badges = {
        'news': 'Notícia',
        'event': 'Evento',
        'alert': 'Aviso'
    };
    return badges[category] || 'Notícia';
}

/**
 * Configurar navegação
 */
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remover classe active de todos
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Adicionar classe active ao clicado
            this.classList.add('active');
            
            const section = this.getAttribute('data-section');
            handleNavigation(section);
        });
    });
}


function handleNavigation(section) {
    console.log('Navegando para:', section);

    switch(section) {
        case 'inicio':
            // Se NÃO estiver na index, redireciona
            if (!document.getElementById('newsGrid')) {
                window.location.href = './index.html';
            } else {
                renderNewsCards();
            }
            break;

        case 'noticias':
            if (!document.getElementById('newsGrid')) {
                window.location.href = './index.html';
            } else {
                filterNewsByCategory('news');
            }
            break;

        case 'eventos':
            if (!document.getElementById('newsGrid')) {
                window.location.href = './index.html';
            } else {
                filterNewsByCategory('event');
            }
            break;

        case 'avisos':
            if (!document.getElementById('newsGrid')) {
                window.location.href = './index.html';
            } else {
                filterNewsByCategory('alert');
            }
            break;
    }
}

/**
 * Filtrar notícias por categoria
 */
function filterNewsByCategory(category) {
    const newsGrid = document.getElementById('newsGrid');
    
    if (!newsGrid) return;
    
    newsGrid.innerHTML = '';
    
    // Inverter para mostrar os mais recentes primeiro
    const filtered = [...newsData].reverse().filter(news => news.category === category);
    
    if (filtered.length === 0) {
        newsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #6b7280; padding: 40px;">Nenhum item encontrado nesta categoria.</p>';
        return;
    }
    
    filtered.forEach(news => {
        const card = createNewsCard(news);
        newsGrid.appendChild(card);
    });
}

/**
 * Lidar com clique em "Leia mais"
 */
function handleReadMore(id) {
    const news = newsData.find(n => n.id === id);
    
    if (news) {
        openNewsModal(news);
    }
}

/**
 * Abrir modal com detalhes da notícia
 */
function openNewsModal(news) {
    const modal = document.getElementById('newsModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalExcerpt = document.getElementById('modalExcerpt');
    const modalDate = document.getElementById('modalDate');
    const modalBadge = document.getElementById('modalBadge');
    const modalDetails = document.getElementById('modalDetails');
    
    // Preencher dados da notícia
    modalTitle.textContent = news.title;
    modalExcerpt.textContent = news.excerpt;
    modalDate.textContent = news.date;
    
    // Definir imagem (se existir)
    if (news.image) {
        modalImage.src = news.image;
        modalImage.parentElement.style.display = 'flex';
    } else {
        modalImage.parentElement.style.display = 'none';
    }
    
    // Definir badge com classe correta
    const badgeClass = `badge-${news.category}`;
    const badgeText = getBadgeText(news.category);
    modalBadge.textContent = badgeText;
    modalBadge.className = `news-badge ${badgeClass}`;
    
    // Renderizar detalhes (se existirem)
    if (news.details && Object.keys(news.details).length > 0) {
        modalDetails.innerHTML = '';
        Object.entries(news.details).forEach(([label, value]) => {
            const detailItem = document.createElement('div');
            detailItem.className = 'modal-detail-item';
            detailItem.innerHTML = `
                <span class="modal-detail-label">${label}</span>
                <span class="modal-detail-value">${value}</span>
            `;
            modalDetails.appendChild(detailItem);
        });
        modalDetails.style.display = 'grid';
    } else {
        modalDetails.style.display = 'none';
    }
    
    // Mostrar modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevenir scroll
}

/**
 * Fechar modal
 */
function closeNewsModal() {
    const modal = document.getElementById('newsModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restaurar scroll
}

/**
 * Configurar listeners do modal
 */
function setupModalListeners() {
    const modal = document.getElementById('newsModal');
    const modalOverlay = document.querySelector('.modal-overlay');
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeNewsModal);
    }
    
    // Fechar modal com tecla ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeNewsModal();
        }
    });
}

/**
 * Configurar event listeners adicionais
 */
function setupEventListeners() {
    // Botão de confirmar presença no evento
    const btnConfirmar = document.querySelector('.btn-primary');
    
    if (btnConfirmar) {
        btnConfirmar.addEventListener('click', function(e) {
            if (!this.closest('.modal')) {
                alert('Presença confirmada! Você receberá um email de confirmação.');
            }
        });
    }
}

/**
 * Renderizar ícones de acesso rápido
 */
function renderQuickAccessIcons() {
    const iconsContainer = document.getElementById('iconsContainer');
    
    if (!iconsContainer) return;
    
    iconsContainer.innerHTML = '';
    
    quickAccessIcons.forEach(icon => {
        const iconCard = document.createElement('a');
        iconCard.href = icon.url;
        iconCard.className = 'icon-card';
        iconCard.title = icon.label;
        iconCard.target = "_blank"; // Abrir em nova aba
        iconCard.rel = "noopener noreferrer";
        
        // Verificar se é uma imagem ou ícone Font Awesome
        let iconHTML = '';
        if (icon.icon.includes('.') && (icon.icon.includes('/') || icon.icon.includes('.'))) {
            iconHTML = `<img src="${icon.icon}" alt="${icon.label}" class="icon-card-image">`;
        } else {
            iconHTML = `<i class="fas ${icon.icon}"></i>`;
        }
        
        iconCard.innerHTML = `
            <div class="icon-card-icon">
                ${iconHTML}
            </div>
            <div class="icon-card-label">${icon.label}</div>
        `;
        
        iconsContainer.appendChild(iconCard);
    });
}
