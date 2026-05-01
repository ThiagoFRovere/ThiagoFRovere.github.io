document.addEventListener('DOMContentLoaded', () => {
    // Elementos do DOM
    const catalogGrid = document.getElementById('catalog-grid');
    const searchInput = document.getElementById('search-input');
    const categoryFilters = document.getElementById('category-filters');
    const sortSelect = document.getElementById('sort-select');
    const filterInStock = document.getElementById('filter-in-stock');
    const filterWholesale = document.getElementById('filter-wholesale');
    const clearFiltersBtn = document.getElementById('clear-filters');
    const resultsCount = document.getElementById('results-count');
    
    // Elementos do carrinho (reutilizados)
    const cartIcon = document.getElementById('cart-icon');
    const cartModal = document.getElementById('cart-modal');
    const closeCart = document.getElementById('close-cart');
    const overlay = document.getElementById('overlay');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalValue = document.getElementById('cart-total-value');
    const checkoutBtn = document.getElementById('checkout-btn');
    const cartCount = document.getElementById('cart-count');

    // Estado da aplicação
    let products = [];
    let cart = JSON.parse(localStorage.getItem('gaia_cart')) || [];
    let selectedCategories = new Set();
    let searchTerm = '';
    let inStockOnly = true;
    let wholesaleOnly = false;

    // Verificar parâmetros da URL
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');
    if (searchParam) {
        searchTerm = decodeURIComponent(searchParam);
    }

    // Carregar produtos do Supabase
    async function loadProducts() {
        try {
            // Busca os dados da tabela 'produtos' no Supabase
            const { data, error } = await supabaseClient
                .from('produtos')
                .select('*')
                .order('name', { ascending: true });

            if (error) throw error;

            products = data;
            renderCategoryFilters();
            renderCatalog();
            updateCartUI();
            
            // Preencher o campo de busca se houver parâmetro na URL
            if (searchTerm && searchInput) {
                searchInput.value = searchTerm;
            }
        } catch (error) {
            console.error('Erro ao carregar produtos:', error);
            catalogGrid.innerHTML = '<div class="no-results" style="grid-column: 1/-1;"><i class="fas fa-exclamation-circle"></i><p>Erro ao carregar produtos. Tente novamente mais tarde.</p></div>';
        }
    }

    // Renderizar filtros de categorias
    function renderCategoryFilters() {
        const categories = [...new Set(products.map(p => p.category))].sort();
        categoryFilters.innerHTML = categories.map(cat => `
            <div class="filter-option">
                <label>
                    <input type="checkbox" value="${cat}" class="category-checkbox">
                    <span>${cat}</span>
                </label>
            </div>
        `).join('');

        // Adicionar event listeners aos checkboxes de categoria
        document.querySelectorAll('.category-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                if (e.target.checked) {
                    selectedCategories.add(e.target.value);
                } else {
                    selectedCategories.delete(e.target.value);
                }
                renderCatalog();
            });
        });
    }

    // Filtrar produtos baseado nos critérios
    function getFilteredProducts() {
        return products.filter(product => {
            // Filtro de busca
            const matchesSearch = searchTerm === '' || 
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.category.toLowerCase().includes(searchTerm.toLowerCase());

            // Filtro de categoria
            const matchesCategory = selectedCategories.size === 0 || 
                selectedCategories.has(product.category);

            // Filtro de estoque
            const matchesStock = !inStockOnly || parseInt(product.stock) > 0;

            // Filtro de atacado
            const matchesWholesale = !wholesaleOnly || parseFloat(product.wholesale_price) > 0;

            return matchesSearch && matchesCategory && matchesStock && matchesWholesale;
        });
    }

    // Ordenar produtos
    function sortProducts(productsToSort) {
        const sortBy = sortSelect.value;
        const sorted = [...productsToSort];

        switch (sortBy) {
            case 'name':
                sorted.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'price-asc':
                sorted.sort((a, b) => parseFloat(a.retail_price) - parseFloat(b.retail_price));
                break;
            case 'price-desc':
                sorted.sort((a, b) => parseFloat(b.retail_price) - parseFloat(a.retail_price));
                break;
            case 'stock':
                sorted.sort((a, b) => parseInt(b.stock) - parseInt(a.stock));
                break;
            default:
                // Mantém a ordem padrão
                break;
        }

        return sorted;
    }

    // Renderizar catálogo
    function renderCatalog() {
        const filteredProducts = getFilteredProducts();
        const sortedProducts = sortProducts(filteredProducts);

        resultsCount.textContent = sortedProducts.length;

        if (sortedProducts.length === 0) {
            catalogGrid.innerHTML = `
                <div class="no-results" style="grid-column: 1/-1;">
                    <i class="fas fa-search"></i>
                    <h3>Nenhum produto encontrado</h3>
                    <p>Tente ajustar seus filtros ou termo de busca</p>
                </div>
            `;
            return;
        }

        catalogGrid.innerHTML = sortedProducts.map(product => `
            <div class="product-card">
                ${parseInt(product.stock) === 0 ? '<span class="badge" style="background-color: #ff4d4d;">ESGOTADO</span>' : '<span class="badge">DISPONÍVEL</span>'}
                <img src="${product.image}" alt="${product.name}">
                <h4>${product.name}</h4>
                <div class="product-info">
                    <p><strong>Categoria:</strong> ${product.category}</p>
                    <p><strong>Peso:</strong> ${product.weight}</p>
                    <p>${product.dimensions}</p>
                </div>
                <div class="product-price">
                    <span class="price-retail">Varejo: R$ ${parseFloat(product.retail_price).toFixed(2).replace('.', ',')}</span>
                    <span class="price-wholesale">Atacado: R$ ${parseFloat(product.wholesale_price).toFixed(2).replace('.', ',')}</span>
                    <span class="min-qty">mín. ${product.min_wholesale_quantity} un.</span>
                </div>
                <p style="font-size: 0.8em; color: ${parseInt(product.stock) > 0 ? 'var(--primary-green)' : 'red'}; margin-top: 5px; margin-bottom: 10px;">
                    Estoque: ${parseInt(product.stock) > 0 ? product.stock + ' disponíveis' : 'Esgotado'}
                </p>
                <button class="btn-add" onclick="addToCart('${product.id}')" ${parseInt(product.stock) === 0 ? 'disabled' : ''} style="${parseInt(product.stock) === 0 ? 'opacity: 0.5; cursor: not-allowed;' : ''}">
                    <i class="fas fa-shopping-cart"></i> Adicionar
                </button>
            </div>
        `).join('');
    }

    // Event listeners para filtros
    searchInput.addEventListener('input', (e) => {
        searchTerm = e.target.value;
        renderCatalog();
    });

    sortSelect.addEventListener('change', renderCatalog);

    filterInStock.addEventListener('change', (e) => {
        inStockOnly = e.target.checked;
        renderCatalog();
    });

    filterWholesale.addEventListener('change', (e) => {
        wholesaleOnly = e.target.checked;
        renderCatalog();
    });

    clearFiltersBtn.addEventListener('click', () => {
        searchInput.value = '';
        searchTerm = '';
        selectedCategories.clear();
        sortSelect.value = 'default';
        filterInStock.checked = true;
        filterWholesale.checked = false;
        inStockOnly = true;
        wholesaleOnly = false;

        // Desmarcar todos os checkboxes de categoria
        document.querySelectorAll('.category-checkbox').forEach(checkbox => {
            checkbox.checked = false;
        });

        renderCatalog();
    });

    // Lógica do Carrinho
    window.addToCart = (productId) => {
        // Converte o productId para número para bater com o int8 do Supabase
        const product = products.find(p => p.id == productId);
        if (!product || parseInt(product.stock) <= 0) {
            alert('Produto sem estoque!');
            return;
        }

        const existingItem = cart.find(item => item.id === productId);
        const currentQtyInCart = existingItem ? existingItem.quantity : 0;

        if (currentQtyInCart + 1 > parseInt(product.stock)) {
            alert('Quantidade máxima em estoque atingida!');
            return;
        }

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                retail_price: parseFloat(product.retail_price),
                wholesale_price: parseFloat(product.wholesale_price),
                min_wholesale: parseInt(product.min_wholesale_quantity),
                quantity: 1,
                image: product.image,
                max_stock: parseInt(product.stock)
            });
        }

        saveCart();
        updateCartUI();
        openCartModal();
    };

    // Atualizar UI do carrinho
    function updateCartUI() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        
        // Busca o elemento de contagem no DOM toda vez que a UI for atualizada
        const currentCartCount = document.getElementById('cart-count');
        if (currentCartCount) currentCartCount.textContent = totalItems;

        if (cartItemsContainer) {
            cartItemsContainer.innerHTML = '';
            let total = 0;

            cart.forEach((item, index) => {
                const itemPrice = item.quantity >= item.min_wholesale ? item.wholesale_price : item.retail_price;
                const subtotal = itemPrice * item.quantity;
                total += subtotal;

                const itemEl = document.createElement('div');
                itemEl.className = 'cart-item';
                itemEl.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 4px;">
                    <div class="cart-item-details">
                        <p style="font-weight: bold; font-size: 0.9em;">${item.name}</p>
                        <p style="font-size: 0.8em; color: var(--gray-text);">
                            ${item.quantity}x R$ ${itemPrice.toFixed(2).replace('.', ',')} 
                            ${item.quantity >= item.min_wholesale ? '<span style="color: var(--primary-green);">(Atacado)</span>' : ''}
                        </p>
                        <div style="display: flex; align-items: center; gap: 10px; margin-top: 5px;">
                            <button onclick="updateQty(${index}, -1)" style="border: 1px solid #ddd; background: none; width: 20px; cursor: pointer;">-</button>
                            <span>${item.quantity}</span>
                            <button onclick="updateQty(${index}, 1)" style="border: 1px solid #ddd; background: none; width: 20px; cursor: pointer;">+</button>
                            <i class="fas fa-trash" onclick="removeFromCart(${index})" style="margin-left: auto; color: #ff4d4d; cursor: pointer; font-size: 0.8em;"></i>
                        </div>
                    </div>
                `;
                cartItemsContainer.appendChild(itemEl);
            });

            if (cartTotalValue) cartTotalValue.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
        }
    }

    window.updateQty = (index, delta) => {
        const item = cart[index];
        if (delta > 0 && item.quantity + delta > item.max_stock) {
            alert('Quantidade máxima em estoque atingida!');
            return;
        }
        
        item.quantity += delta;
        if (item.quantity <= 0) {
            cart.splice(index, 1);
        }
        saveCart();
        updateCartUI();
    };

    window.removeFromCart = (index) => {
        cart.splice(index, 1);
        saveCart();
        updateCartUI();
    };

    function saveCart() {
        localStorage.setItem('gaia_cart', JSON.stringify(cart));
    }

    function openCartModal() {
        if (cartModal) cartModal.classList.add('active');
        if (overlay) overlay.classList.add('active');
    }

    function closeCartModal() {
        if (cartModal) cartModal.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
    }

    // Função para inicializar os eventos do header (carrinho e busca)
    function initHeaderEvents() {
        const cartIcon = document.getElementById('cart-icon');
        const cartCount = document.getElementById('cart-count');
        const searchIcon = document.getElementById('search-icon');

        if (cartIcon) {
            cartIcon.addEventListener('click', openCartModal);
        }
        
        if (searchIcon) {
            searchIcon.addEventListener('click', () => {
                window.location.href = 'catalogo.html';
            });
        }

        // Atualiza a contagem inicial
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartCount) cartCount.textContent = totalItems;
    }

    // Tenta inicializar imediatamente se o header já existir, ou aguarda o evento
    if (document.getElementById('cart-icon')) {
        initHeaderEvents();
    } else {
        document.addEventListener('headerLoaded', initHeaderEvents);
    }

    if (closeCart) closeCart.addEventListener('click', closeCartModal);
    if (overlay) overlay.addEventListener('click', closeCartModal);

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Seu carrinho está vazio!');
                return;
            }

            let message = "*NOVO PEDIDO - GAIA ARTESANATO*\n\n";
            let total = 0;

            cart.forEach(item => {
                const isWholesale = item.quantity >= item.min_wholesale;
                const itemPrice = isWholesale ? item.wholesale_price : item.retail_price;
                const subtotal = itemPrice * item.quantity;
                total += subtotal;

                message += `• ${item.quantity}x ${item.name}\n`;
                message += `  Preço: R$ ${itemPrice.toFixed(2).replace('.', ',')} ${isWholesale ? '(Atacado)' : '(Varejo)'}\n`;
                message += `  Subtotal: R$ ${subtotal.toFixed(2).replace('.', ',')}\n\n`;
            });

            message += `*TOTAL DO PEDIDO: R$ ${total.toFixed(2).replace('.', ',')}*\n\n`;
            message += "_Por favor, informe seu CEP para cálculo do frete._";

            const phone = "5548989845631";
            const whatsappURL = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
            
            window.open(whatsappURL, '_blank');
        });
    }

    loadProducts();

    // Funcionalidade de busca na barra de navegacao
    const searchIcon = document.getElementById('search-icon');
    if (searchIcon) {
        searchIcon.addEventListener('click', () => {
            window.location.href = 'catalogo.html';
        });
    }
});
