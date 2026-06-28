```javascript
// ===========================
// ADMIN.JS
// ===========================

const ADMIN_PASSWORD = "123456";

function login() {

    const password = document.getElementById("password").value;

    if (password !== ADMIN_PASSWORD) {
        alert("Şifre yanlış!");
        return;
    }

    document.getElementById("panel").style.display = "block";
    loadProducts();
}

window.login = login;

function loadProducts() {

    const products = JSON.parse(localStorage.getItem("products")) || [];

    const list = document.getElementById("adminProducts");

    list.innerHTML = "";

    products.forEach(product => {

        list.innerHTML += `
        <div class="product-card">

            <img src="${product.image}">

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

    alert("Ürün eklendi.");
}

window.addProduct = addProduct;

function deleteProduct(id) {

    let products = JSON.parse(localStorage.getItem("products")) || [];

    products = products.filter(product => product.id !== id);

    localStorage.setItem("products", JSON.stringify(products));

    loadProducts();
}

window.deleteProduct = deleteProduct;
```
