let products = [];
const productsList = document.getElementById('products-list');
const productModal = document.getElementById('product-modal');
const productForm = document.getElementById('product-form');
const loading = document.getElementById('loading');

// Verificar autenticação
async function checkAuth() {
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (!session) {
        window.location.href = 'admin-login.html';
        return;
    }
    document.getElementById('user-email').textContent = session.user.email;
    loadProducts();
}

// Logout
document.getElementById('logout-btn').addEventListener('click', async () => {
    await supabaseClient.auth.signOut();
    window.location.href = 'admin-login.html';
});

// Carregar produtos
async function loadProducts() {
    showLoading(true);
    try {
        const { data, error } = await supabaseClient
            .from('produtos')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        products = data;
        renderProducts();
    } catch (error) {
        alert('Erro ao carregar produtos: ' + error.message);
    } finally {
        showLoading(false);
    }
}

function renderProducts() {
    productsList.innerHTML = products.map(p => `
                <tr>
                    <td><img src="${p.image}" class="product-img-thumb" alt="${p.name}"></td>
                    <td>${p.name}</td>
                    <td>${p.category}</td>
                    <td>R$ ${parseFloat(p.retail_price).toFixed(2)}</td>
                    <td>R$ ${parseFloat(p.wholesale_price).toFixed(2)}</td>
                    <td>${p.stock}</td>
                    <td class="actions-btns">
                        <i class="fas fa-edit btn-edit" onclick="editProduct('${p.id}')" title="Editar"></i>
                        <i class="fas fa-trash btn-delete" onclick="deleteProduct('${p.id}')" title="Excluir"></i>
                    </td>
                </tr>
            `).join('');
}

// Abrir modal para novo produto
document.getElementById('add-product-btn').addEventListener('click', () => {
    document.getElementById('modal-title').textContent = 'Novo Produto';
    productForm.reset();
    document.getElementById('product-id').value = '';
    productModal.style.display = 'block';
});

// Fechar modal
document.getElementById('close-modal').addEventListener('click', () => {
    productModal.style.display = 'none';
});

window.onclick = (event) => {
    if (event.target == productModal) {
        productModal.style.display = 'none';
    }
};

// Editar produto
window.editProduct = (id) => {
    try {
        // Compara usando == para ignorar se é string ou número (int8 no Supabase)
        const p = products.find(prod => prod.id == id);
        if (!p) {
            console.error('Produto não encontrado:', id);
            return;
        }

        document.getElementById('modal-title').textContent = 'Editar Produto';
        document.getElementById('product-id').value = p.id;
        document.getElementById('name').value = p.name || '';
        document.getElementById('category').value = p.category || '';
        document.getElementById('image').value = p.image || '';
        document.getElementById('retail_price').value = p.retail_price || 0;
        document.getElementById('wholesale_price').value = p.wholesale_price || 0;
        document.getElementById('min_wholesale_quantity').value = p.min_wholesale_quantity || 1;
        document.getElementById('stock').value = p.stock || 0;
        document.getElementById('weight').value = p.weight || '';
        document.getElementById('dimensions').value = p.dimensions || '';

        productModal.style.display = 'block';
    } catch (err) {
        console.error('Erro ao editar produto:', err);
        alert('Erro ao abrir formulário de edição');
    }
};

// Salvar (Criar ou Atualizar)
productForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    showLoading(true);

    const id = document.getElementById('product-id').value?.trim();

    // Validar dados obrigatórios
    const name = document.getElementById('name').value?.trim();
    const category = document.getElementById('category').value?.trim();
    const image = document.getElementById('image').value?.trim();
    const retail_price = parseFloat(document.getElementById('retail_price').value);
    const wholesale_price = parseFloat(document.getElementById('wholesale_price').value);

    if (!name || !category || !image || isNaN(retail_price) || isNaN(wholesale_price)) {
        alert('Por favor, preencha todos os campos obrigatórios corretamente.');
        showLoading(false);
        return;
    }

    const productData = {
        name: name,
        category: category,
        image: image,
        retail_price: retail_price,
        wholesale_price: wholesale_price,
        min_wholesale_quantity: parseInt(document.getElementById('min_wholesale_quantity').value) || 1,
        stock: parseInt(document.getElementById('stock').value) || 0,
        weight: document.getElementById('weight').value?.trim() || null,
        dimensions: document.getElementById('dimensions').value?.trim() || null
    };

    try {
        let result;
        if (id && id.length > 0) {
            // Update (editar produto existente)
            // Converte o ID para número para garantir compatibilidade com int8 do Supabase
            const numericId = parseInt(id);
            result = await supabaseClient
                .from('produtos')
                .update(productData)
                .eq('id', numericId);

            if (result.error) throw result.error;
            console.log('Produto atualizado:', numericId, productData);
            alert('Produto atualizado com sucesso!');
        } else {
            // Insert (novo produto)
            result = await supabaseClient
                .from('produtos')
                .insert([productData]);

            if (result.error) throw result.error;
            alert('Produto cadastrado com sucesso!');
        }

        productModal.style.display = 'none';
        productForm.reset();
        document.getElementById('product-id').value = '';
        loadProducts();
    } catch (error) {
        console.error('Erro ao salvar produto:', error);
        alert('Erro ao salvar produto: ' + (error.message || 'Erro desconhecido'));
    } finally {
        showLoading(false);
    }
});

// Excluir produto
window.deleteProduct = async (id) => {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return;

    showLoading(true);
    try {
        // Converte o ID para número para garantir compatibilidade com int8 do Supabase
        const numericId = parseInt(id);
        const result = await supabaseClient
            .from('produtos')
            .delete()
            .eq('id', numericId);

        if (result.error) throw result.error;
        alert('Produto excluído com sucesso!');
        loadProducts();
    } catch (error) {
        console.error('Erro ao excluir produto:', error);
        alert('Erro ao excluir produto: ' + (error.message || 'Erro desconhecido'));
    } finally {
        showLoading(false);
    }
};

function showLoading(show) {
    loading.style.display = show ? 'flex' : 'none';
}

checkAuth();