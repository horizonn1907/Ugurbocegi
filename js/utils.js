// LocalStorage Management
const STORAGE_KEY = 'ugurbocegi_store';
const SETTINGS_KEY = 'ugurbocegi_settings';

// Initialize localStorage with default values
function initializeStorage() {
    if (!localStorage.getItem(STORAGE_KEY)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            products: [],
            cart: []
        }));
    }
    
    if (!localStorage.getItem(SETTINGS_KEY)) {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify({
            whatsappNumber: '905553947289',
            storeInfo: 'Kaliteli ürünler • Uygun fiyat • Güvenli alışveriş'
        }));
    }
}

// Get products from storage
function getProducts() {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return data ? data.products : [];
}

// Get cart from storage
function getCart() {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return data ? data.cart : [];
}

// Save products to storage
function saveProducts(products) {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    data.products = products;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Save cart to storage
function saveCart(cart) {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    data.cart = cart;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Get settings
function getSettings() {
    return JSON.parse(localStorage.getItem(SETTINGS_KEY));
}

// Save settings
function saveSettings(settings) {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

// Toast notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'toast show ' + type;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Update cart count
function updateCartCount() {
    const cart = getCart();
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeStorage();
    updateCartCount();
    
    // Preview image input
    const productImage = document.getElementById('productImage');
    if (productImage) {
        productImage.addEventListener('input', function() {
            const preview = document.getElementById('preview');
            if (preview) {
                const previewImg = preview.querySelector('.preview-image');
                previewImg.innerHTML = `<img src="${this.value}" alt="Ürün" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22%3E%3Crect fill=%22%23ddd%22 width=%22200%22 height=%22200%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23999%22%3EResim Yüklenemedi%3C/text%3E%3C/svg%3E'">`;
            }
        });
    }
    
    // Preview name input
    const productName = document.getElementById('productName');
    if (productName) {
        productName.addEventListener('input', function() {
            const previewName = document.getElementById('previewName');
            if (previewName) {
                previewName.textContent = this.value || 'Ürün Adı';
            }
        });
    }
    
    // Preview price input
    const productPrice = document.getElementById('productPrice');
    if (productPrice) {
        productPrice.addEventListener('input', function() {
            const previewPrice = document.getElementById('previewPrice');
            if (previewPrice) {
                previewPrice.textContent = (this.value ? this.value + '₺' : '0₺');
            }
        });
    }
});
