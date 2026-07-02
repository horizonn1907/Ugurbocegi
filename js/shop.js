// Add to cart
function addToCart(productId) {
    const products = getProducts();
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        showToast('Ürün bulunamadı!', 'error');
        return;
    }
    
    const cart = getCart();
    const cartItem = cart.find(item => item.id === productId);
    
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    saveCart(cart);
    updateCartCount();
    showToast(`✅ ${product.name} sepete eklendi!`);
}

// Remove from cart
function removeFromCart(productId) {
    const cart = getCart();
    const filtered = cart.filter(item => item.id !== productId);
    saveCart(filtered);
    updateCartDisplay();
    updateCartCount();
    showToast('✅ Ürün sepetten çıkarıldı');
}

// Toggle cart modal
function toggleCart() {
    const modal = document.getElementById('cartModal');
    if (!modal) return;
    
    modal.classList.toggle('show');
    if (modal.classList.contains('show')) {
        updateCartDisplay();
    }
}

// Update cart display
function updateCartDisplay() {
    const cart = getCart();
    const cartItems = document.getElementById('cartItems');
    
    if (!cartItems) return;
    
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; padding: 20px; color: #999;">Sepetiniz boş</p>';
        return;
    }
    
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const itemHTML = `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>Fiyat: ${item.price.toFixed(2)}₺ × ${item.quantity}</p>
                </div>
                <div style="text-align: right;">
                    <div class="cart-item-price">${itemTotal.toFixed(2)}₺</div>
                    <button onclick="removeFromCart(${item.id})" class="cart-item-remove">Sil</button>
                </div>
            </div>
        `;
        
        cartItems.innerHTML += itemHTML;
    });
    
    const totalPrice = document.getElementById('totalPrice');
    if (totalPrice) {
        totalPrice.textContent = total.toFixed(2) + '₺';
    }
}

// Order via WhatsApp
function orderViaWhatsApp() {
    const cart = getCart();
    
    if (cart.length === 0) {
        showToast('Sepetiniz boş!', 'error');
        return;
    }
    
    const settings = getSettings();
    let message = '*🛍️ Ugurbocegi - Sipariş Formu*\n\n';
    message += '*Ürünler:*\n';
    
    let total = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        message += `• ${item.name}\n`;
        message += `  Fiyat: ${item.price.toFixed(2)}₺ × ${item.quantity} = ${itemTotal.toFixed(2)}₺\n`;
    });
    
    message += `\n*Toplam: ${total.toFixed(2)}₺*\n\n`;
    message += 'Lütfen onay için WhatsApp ile iletişime geçiniz.';
    
    const phoneNumber = settings.whatsappNumber.replace(/\D/g, '');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    
    // Clear cart after sending
    clearCart();
}

// Clear cart
function clearCart() {
    saveCart([]);
    updateCartDisplay();
    updateCartCount();
    toggleCart();
    showToast('✅ Sepet temizlendi!');
}

// Display products on main page
function displayProductsOnPage() {
    const products = getProducts();
    const productsGrid = document.getElementById('productsGrid');
    
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';
    
    if (products.length === 0) {
        productsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: #999;">Henüz ürün eklenmemiştir.</p>';
        return;
    }
    
    products.forEach(product => {
        const discountedPrice = product.discount ? 
            (product.price * (100 - product.discount) / 100).toFixed(2) : 
            null;
        
        const productHTML = `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22200%22%3E%3Crect fill=%22%23ddd%22 width=%22300%22 height=%22200%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23999%22%3EResim Yüklenemedi%3C/text%3E%3C/svg%3E'">
                <div class="product-info">
                    <h4>${product.name}</h4>
                    <p style="font-size: 12px; color: #999;">${product.category}</p>
                    ${product.description ? `<p style="font-size: 13px; color: #666; margin: 8px 0;">${product.description}</p>` : ''}
                    <div class="product-price">
                        ${discountedPrice ? `
                            <span style="text-decoration: line-through; color: #999; font-size: 14px; font-weight: normal;">
                                ${product.price.toFixed(2)}₺
                            </span><br>
                            ${discountedPrice}₺
                            <span style="background: var(--danger-color); color: white; padding: 2px 6px; border-radius: 3px; font-size: 12px; margin-left: 5px;">
                                -%${product.discount}
                            </span>
                        ` : `${product.price.toFixed(2)}₺`}
                    </div>
                    ${product.stock > 0 ? `
                        <button onclick="addToCart(${product.id})" class="btn btn-primary" style="width: 100%; margin-top: 10px;">
                            🛒 Sepete Ekle
                        </button>
                    ` : `
                        <div style="background: #f0f0f0; padding: 10px; text-align: center; color: #999; border-radius: 5px; margin-top: 10px; font-weight: 600;">
                            Stokta Yok
                        </div>
                    `}
                </div>
            </div>
        `;
        
        productsGrid.innerHTML += productHTML;
    });
}

// Initialize shop page
document.addEventListener('DOMContentLoaded', function() {
    initializeStorage();
    displayProductsOnPage();
    
    // Close cart modal when clicking outside
    const cartModal = document.getElementById('cartModal');
    if (cartModal) {
        window.addEventListener('click', function(event) {
            if (event.target === cartModal) {
                cartModal.classList.remove('show');
            }
        });
    }
});
