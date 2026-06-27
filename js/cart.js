/* ==========================================
   UĞUR BÖCEĞİ PRATİK EV ALETLERİ
   CART.JS
========================================== */

const table = document.getElementById("cartTable");
const subTotal = document.getElementById("subTotal");
const grandTotal = document.getElementById("grandTotal");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ==========================
   KAYDET
========================== */

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

/* ==========================
   PARA FORMATI
========================== */

function formatPrice(price) {
    return Number(price).toLocaleString("tr-TR") + " ₺";
}

/* ==========================
   SEPETİ GÖSTER
========================== */

function renderCart() {

    table.innerHTML = "";

    if (cart.length === 0) {

        table.innerHTML = `
        <tr>
            <td colspan="5" style="text-align:center;padding:40px;">
                🛒 Sepetiniz boş.
            </td>
        </tr>
        `;

        subTotal.textContent = "0 ₺";
        grandTotal.textContent = "0 ₺";

        return;
    }

    let total = 0;

    cart.forEach((product, index) => {

        const row = document.createElement("tr");

        const rowTotal = product.price * product.quantity;

        total += rowTotal;

        row.innerHTML = `

        <td>

            <strong>${product.name}</strong>

        </td>

        <td>

            ${formatPrice(product.price)}

        </td>

        <td>

            <button onclick="decrease(${index})">

            -

            </button>

            <span style="margin:0 10px">

            ${product.quantity}

            </span>

            <button onclick="increase(${index})">

            +

            </button>

        </td>

        <td>

            ${formatPrice(rowTotal)}

        </td>

        <td>

            <button onclick="removeItem(${index})">

            ❌

            </button>

        </td>

        `;

        table.appendChild(row);

    });

    subTotal.textContent = formatPrice(total);

    grandTotal.textContent = formatPrice(total);

}

renderCart();
/* ==========================
   ÜRÜN ADET ARTIR
========================== */

function increase(index){

    cart[index].quantity++;

    saveCart();

    renderCart();

}

/* ==========================
   ÜRÜN ADET AZALT
========================== */

function decrease(index){

    if(cart[index].quantity>1){

        cart[index].quantity--;

    }else{

        if(confirm("Bu ürünü sepetten kaldırmak istiyor musunuz?")){

            cart.splice(index,1);

        }

    }

    saveCart();

    renderCart();

}

/* ==========================
   ÜRÜN SİL
========================== */

function removeItem(index){

    if(confirm("Ürün sepetten silinsin mi?")){

        cart.splice(index,1);

        saveCart();

        renderCart();

    }

}

/* ==========================
   SEPETİ TEMİZLE
========================== */

function clearCart(){

    if(confirm("Sepetin tamamını silmek istiyor musunuz?")){

        cart=[];

        saveCart();

        renderCart();

    }

}

/* ==========================
   TOPLAM TUTAR
========================== */

function getTotal(){

    let total=0;

    cart.forEach(item=>{

        total += item.price * item.quantity;

    });

    return total;

}

/* ==========================
   ÜRÜN EKLE
========================== */

function addProduct(product){

    const existing=cart.find(item=>item.id===product.id);

    if(existing){

        existing.quantity++;

    }else{

        cart.push({

            id:product.id,

            name:product.name,

            price:product.price,

            quantity:1

        });

    }

    saveCart();

    renderCart();

}

/* ==========================
   SEPET SAYISI
========================== */

function cartCount(){

    return cart.reduce((sum,item)=>sum+item.quantity,0);

}

console.log("Sepet güncellendi.");
/* ==========================================
   WHATSAPP SİPARİŞ SİSTEMİ
========================================== */

const sendButton = document.getElementById("sendWhatsapp");

if (sendButton) {

    sendButton.addEventListener("click", sendOrder);

}

function sendOrder() {

    if (cart.length === 0) {

        alert("Sepetiniz boş.");

        return;

    }

    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const address = document.getElementById("customerAddress").value.trim();
    const note = document.getElementById("customerNote").value.trim();

    if (name === "" || phone === "" || address === "") {

        alert("Lütfen Ad Soyad, Telefon ve Adres bilgilerini doldurun.");

        return;

    }

    let message = "🛒 *UĞUR BÖCEĞİ PRATİK EV ALETLERİ*%0A%0A";

    message += "📋 *Yeni Sipariş*%0A%0A";

    message += "👤 Ad Soyad: " + name + "%0A";
    message += "📞 Telefon: " + phone + "%0A";
    message += "📍 Adres: " + address + "%0A";

    if (note !== "") {

        message += "📝 Not: " + note + "%0A";

    }

    message += "%0A";

    message += "🛍️ *Sipariş Detayları*%0A";

    let total = 0;

    cart.forEach((item, index) => {

        const rowTotal = item.price * item.quantity;

        total += rowTotal;

        message +=
            (index + 1) +
            ". " +
            item.name +
            "%0A";

        message +=
            "Adet: " +
            item.quantity +
            "%0A";

        message +=
            "Fiyat: " +
            formatPrice(item.price) +
            "%0A";

        message +=
            "Toplam: " +
            formatPrice(rowTotal) +
            "%0A%0A";

    });

    message += "💰 *Genel Toplam:* " + formatPrice(total);

    const whatsapp =
        "https://wa.me/905553947288?text=" + message;

    window.open(whatsapp, "_blank");

}

/* ==========================================
   SAYFA BAŞLANGICI
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    renderCart();

});

console.log("Cart.js başarıyla yüklendi.");
/* ==========================================
   ANASAYFADAN SEPETE EKLE
========================================== */

window.addToCart = function (id, name, price, image) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find(item => item.id === id);

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            id: id,
            name: name,
            price: Number(price),
            image: image,
            quantity: 1
        });

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("✅ Ürün sepete eklendi.");

    // Sayfadaki sepet sayısını güncelle (varsa)
    const cartCount = document.getElementById("cartCount");

    if (cartCount) {
        const total = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = total;
    }

};
