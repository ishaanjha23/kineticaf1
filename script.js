document.addEventListener('DOMContentLoaded', function() {
    // Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Shopping Cart Functionality
    const cartItems = [];
    const cartItemsElement = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');

    function updateCart() {
        if (!cartItemsElement || !cartTotalElement) return;

        cartItemsElement.innerHTML = cartItems.map(item => `
            <div class="cart-item">
                <span>${item.name}</span>
                <span>$${item.price.toFixed(2)}</span>
            </div>
        `).join('');

        const total = cartItems.reduce((sum, item) => sum + item.price, 0);
        cartTotalElement.textContent = `$${total.toFixed(2)}`;
    }

    // Add to Cart Button Handlers
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.product-card');
            const name = card.querySelector('h3').textContent;
            const price = parseFloat(card.querySelector('.price').textContent.replace('$', ''));

            cartItems.push({ name, price });
            updateCart();

            // Animation feedback
            this.textContent = 'Added!';
            setTimeout(() => {
                this.textContent = 'Add to Cart';
            }, 2000);
        });
    });

    // Pit Display Page Interactive Elements
    const positionInfo = document.getElementById('position-info');
    if (positionInfo) {
        const positions = [
            { id: 'front-jack', title: 'Front Jack', description: 'Responsible for lifting the front of the car' },
            { id: 'rear-jack', title: 'Rear Jack', description: 'Responsible for lifting the rear of the car' },
            // Add more positions as needed
        ];

        positions.forEach(pos => {
            const marker = document.createElement('div');
            marker.classList.add('position-marker');
            marker.dataset.position = pos.id;
            marker.addEventListener('click', () => {
                positionInfo.innerHTML = `
                    <h4>${pos.title}</h4>
                    <p>${pos.description}</p>
                `;
            });
        });
    }

    // Merchandise Page Filters
    const categoryFilter = document.getElementById('category-filter');
    const sortFilter = document.getElementById('sort-filter');
    const productGrid = document.querySelector('.product-grid');

    function filterProducts() {
        if (!categoryFilter || !sortFilter || !productGrid) return;

        const category = categoryFilter.value;
        const sortBy = sortFilter.value;
        const products = Array.from(productGrid.children);

        products.sort((a, b) => {
            const priceA = parseFloat(a.querySelector('.price').textContent.replace('$', ''));
            const priceB = parseFloat(b.querySelector('.price').textContent.replace('$', ''));
            
            if (sortBy === 'price-low') return priceA - priceB;
            if (sortBy === 'price-high') return priceB - priceA;
            return 0;
        });

        productGrid.innerHTML = '';
        products.forEach(product => productGrid.appendChild(product));
    }

    if (categoryFilter) categoryFilter.addEventListener('change', filterProducts);
    if (sortFilter) sortFilter.addEventListener('change', filterProducts);

    // Intersection Observer for Animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card, .gallery-item, .product-card').forEach(
        element => observer.observe(element)
    );
});