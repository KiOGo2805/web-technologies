let state = {
    products: [],
    currentFilter: "",
    currentSort: ""
};

const createProduct = (products, productData) => {
    const newProduct = {
        ...productData,
        id: "id_" + Date.now().toString(36),
        createdAt: Date.now(),
        updatedAt: Date.now()
    };
    return [...products, newProduct];
};

const updateProductInfo = (products, id, updatedData) => {
    return products.map(p => 
        p.id === id ? { ...p, ...updatedData, updatedAt: Date.now() } : p
    );
};

const deleteProductFromList = (products, id) => {
    return products.filter(p => p.id !== id);
};

const calculateTotal = (products) => {
    return products.reduce((sum, p) => sum + Number(p.price), 0);
};

const filterProducts = (products, category) => {
    if (!category) return products;
    return products.filter(p => p.category === category);
};

const sortProducts = (products, sortType) => {
    if (!sortType) return products;
    
    return [...products].sort((a, b) => {
        if (sortType === 'price') return a.price - b.price;
        if (sortType === 'createdAt') return b.createdAt - a.createdAt;
        if (sortType === 'updatedAt') return b.updatedAt - a.updatedAt;
        return 0;
    });
};

const elements = {
    list: document.getElementById('product-list'),
    emptyState: document.getElementById('empty-state'),
    totalPrice: document.getElementById('total-price'),
    modalOverlay: document.getElementById('modal-overlay'),
    form: document.getElementById('product-form'),
    snackbar: document.getElementById('snackbar'),
    modalTitle: document.getElementById('modal-title')
};

function renderUI() {
    const filtered = filterProducts(state.products, state.currentFilter);
    const processedProducts = sortProducts(filtered, state.currentSort);

    if (state.products.length === 0) {
        elements.emptyState.style.display = 'block';
        elements.list.innerHTML = '';
    } else {
        elements.emptyState.style.display = 'none';
        
        elements.list.innerHTML = processedProducts.map(p => `
            <li class="product-card" id="${p.id}">
                <img src="${p.image}" alt="${p.name}">
                <div class="product-info">
                    <span class="p-id">ID: ${p.id}</span>
                    <span class="p-cat">Категорія: ${p.category}</span>
                    <h3 class="p-name">${p.name}</h3>
                    <div class="p-price">${p.price} ₴</div>
                    <div class="card-actions">
                        <button class="secondary-btn" onclick="openEditModal('${p.id}')">Редагувати</button>
                        <button class="danger-btn" onclick="handleDelete('${p.id}', '${p.name}')">Видалити</button>
                    </div>
                </div>
            </li>
        `).join('');
    }

    elements.totalPrice.textContent = calculateTotal(state.products).toFixed(2);
}

function showSnackbar(message) {
    elements.snackbar.textContent = message;
    elements.snackbar.classList.add('show');
    setTimeout(() => { elements.snackbar.classList.remove('show'); }, 3000);
}

elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const id = document.getElementById('product-id').value;
    const productData = {
        name: document.getElementById('product-name').value,
        price: Number(document.getElementById('product-price').value),
        category: document.getElementById('product-category').value,
        image: document.getElementById('product-image').value
    };

    if (id) {
        state.products = updateProductInfo(state.products, id, productData);
        showSnackbar(`✅ Товар [${id}] "${productData.name}" успішно оновлено!`);
    } else {
        state.products = createProduct(state.products, productData);
        showSnackbar(`✅ Товар "${productData.name}" додано успішно!`);
    }

    closeModal();
    renderUI();
});

window.handleDelete = (id, name) => {
    const card = document.getElementById(id);
    card.classList.add('removing');
    
    setTimeout(() => {
        state.products = deleteProductFromList(state.products, id);
        renderUI();
        showSnackbar(`🗑️ Товар "${name}" успішно видалено!`);
    }, 400);
};

window.openEditModal = (id) => {
    const product = state.products.find(p => p.id === id);
    if (!product) return;

    elements.modalTitle.textContent = "Редагувати товар";
    document.getElementById('product-id').value = product.id;
    document.getElementById('product-name').value = product.name;
    document.getElementById('product-price').value = product.price;
    document.getElementById('product-category').value = product.category;
    document.getElementById('product-image').value = product.image;
    
    elements.modalOverlay.classList.remove('hidden');
};

document.getElementById('add-new-btn').addEventListener('click', () => {
    elements.modalTitle.textContent = "Додати новий товар";
    elements.form.reset();
    document.getElementById('product-id').value = "";
    elements.modalOverlay.classList.remove('hidden');
});

const closeModal = () => elements.modalOverlay.classList.add('hidden');
document.getElementById('cancel-btn').addEventListener('click', closeModal);

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        
        // Додаємо клас active ТІЛЬКИ якщо це НЕ кнопка скидання
        if (!e.target.classList.contains('reset-btn')) {
            e.target.classList.add('active');
        }
        
        state.currentFilter = e.target.dataset.category;
        renderUI();
    });
});

document.querySelectorAll('.sort-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
        
        // Додаємо клас active ТІЛЬКИ якщо це НЕ кнопка скидання
        if (!e.target.classList.contains('reset-btn')) {
            e.target.classList.add('active');
        }
        
        state.currentSort = e.target.dataset.sort;
        renderUI();
    });
});

renderUI();