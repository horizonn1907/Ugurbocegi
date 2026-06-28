// ===========================
// ADMIN.JS
// ===========================

const ADMIN_PASSWORD = "123456";

// Para Formatı (fallback)
function formatPrice(price) {
    return Number(price).toLocaleString("tr-TR") + " ₺";
}

window.formatPrice = formatPrice;

function login() {
    const password = document.getElementById("password").value;

    if (password === "") {
        alert("Şifre alanını doldurun!");
        return;
    }

    if (password !== ADMIN_PASSWORD) {
        alert("Şifre yanlış!");
        return;
    }

    document.getElementById("panel").style.display = "block";
    document.getElementById("password").value = "";
    loadProducts();
}

window.login = login;

function loadProducts() {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const list = document.getElementById("adminProducts");
    list.innerHTML = "";

    if (products.length === 0) {
        list.innerHTML = "<p>Henüz ürün eklenmemiş.</p>";
        return;
    }

    products.forEach(product => {
        list.innerHTML += `
        <div class="product-card">
            <img src="${product.image}" onerror="this.src='https://via.placeholder.com/230'">
            <h3>${product.name}</h3>
            <p>${product.category}</p>
            <div class="price">
                ${formatPrice(product.price)}
            </div>
            <button onclick="deleteProduct(${product.id})">
                Sil
            </button>
        </div>
        `;
    });
}

function addProduct() {
    const name = document.getElementById("name").value.trim();
    const price = Number(document.getElementById("price").value);
    const category = document.getElementById("category").value.trim();
    const image = document.getElementById("image").value.trim();

    if (!name || !price || !category || !image) {
        alert("Tüm alanları doldurun.");
        return;
    }

    if (price <= 0) {
        alert("Fiyat 0'dan büyük olmalıdır.");
        return;
    }

    const products = JSON.parse(localStorage.getItem("products")) || [];

    products.push({
        id: Date.now(),
        name,
        price,
        category,
        image
    });

    localStorage.setItem("products", JSON.stringify(products));

    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    document.getElementById("category").value = "";
    document.getElementById("image").value = "";

    loadProducts();
    alert("Ürün başarıyla eklendi.");
}

window.addProduct = addProduct;

function deleteProduct(id) {
    if (!confirm("Bu ürünü silmek istediğinize emin misiniz?")) {
        return;
    }

    let products = JSON.parse(localStorage.getItem("products")) || [];
    products = products.filter(product => product.id !== id);
    localStorage.setItem("products", JSON.stringify(products));

    loadProducts();
    alert("Ürün silindi.");
}

window.deleteProduct = deleteProduct;
