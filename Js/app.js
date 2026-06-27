// =======================================
// UĞUR BÖCEĞİ PRATİK EV ALETLERİ
// APP.JS
// =======================================

// Sayfa açıldığında çalışır
document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    smoothScroll();
});

// -----------------------------
// Sepet Sayısını Güncelle
// -----------------------------
function updateCartCount() {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const count = cart.reduce((total, item) => {
        return total + item.quantity;
    }, 0);

    const badge = document.getElementById("cartCount");

    if (badge) {
        badge.textContent = count;
    }

}

// -----------------------------
// Sayfalar arası yumuşak geçiş
// -----------------------------
function smoothScroll() {

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (target) {

                e.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth"
                });

            }

        });

    });

}

// -----------------------------
// Para formatı
// -----------------------------
window.formatPrice = function (price) {

    return Number(price).toLocaleString("tr-TR") + " ₺";

}

// -----------------------------
// Bildirim
// -----------------------------
window.showMessage = function (message) {

    const toast = document.createElement("div");

    toast.innerText = message;

    toast.style.position = "fixed";
    toast.style.bottom = "20px";
    toast.style.right = "20px";
    toast.style.background = "#d40000";
    toast.style.color = "#fff";
    toast.style.padding = "15px 25px";
    toast.style.borderRadius = "8px";
    toast.style.zIndex = "99999";
    toast.style.boxShadow = "0 8px 20px rgba(0,0,0,.25)";

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.remove();

    }, 2500);

}
