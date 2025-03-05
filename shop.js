// shop.js
document.addEventListener('DOMContentLoaded', () => {
    // Product data
    const products = [
        {
            id: 1,
            name: '2024 Team Cap',
            price: 34.99,
            category: 'accessories',
            image: 'https://via.placeholder.com/300',
            description: 'Official team cap with embroidered logo'
        },
        {
            id: 2,
            name: 'Race Team Polo',
            price: 69.99,
            category: 'clothing',
            image: 'https://via.placeholder.com/300',
            description: 'Premium cotton polo with team colors'
        },
        {
            id: 3,
            name: '1:18 Model Car',
            price: 149.99,
            category: 'collectibles',
            image: 'https://via.placeholder.com/300',
            description: 'Detailed replica of our 2024 challenger'
        }
        // Add more products as needed
    ];

    // Shopping Cart
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartSidebar = document.getElementById('cartSidebar');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const cartCount = document.querySelector('.cart-count');

    // Filter and Sort
    const categoryFilter = document.getElementById('categoryFilter');
    const sortFilter = document.getElementById('sortFilter');

    function updateProductsGrid() {
        const category = categoryFilter.value;
        const sortBy = sortFilter.value;
        
        let filteredProducts = category === 'all' 
            ? [...products]
            : products.filter(p => p.category === category);

        switch(sortBy) {
            case 'price-low':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            default:
                // Featured sort (default order)
                break;
        }

        const productsGrid = document.getElementById('productsGrid');
        productsGrid.innerHTML = filteredProducts.map(product => `
            <div class="product-card" data-id="${product.id}">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <span class="price">$${product.price.toFixed(2)}</span>
                <div class="product-actions">
                    <button class="quick-view-btn">Quick View</button>
                    <button class="add-to-cart-btn">Add to Cart</button>
                </div>
            </div>
        `).join('');

        // Add event listeners to new buttons
        attachProductEventListeners();
    }

    function attachProductEventListeners() {
        document.querySelectorAll('.quick-view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = parseInt(e.target.closest('.product-card').dataset.id);
                showQuickView(productId);
            });
        });

        document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = parseInt(e.target.closest('.product-card').dataset.id);
                addToCart(productId);
            });
        });
    }

    function showQuickView(productId) {
        const product = products.find(p => p.id === productId);
        const modal = document.getElementById('quickViewModal');
        const details = modal.querySelector('.product-details');
        
        details.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <span class="price">$${product.price.toFixed(2)}</span>
            <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
        `;

        modal.style.display = 'flex';
        
        // Add event listener to the new Add to Cart button
        details.querySelector('.add-to-cart-btn').addEventListener('click', () => {
            addToCart(productId);
            modal.style.display = 'none';
        });
    }

    function updateCart() {
        cartCount.textContent = cart.length;
        
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <span class="price">$${item.price.toFixed(2)}</span>
                </div>
                <button class="remove-item" data-id="${item.id}">&times;</button>
            </div>
        `).join('');

        const total = cart.reduce((sum, item) => sum + item.price, 0);
        cartTotal.textContent = `$${total.toFixed(2)}`;

        // Save cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                removeFromCart(id);
            });
        });
    }

    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        cart.push(product);
        updateCart();

        // Show confirmation animation
        const notification = document.createElement('div');
        notification.className = 'add-to-cart-notification';
        notification.textContent = 'Added to cart!';
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 2000);
    }

    function removeFromCart(productId) {
        const index = cart.findIndex(item => item.id === productId);
        if (index > -1) {
            cart.splice(index, 1);
            updateCart();
        }
    }

    // Event Listeners
    categoryFilter.addEventListener('change', updateProductsGrid);
    sortFilter.addEventListener('change', updateProductsGrid);

    document.querySelector('.cart-icon').addEventListener('click', () => {
        cartSidebar.classList.toggle('active');
    });

    document.querySelector('.close-cart').addEventListener('click', () => {
        cartSidebar.classList.remove('active');
    });

    document.querySelector('.close-modal').addEventListener('click', () => {
        document.getElementById('quickViewModal').style.display = 'none';
    });

    // Initialize
    updateProductsGrid();
    updateCart();
});