document.addEventListener('DOMContentLoaded', () => {
    const wholesaleProductsGrid = document.getElementById('wholesale-products');
    
    // Elementos do carrinho (reutilizados)
    const cartIcon = document.getElementById('cart-icon');
    const cartModal = document.getElementById('cart-modal');
    const closeCart = document.getElementById('close-cart');
    const overlay = document.getElementById('overlay');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalValue = document.getElementById('cart-total-value');
    const checkoutBtn = document.getElementById('checkout-btn');
    const cartCount = document.getElementById('cart-count');

    let products = [];
    let cart = JSON.parse(localStorage.getItem('gaia_cart')) || [];

    async function loadProducts() {
        try {
            // Busca os dados da tabela 'produtos' no Supabase
            const { data, error } = await supabaseClient
                .from('produtos')
                .select('*')
                .order('name', { ascending: true });

            if (error) throw error;

            products = data;
            renderWholesaleProducts();
            updateCartUI();
        } catch (error) {
            console.error('Erro ao carregar produtos:', error);
            if (wholesaleProductsGrid) {
                wholesaleProductsGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 20px;"><p>Erro ao carregar produtos. Tente novamente mais tarde.</p></div>';
            }
        }
    }

    function renderWholesaleProducts() {
        if (!wholesaleProductsGrid) return;
        
        wholesaleProductsGrid.innerHTML = products.map(product => `
            <div class="product-card">
                <span class="badge" style="background-color: #3A4C1A;">PREÇO ATACADO</span>
                <img src="${product.image}" alt="${product.name}">
                <h4>${product.name}</h4>
                <div class="product-info">
                    <p>Peso: ${product.weight}</p>
                    <p>${product.dimensions}</p>
                </div>
                <div class="product-price">
                    <span class="price-retail" style="text-decoration: line-through; font-size: 0.8em; color: #999;">Varejo: R$ ${parseFloat(product.retail_price).toFixed(2).replace('.', ',')}</span>
                    <span class="price-wholesale" style="font-size: 1.2em; color: #3A4C1A;">Atacado: R$ ${parseFloat(product.wholesale_price).toFixed(2).replace('.', ',')}</span>
                    <span class="min-qty">mín. ${product.min_wholesale_quantity} un.</span>
                </div>
                <p style="font-size: 0.8em; color: ${product.stock > 0 ? 'var(--primary-green)' : 'red'}; margin-top: 5px;">
                    Estoque: ${product.stock > 0 ? product.stock + ' disponíveis' : 'Esgotado'}
                </p>
                <button class="btn-add" onclick="addWholesaleToCart('${product.id}')" style="background-color: #3A4C1A;">
                    <i class="fas fa-box"></i> Adicionar Mínimo (${product.min_wholesale_quantity} un.)
                </button>
            </div>
        `).join('');
    }

    // Função especial para adicionar a quantidade mínima de atacado
    window.addWholesaleToCart = (productId) => {
        // Converte o productId para número para bater com o int8 do Supabase
        const product = products.find(p => p.id == productId);
        if (!product || parseInt(product.stock) <= 0) {
            alert('Produto sem estoque!');
            return;
        }

        const minQty = parseInt(product.min_wholesale_quantity);
        if (minQty > parseInt(product.stock)) {
            alert('Quantidade mínima de atacado não disponível em estoque!');
            return;
        }

        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            // Se já existe, adicionamos o mínimo ou apenas incrementamos se já estiver acima do mínimo?
            // Para atacado, vamos garantir que ele tenha pelo menos o mínimo.
            if (existingItem.quantity < minQty) {
                existingItem.quantity = minQty;
            } else {
                existingItem.quantity += 1; // Incremento normal se já for atacado
            }
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                retail_price: parseFloat(product.retail_price),
                wholesale_price: parseFloat(product.wholesale_price),
                min_wholesale: minQty,
                quantity: minQty,
                image: product.image,
                max_stock: parseInt(product.stock)
            });
        }

        saveCart();
        updateCartUI();
        openCartModal();
    };

    // Reutilizando as funções de UI do carrinho
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
                            ${item.quantity >= item.min_wholesale ? '<span style="color: var(--primary-green); font-weight: bold;">(Atacado)</span>' : ''}
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

            let message = "*PEDIDO ATACADO/REVENDA - GAIA ARTESANATO*\n\n";
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
            message += "_Gostaria de solicitar o orçamento do frete para meu CNPJ/CPF._";

            const phone = "5548989845631";
            const whatsappURL = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
            
            window.open(whatsappURL, '_blank');
        });
    }

    loadProducts();
});
