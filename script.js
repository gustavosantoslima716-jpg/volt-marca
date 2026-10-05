// Database of Products for VOLT
const products = [
    {
        id: 1,
        title: "Tênis VOLT Adizero Dropset Pro",
        subtitle: "Seja totalmente híbrido",
        category: "tenis",
        gender: "homem",
        price: 1199.99,
        installments: "em até 10x de R$ 119,99 sem juros",
        badge: "LANÇAMENTO",
        image: "assets/ref-1000043846-1.jpg",
        images: ["assets/ref-1000043846-1.jpg", "assets/ref-1000043847-2.jpg"],
        sizes: ["38", "39", "40", "41", "42", "43"],
        description: "O Adizero Dropset Pro redefine a versatilidade no treino. Entressola híbrida com amortecimento de alta resposta e estabilidade superior para levantamento de peso e corrida."
    },
    {
        id: 2,
        title: "Top & Short VOLT Performance Pink",
        subtitle: "Outfit completo de alta sustentação",
        category: "roupas",
        gender: "mulher",
        price: 449.99,
        installments: "em até 6x de R$ 74,99 sem juros",
        badge: "EXCLUSIVO",
        image: "assets/ref-1000043847-2.jpg",
        images: ["assets/ref-1000043847-2.jpg", "assets/ref-1000043846-1.jpg"],
        sizes: ["PP", "P", "M", "G"],
        description: "Conjunto desenvolvido com tecido tecnológico respirável, costuras reforçadas e elasticidade multidirecional para treinos intensos sem restrições."
    },
    {
        id: 3,
        title: "Camiseta VOLT Training Minimal",
        subtitle: "Leveza extrema para o dia a dia",
        category: "roupas",
        gender: "homem",
        price: 249.99,
        installments: "em até 4x de R$ 62,49 sem juros",
        badge: "DESTAQUE",
        image: "assets/ref-1000043848-3.jpg",
        images: ["assets/ref-1000043848-3.jpg", "assets/ref-1000043847-2.jpg"],
        sizes: ["P", "M", "G", "GG"],
        description: "Tecnologia AEROREADY que afasta o suor da pele, mantendo você seco e confortável do aquecimento ao descanso."
    },
    {
        id: 4,
        title: "Tênis VOLT Adios Pro 5 Carbon",
        subtitle: "Feito para quebrar recordes",
        category: "tenis",
        gender: "unissex",
        price: 2199.99,
        installments: "em até 10x de R$ 219,99 sem juros",
        badge: "PRO",
        image: "assets/ref-1000043849-4.jpg",
        images: ["assets/ref-1000043849-4.jpg", "assets/ref-1000043846-1.jpg"],
        sizes: ["37", "38", "39", "40", "41", "42", "43", "44"],
        description: "Equipado com hastes de carbono ENERGYRODS e amortecimento Lightstrike Pro duplo. O ápice da engenharia voltada para velocidade."
    },
    {
        id: 5,
        title: "Camisa Oficial VOLT Seleção Brasil I",
        subtitle: "Manto sagrado edição 2025/26",
        category: "roupas",
        gender: "unissex",
        price: 399.99,
        installments: "em até 5x de R$ 79,99 sem juros",
        badge: "OFICIAL",
        image: "assets/ref-1000043850-5.jpg",
        images: ["assets/ref-1000043850-5.jpg", "assets/ref-1000043848-3.jpg"],
        sizes: ["P", "M", "G", "GG", "XGG"],
        description: "Orgulho nacional em cada fibra. Tecido ultra leve com escudo bordado de alta definição e tecnologia de ventilação avançada."
    },
    {
        id: 6,
        title: "Tênis VOLT Campus 00s Urban",
        subtitle: "Estilo skate & streetwear",
        category: "tenis",
        gender: "unissex",
        price: 699.99,
        installments: "em até 8x de R$ 87,49 sem juros",
        badge: "CLASSIC",
        image: "assets/ref-1000043846-1.jpg",
        images: ["assets/ref-1000043846-1.jpg", "assets/ref-1000043849-4.jpg"],
        sizes: ["37", "38", "39", "40", "41", "42"],
        description: "Reedição dos clássicos dos anos 2000 com cabedal em camurça premium, língua acolchoada e sola de borracha aderente."
    },
    {
        id: 7,
        title: "Mochila VOLT Pro Training",
        subtitle: "Resistente à água e compartimento para notebook",
        category: "acessorios",
        gender: "unissex",
        price: 329.99,
        installments: "em até 5x de R$ 65,99 sem juros",
        badge: "NOVO",
        image: "assets/ref-1000043848-3.jpg",
        images: ["assets/ref-1000043848-3.jpg", "assets/ref-1000043850-5.jpg"],
        sizes: ["Único"],
        description: "Espaço inteligente para todo seu equipamento esportivo, bolso ventilado para calçados e tecido balístico de alta durabilidade."
    },
    {
        id: 8,
        title: "Boné VOLT Runner Cap",
        subtitle: "Proteção UV e secagem ultrarrápida",
        category: "acessorios",
        gender: "unissex",
        price: 129.99,
        installments: "em até 2x de R$ 64,99 sem juros",
        badge: "ESSENTIAL",
        image: "assets/ref-1000043847-2.jpg",
        images: ["assets/ref-1000043847-2.jpg", "assets/ref-1000043849-4.jpg"],
        sizes: ["Único"],
        description: "Leveza absoluta para corridas sob o sol. Faixa antitranspirante interna e regulagem traseira com fecho de contato."
    }
];

// State Management
let cart = JSON.parse(localStorage.getItem('volt_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('volt_wishlist')) || [];

// DOM Elements
const cartCountEl = document.getElementById('cart-count');
const wishlistCountEl = document.getElementById('wishlist-count');
const cartDrawer = document.getElementById('cartDrawer');
const mobileDrawer = document.getElementById('mobileDrawer');
const overlay = document.getElementById('overlay');
const searchModal = document.getElementById('searchModal');

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    updateBadges();
    initGlobalListeners();

    // Page Specific Inits
    if (document.getElementById('homeProductGrid')) {
        renderHomeProducts('all');
        initHomeFilters();
    }

    if (document.getElementById('catalogGrid')) {
        initCatalogPage();
    }

    if (document.getElementById('mainProductImg')) {
        initProductDetailPage();
    }
});

// Global Event Listeners
function initGlobalListeners() {
    // Cart Toggle
    document.querySelectorAll('.cart-toggle').forEach(btn => {
        btn.addEventListener('click', toggleCart);
    });
    document.querySelectorAll('.close-cart, .overlay').forEach(el => {
        el.addEventListener('click', () => {
            cartDrawer.classList.remove('active');
            mobileDrawer.classList.remove('active');
            searchModal.classList.remove('active');
            overlay.classList.remove('active');
        });
    });

    // Menu Toggle
    document.querySelectorAll('.menu-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            mobileDrawer.classList.add('active');
            overlay.classList.add('active');
        });
    });
    const closeDrawerBtn = document.querySelector('.close-drawer');
    if (closeDrawerBtn) {
        closeDrawerBtn.addEventListener('click', () => {
            mobileDrawer.classList.remove('active');
            overlay.classList.remove('active');
        });
    }

    // Search Toggle
    document.querySelectorAll('.search-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            searchModal.classList.add('active');
            document.getElementById('searchInput').focus();
        });
    });
    const closeSearchBtn = document.getElementById('closeSearch');
    if (closeSearchBtn) {
        closeSearchBtn.addEventListener('click', () => {
            searchModal.classList.remove('active');
        });
    }

    // Search Input Realtime
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            renderSearchResults(e.target.value);
        });
    }

    // Newsletter
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            document.getElementById('newsletterSuccess').style.display = 'block';
            newsletterForm.reset();
        });
    }

    // Checkout Btn
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Seu carrinho está vazio!');
                return;
            }
            alert('Redirecionando para o ambiente seguro de pagamento PIX/Cartão...');
            cart = [];
            saveCart();
            renderCartItems();
            updateBadges();
            cartDrawer.classList.remove('active');
            overlay.classList.remove('active');
        });
    }
}

// Badges & Persistence
function updateBadges() {
    const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCountEl) cartCountEl.textContent = totalCartItems;
    const drawerCountEl = document.getElementById('cartDrawerCount');
    if (drawerCountEl) drawerCountEl.textContent = totalCartItems;
    
    if (wishlistCountEl) wishlistCountEl.textContent = wishlist.length;

    localStorage.setItem('volt_cart', JSON.stringify(cart));
    localStorage.setItem('volt_wishlist', JSON.stringify(wishlist));
}

function saveCart() {
    localStorage.setItem('volt_cart', JSON.stringify(cart));
}

// Toggle Cart
function toggleCart() {
    cartDrawer.classList.toggle('active');
    overlay.classList.toggle('active');
    renderCartItems();
}

// Render Cart Items
function renderCartItems() {
    const container = document.getElementById('cartItemsContainer');
    const subtotalEl = document.getElementById('cartSubtotalPrice');
    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 40px 0;">Seu carrinho está vazio.</p>';
        if (subtotalEl) subtotalEl.textContent = 'R$ 0,00';
        return;
    } 

    let subtotal = 0;
    container.innerHTML = cart.map((item, index) => {
        subtotal += item.price * item.quantity;
        return `
            <div class="cart-item-card">
                <img src="${item.image}" alt="${item.title}" class="cart-item-img">
                <div class="cart-item-info">
                    <h5 class="cart-item-title">${item.title}</h5>
                    <p class="cart-item-meta">Tamanho: ${item.size} | R$ ${item.price.toFixed(2)}</p>
                    <div class="cart-item-controls">
                        <div class="qty-box">
                            <button class="qty-btn" onclick="changeQty(${index}, -1)">-</button>
                            <span class="qty-val">${item.quantity}</span>
                            <button class="qty-btn" onclick="changeQty(${index}, 1)">+</button>
                        </div>
                        <button class="remove-item" onclick="removeCartItem(${index})">Remover</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    if (subtotalEl) subtotalEl.textContent = `R$ ${subtotal.toFixed(2)}`;
}

window.changeQty = function(index, delta) {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    saveCart();
    renderCartItems();
    updateBadges();
};

window.removeCartItem = function(index) {
    cart.splice(index, 1);
    saveCart();
    renderCartItems();
    updateBadges();
};

// Wishlist toggle helper
window.toggleWishlist = function(id) {
    const index = wishlist.indexOf(id);
    if (index > -1) {
        wishlist.splice(index, 1);
    } else {
        wishlist.push(id);
    }
    updateBadges();
    // Re-render if on catalog or home
    if (document.getElementById('homeProductGrid')) renderHomeProducts(document.querySelector('.chip.active')?.dataset.filter || 'all');
    if (document.getElementById('catalogGrid')) applyCatalogFilters();
};

// Add to cart helper
window.quickAddToCart = function(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    const existing = cart.find(item => item.id === id && item.size === product.sizes[0]);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            size: product.sizes[0],
            quantity: 1
        });
    }
    updateBadges();
    toggleCart();
};

// Home Products Rendering
function renderHomeProducts(filter) {
    const grid = document.getElementById('homeProductGrid');
    if (!grid) return;

    let filtered = products;
    if (filter !== 'all') {
        filtered = products.filter(p => p.category === filter);
    }

    grid.innerHTML = filtered.slice(0, 8).map(p => {
        const isFav = wishlist.includes(p.id) ? 'active' : '';
        return `
            <div class="product-card">
                <div class="product-img-box">
                    <button class="fav-btn ${isFav}" onclick="toggleWishlist(${p.id})">♥</button>
                    <a href="product.html?id=${p.id}">
                        <img src="${p.image}" alt="${p.title}" loading="lazy">
                    </a>
                </div>
                <div class="product-details">
                    <span class="product-category">${p.category}</span>
                    <a href="product.html?id=${p.id}"><h3 class="product-title">${p.title}</h3></a>
                    <div class="product-footer">
                        <span class="product-price">R$ ${p.price.toFixed(2)}</span>
                        <button class="quick-add" onclick="quickAddToCart(${p.id})">+ Adicionar</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function initHomeFilters() {
    const chips = document.querySelectorAll('.chip');
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            renderHomeProducts(chip.dataset.filter);
        });
    });
}

// Catalog Page Logic
function initCatalogPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get('cat');

    if (catParam) {
        const chk = document.querySelector(`.filter-chk[value="${catParam}"]`);
        if (chk) chk.checked = true;
        const titleEl = document.getElementById('categoryTitle');
        if (titleEl) titleEl.textContent = catParam.toUpperCase();
    }

    document.querySelectorAll('.filter-chk, input[name="price"]').forEach(input => {
        input.addEventListener('change', applyCatalogFilters);
    });

    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', applyCatalogFilters);
    }

    applyCatalogFilters();
}

function applyCatalogFilters() {
    const grid = document.getElementById('catalogGrid');
    const countEl = document.getElementById('productCount');
    if (!grid) return;

    const selectedCats = Array.from(document.querySelectorAll('.filter-chk[name="cat"]:checked')).map(i => i.value);
    const selectedGens = Array.from(document.querySelectorAll('.filter-chk[name="gen"]:checked')).map(i => i.value);
    const priceRadio = document.querySelector('input[name="price"]:checked')?.value || 'all';
    const sortVal = document.getElementById('sortSelect')?.value || 'destaque';

    let result = products.filter(p => {
        if (selectedCats.length > 0 && !selectedCats.includes(p.category)) return false;
        if (selectedGens.length > 0 && !selectedGens.includes(p.gender) && p.gender !== 'unissex') return false;
        
        if (priceRadio === 'baixo' && p.price > 400) return false;
        if (priceRadio === 'medio' && (p.price <= 400 || p.price > 900)) return false;
        if (priceRadio === 'alto' && p.price <= 900) return false;

        return true;
    });

    // Sorting
    if (sortVal === 'menor-preco') result.sort((a,b) => a.price - b.price);
    if (sortVal === 'maior-preco') result.sort((a,b) => b.price - a.price);

    if (countEl) countEl.textContent = `Mostrando ${result.length} produtos`;

    if (result.length === 0) {
        grid.innerHTML = '<p style="color: var(--text-secondary); grid-column: 1/-1; text-align: center; padding: 60px 0;">Nenhum produto encontrado com estes filtros.</p>';
        return;
    }

    grid.innerHTML = result.map(p => {
        const isFav = wishlist.includes(p.id) ? 'active' : '';
        return `
            <div class="product-card">
                <div class="product-img-box">
                    <button class="fav-btn ${isFav}" onclick="toggleWishlist(${p.id})">♥</button>
                    <a href="product.html?id=${p.id}">
                        <img src="${p.image}" alt="${p.title}" loading="lazy">
                    </a>
                </div>
                <div class="product-details">
                    <span class="product-category">${p.category}</span>
                    <a href="product.html?id=${p.id}"><h3 class="product-title">${p.title}</h3></a>
                    <div class="product-footer">
                        <span class="product-price">R$ ${p.price.toFixed(2)}</span>
                        <button class="quick-add" onclick="quickAddToCart(${p.id})">+ Adicionar</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Product Detail Page Logic
function initProductDetailPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = parseInt(urlParams.get('id')) || 1;

    const product = products.find(p => p.id === idParam) || products[0];

    document.title = `${product.title} | VOLT®`;
    document.getElementById('prodTitle').textContent = product.title;
    document.getElementById('prodSub').textContent = product.subtitle;
    document.getElementById('prodPrice').textContent = `R$ ${product.price.toFixed(2)}`;
    document.getElementById('prodInstallments').textContent = product.installments;
    document.getElementById('prodBadge').textContent = product.badge;
    document.getElementById('prodFullDesc').textContent = product.description;
    document.getElementById('prodNameBread').textContent = product.title;
    
    const catLink = document.getElementById('prodCategoryLink');
    catLink.textContent = product.category.toUpperCase();
    catLink.href = `category.html?cat=${product.category}`;

    // Main image & gallery
    const mainImg = document.getElementById('mainProductImg');
    mainImg.src = product.image;

    const thumbList = document.getElementById('thumbnailList');
    thumbList.innerHTML = product.images.map((img, idx) => `
        <div class="thumb-box ${idx === 0 ? 'active' : ''}" onclick="changeMainImage('${img}', this)">
            <img src="${img}" alt="Thumbnail">
        </div>
    `).join('');

    // Size selector
    const sizeSelector = document.getElementById('sizeSelector');
    let selectedSize = product.sizes[0];
    sizeSelector.innerHTML = product.sizes.map((sz, idx) => `
        <button class="size-btn ${idx === 0 ? 'active' : ''}" onclick="selectSize('${sz}', this)">${sz}</button>
    `).join('');

    window.selectSize = function(sz, el) {
        selectedSize = sz;
        document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
        el.classList.add('active');
    };

    window.changeMainImage = function(imgSrc, el) {
        mainImg.src = imgSrc;
        document.querySelectorAll('.thumb-box').forEach(b => b.classList.remove('active'));
        el.classList.add('active');
    };

    // Add to Cart Button
    const addBtn = document.getElementById('addToCartBtn');
    addBtn.addEventListener('click', () => {
        const existing = cart.find(item => item.id === product.id && item.size === selectedSize);
        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                size: selectedSize,
                quantity: 1
            });
        }
        updateBadges();
        toggleCart();
    });

    // Wishlist Button in Product Page
    const wishBtn = document.getElementById('wishlistBtnProd');
    if (wishlist.includes(product.id)) wishBtn.classList.add('active');
    wishBtn.addEventListener('click', () => {
        toggleWishlist(product.id);
        wishBtn.classList.toggle('active');
    });
}

// Search autocomplete live results
function renderSearchResults(query) {
    const container = document.getElementById('searchResults');
    if (!container) return;

    if (!query.trim()) {
        container.innerHTML = '<p class="search-hint">Digite para buscar produtos instantaneamente...</p>';
        return;
    }

    const q = query.toLowerCase();
    const matches = products.filter(p => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));

    if (matches.length === 0) {
        container.innerHTML = `<p class="search-hint">Nenhum resultado encontrado para "${query}"</p>`;
        return;
    }

    container.innerHTML = matches.map(p => `
        <a href="product.html?id=${p.id}" class="cart-item-card" style="margin-bottom: 12px; display: flex;">
            <img src="${p.image}" alt="${p.title}" class="cart-item-img">
            <div class="cart-item-info">
                <h5 class="cart-item-title">${p.title}</h5>
                <p class="cart-item-meta">R$ ${p.price.toFixed(2)}</p>
            </div>
        </a>
    `).join('');
}