/* ==========================================
   UĞUR BÖCEĞİ PRATİK EV ALETLERİ
   ADMIN.JS
========================================== */

/* Yönetici Şifresi
   Daha sonra Firebase Authentication kullanılacak.
*/
const ADMIN_PASSWORD = "Ugurbocegi2026";

/* HTML Elemanları */
const loginPage = document.getElementById("loginPage");
const dashboard = document.getElementById("dashboard");
const loginButton = document.getElementById("loginButton");
const passwordInput = document.getElementById("adminPassword");
const loginError = document.getElementById("loginError");
const logoutButton = document.getElementById("logout");

const productForm = document.getElementById("productForm");
const productTable = document.getElementById("productTable");
const productCount = document.getElementById("productCount");

/* Ürünleri LocalStorage'dan Oku */
let products = JSON.parse(localStorage.getItem("products")) || [];

/* ==========================================
   GİRİŞ
========================================== */

loginButton.addEventListener("click", login);

passwordInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        login();
    }
});

function login() {

    if (passwordInput.value === ADMIN_PASSWORD) {

        loginPage.style.display = "none";
        dashboard.style.display = "flex";

        renderProducts();

    } else {

        loginError.innerHTML = "❌ Şifre yanlış.";
        passwordInput.value = "";
        passwordInput.focus();

    }

}

/* ==========================================
   ÇIKIŞ
========================================== */

logoutButton.addEventListener("click", () => {

    if (confirm("Yönetim panelinden çıkılsın mı?")) {

        dashboard.style.display = "none";
        loginPage.style.display = "flex";

        passwordInput.value = "";

    }

});

/* ==========================================
   KAYDET
========================================== */

function saveProducts() {

    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );

}
/* ==========================================
   ÜRÜN EKLE
========================================== */

productForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const name = document.getElementById("productName").value.trim();
    const price = Number(document.getElementById("productPrice").value);
    const category = document.getElementById("productCategory").value.trim();
    const image = document.getElementById("productImage").value.trim();
    const description = document.getElementById("productDescription").value.trim();

    const product = {

        id: Date.now(),

        name,

        price,

        category,

        image,

        description,

        stock: true

    };

    products.push(product);

    saveProducts();

    renderProducts();

    productForm.reset();

    alert("✅ Ürün başarıyla eklendi.");

});

/* ==========================================
   ÜRÜNLERİ TABLOYA YAZDIR
========================================== */

function renderProducts() {

    productTable.innerHTML = "";

    products.forEach((product) => {

        productTable.innerHTML += `

<tr>

<td>

<img
src="${product.image || 'images/no-image.png'}"
width="60"
height="60"
style="object-fit:cover;border-radius:8px;">

</td>

<td>

${product.name}

</td>

<td>

${product.category}

</td>

<td>

${product.price.toLocaleString("tr-TR")} ₺

</td>

<td>

<button
onclick="editProduct(${product.id})">

✏️

</button>

<button
onclick="deleteProduct(${product.id})">

🗑️

</button>

</td>

</tr>

`;

    });

    productCount.textContent = products.length;

}

/* ==========================================
   ÜRÜN SİL
========================================== */

function deleteProduct(id) {

    const answer = confirm("Bu ürün silinsin mi?");

    if (!answer) return;

    products = products.filter(product => product.id !== id);

    saveProducts();

    renderProducts();

}

/* ==========================================
   ÜRÜN DÜZENLE (İLK SÜRÜM)
========================================== */

function editProduct(id) {

    const product = products.find(item => item.id === id);

    if (!product) return;

    document.getElementById("productName").value = product.name;
    document.getElementById("productPrice").value = product.price;
    document.getElementById("productCategory").value = product.category;
    document.getElementById("productImage").value = product.image;
    document.getElementById("productDescription").value = product.description;

    products = products.filter(item => item.id !== id);

    saveProducts();

    renderProducts();

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}
