// ===============================
// CART.JS
// ===============================

// Sepeti göster fonksiyonu
function drawCart(){
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");
    
    if(!cartItems) return;
    
    // Her zaman localStorage'dan son halini al
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    cartItems.innerHTML="";
    
    let total=0;
    
    if(cart.length===0){
        cartItems.innerHTML="<h3>Sepetiniz boş.</h3>";
        cartTotal.innerText="0 ₺";
        return;
    }
    
    cart.forEach(item=>{
        total += item.price * item.quantity;
        
        cartItems.innerHTML += `
        <div class="product-card">
            <img src="${item.image}" onerror="this.src='https://via.placeholder.com/230'">
            <h3>${item.name}</h3>
            <p>Adet : ${item.quantity}</p>
            <div class="price">
                ${formatPrice(item.price)}
            </div>
            <button onclick="removeItem(${item.id})">
                Sepetten Sil
            </button>
        </div>
        `;
    });
    
    cartTotal.innerText=formatPrice(total);
}

// Sayfa yüklendiğinde veya localStorage değiştiğinde çalıştır
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', drawCart);
} else {
    drawCart();
}

// localStorage değiştiğinde güncelle (başka tabda değişirse)
window.addEventListener('storage', drawCart);

// -----------------------
// Ürün Sil
// -----------------------

function removeItem(id){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(x => x.id != id);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    drawCart();
}

window.removeItem = removeItem;

// -----------------------
// WhatsApp Siparişi
// -----------------------

function setupWhatsAppButton() {
    const whatsappBtn = document.getElementById("whatsappBtn");
    
    if(whatsappBtn){
        whatsappBtn.onclick = function(){
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            
            if(cart.length===0){
                alert("Sepet boş.");
                return;
            }
            
            let message = "Merhaba, sipariş vermek istiyorum.%0A%0A";
            let toplam = 0;
            
            cart.forEach(item=>{
                message += `${item.name} x${item.quantity} - ${item.price} ₺%0A`;
                toplam += item.price * item.quantity;
            });
            
            message += `%0AToplam : ${toplam} ₺`;
            
            window.open("https://wa.me/905553947288?text="+message);
        }
    }
}

// DOM hazırlandıktan sonra buton event'ini ayarla
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupWhatsAppButton);
} else {
    setupWhatsAppButton();
}
