// Add Product Function
function handleAddProduct(event) {
    event.preventDefault();
    
    const name = document.getElementById('productName').value.trim();
    const price = parseFloat(document.getElementById('productPrice').value);
    const image = document.getElementById('productImage').value.trim();
    const description = document.getElementById('productDescription').value.trim();
    const category = document.getElementById('productCategory').value;
    const stock = parseInt(document.getElementById('productStock').value) || 0;
    const discount = parseInt(document.getElementById('productDiscount').value) || 0;
    
    if (!name || !price || !image) {
        showToast('Lütfen zorunlu alanları doldurunuz!', 'error');
        return;
    }
    
    const product = {
        id: Date.now(),
        name,
        price,
        image,
        description,
        category,
        stock,
        discount,
        createdAt: new Date().toLocaleString('tr-TR')
    };
    
    const products = getProducts();
    products.push(product);
    saveProducts(products);
    
    // Reset form
    document.querySelector('.product-form').reset();
    document.getElementById('previewName').textContent = 'Ürün Adı';
    document.getElementById('previewPrice').textContent = '0₺';
    document.querySelector('.preview-image').innerHTML = '<p>Resim gösterilecek</p>';
    
    showToast('✅ Ürün başarıyla eklendi!');
    
    // Refresh product list if on that section
    if (document.getElementById('products-list').classList.contains('active')) {
        displayProducts();
    }
}

// Display all products
function displayProducts() {
    const products = getProducts();
    const tbody = document.getElementById('productsTableBody');
    
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    if (products.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 20px;">Henüz ürün eklenmemiştir.</td></tr>';
        return;
    }
    
    products.forEach(product => {
        const discountedPrice = product.discount ? (product.price * (100 - product.discount) / 100).toFixed(2) : product.price.toFixed(2);
        const row = `
            <tr>
                <td><img src="${product.image}" alt="${product.name}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 3px;"></td>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>${product.price.toFixed(2)}₺</td>
                <td>${product.stock}</td>
                <td>${product.discount}%</td>
                <td>
                    <button onclick="editProduct(${product.id})" class="btn btn-secondary" style="padding: 5px 10px; font-size: 12px;">✏️ Düzenle</button>
                    <button onclick="deleteProduct(${product.id})" class="btn btn-danger" style="padding: 5px 10px; font-size: 12px;">🗑️ Sil</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// Filter products
function filterProducts() {
    const searchTerm = document.getElementById('searchProducts').value.toLowerCase();
    const products = getProducts();
    const tbody = document.getElementById('productsTableBody');
    
    if (!tbody) return;
    
    const filtered = products.filter(p => p.name.toLowerCase().includes(searchTerm));
    tbody.innerHTML = '';
    
    if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 20px;">Sonuç bulunamadı.</td></tr>';
        return;
    }
    
    filtered.forEach(product => {
        const row = `
            <tr>
                <td><img src="${product.image}" alt="${product.name}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 3px;"></td>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>${product.price.toFixed(2)}₺</td>
                <td>${product.stock}</td>
                <td>${product.discount}%</td>
                <td>
                    <button onclick="editProduct(${product.id})" class="btn btn-secondary" style="padding: 5px 10px; font-size: 12px;">✏️ Düzenle</button>
                    <button onclick="deleteProduct(${product.id})" class="btn btn-danger" style="padding: 5px 10px; font-size: 12px;">🗑️ Sil</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// Edit product
function editProduct(productId) {
    const products = getProducts();
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    document.getElementById('editProductId').value = productId;
    document.getElementById('editProductName').value = product.name;
    document.getElementById('editProductPrice').value = product.price;
    document.getElementById('editProductImage').value = product.image;
    document.getElementById('editProductDescription').value = product.description;
    document.getElementById('editProductStock').value = product.stock;
    document.getElementById('editProductDiscount').value = product.discount;
    
    document.getElementById('editModal').classList.add('show');
}

// Handle edit product
function handleEditProduct(event) {
    event.preventDefault();
    
    const productId = parseInt(document.getElementById('editProductId').value);
    const products = getProducts();
    const productIndex = products.findIndex(p => p.id === productId);
    
    if (productIndex === -1) return;
    
    products[productIndex] = {
        ...products[productIndex],
        name: document.getElementById('editProductName').value,
        price: parseFloat(document.getElementById('editProductPrice').value),
        image: document.getElementById('editProductImage').value,
        description: document.getElementById('editProductDescription').value,
        stock: parseInt(document.getElementById('editProductStock').value),
        discount: parseInt(document.getElementById('editProductDiscount').value)
    };
    
    saveProducts(products);
    closeEditModal();
    displayProducts();
    showToast('✅ Ürün başarıyla güncellendi!');
}

// Delete product
function deleteProduct(productId) {
    if (confirm('Bu ürünü silmek istediğinize emin misiniz?')) {
        const products = getProducts();
        const filtered = products.filter(p => p.id !== productId);
        saveProducts(filtered);
        displayProducts();
        showToast('✅ Ürün silindi');
    }
}

// Close edit modal
function closeEditModal() {
    document.getElementById('editModal').classList.remove('show');
}

// Show/hide sections
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));
    
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(sectionId).classList.add('active');
    event.target.classList.add('active');
    
    if (sectionId === 'products-list') {
        displayProducts();
    }
}

// Save settings
function saveSettings() {
    const whatsappNumber = document.getElementById('whatsappNumber').value;
    const storeInfo = document.getElementById('storeInfo').value;
    
    if (!whatsappNumber) {
        showToast('WhatsApp numarası gereklidir!', 'error');
        return;
    }
    
    const settings = {
        whatsappNumber,
        storeInfo
    };
    
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    showToast('✅ Ayarlar kaydedildi!');
}

// Export data
function exportData() {
    const data = {
        products: getProducts(),
        settings: getSettings(),
        exportDate: new Date().toLocaleString('tr-TR')
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ugurbocegi_${new Date().toISOString()}.json`;
    link.click();
    
    showToast('✅ Veriler indirildi!');
}

// Clear all data
function clearAllData() {
    if (confirm('TÜM VERİLER SİLİNECEK! Devam etmek istediğinize emin misiniz?')) {
        localStorage.clear();
        initializeStorage();
        showToast('✅ Tüm veriler silindi!');
        location.reload();
    }
}

// Initialize admin page
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('productsTableBody')) {
        initializeStorage();
        
        const settings = getSettings();
        const whatsappNumberInput = document.getElementById('whatsappNumber');
        const storeInfoInput = document.getElementById('storeInfo');
        
        if (whatsappNumberInput) whatsappNumberInput.value = settings.whatsappNumber;
        if (storeInfoInput) storeInfoInput.value = settings.storeInfo;
    }
});
