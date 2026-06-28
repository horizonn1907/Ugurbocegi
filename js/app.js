// =========================================
// UĞUR BÖCEĞİ PRATİK EV ALETLERİ
// APP.JS
// =========================================

// Sayfa yüklendiğinde çalışır
document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
});

// ------------------------------
// Para Formatı
// ------------------------------
function formatPrice(price) {
    return Number(price).toLocaleString("tr-TR") + " ₺";
}

// Diğer dosyalarda kullanılabilmesi için
window.formatPrice = formatPrice;

// ------------------------------
// Bildirim Kutusu
// ------------------------------
function showToast(message) {

    const toast = document.createElement("div");

    toast.className = "toast";

    toast.innerText = message;

    toast.style.position = "fixed";
    toast.style.bottom = "20px";
    toast.style.right = "20px";
    toast.style.background = "#d40000";
    toast.style.color = "#fff";
    toast.style.padding = "15px 25px";
    toast.style.borderRadius = "10px";
    toast.style.boxShadow = "0 5px 15px rgba(0,0,0,.25)";
    toast.style.zIndex = "99999";

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 2500);

}

window.showToast = showToast;

// ------------------------------
// Sepet Sayısını Güncelle
// ------------------------------
function updateCartCount() {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    let total = 0;

    cart.forEach(item => {
        total += item.quantity;
    });

    const badge = document.getElementById("cartCount");

    if (badge) {
        badge.innerText = total;
    }

}

window.updateCartCount = updateCartCount;

// ------------------------------
// LocalStorage Yardımcıları
// ------------------------------
function getProducts() {
    return JSON.parse(localStorage.getItem("products")) || [];
}

function saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
}

window.getProducts = getProducts;
window.saveProducts = saveProducts;

// ------------------------------
// Rastgele ID Oluştur
// ------------------------------
function generateId() {
    return Date.now();
}

window.generateId = generateId;
