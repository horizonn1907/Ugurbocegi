```javascript
// ===============================
// CART.JS
// ===============================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

drawCart();

// -----------------------
// Sepeti Göster
// -----------------------

function drawCart(){

if(!cartItems) return;

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

<img src="${item.image}">

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

// -----------------------
// Ürün Sil
// -----------------------

function removeItem(id){

cart=cart.filter(x=>x.id!=id);

localStorage.setItem("cart",JSON.stringify(cart));

updateCartCount();

drawCart();

}

window.removeItem=removeItem;

// -----------------------
// WhatsApp Siparişi
// -----------------------

const whatsappBtn=document.getElementById("whatsappBtn");

if(whatsappBtn){

whatsappBtn.onclick=function(){

if(cart.length===0){

alert("Sepet boş.");

return;

}

let message="Merhaba, sipariş vermek istiyorum.%0A%0A";

let toplam=0;

cart.forEach(item=>{

message+=`${item.name} x${item.quantity} - ${item.price} ₺%0A`;

toplam += item.price * item.quantity;

});

message+=`%0AToplam : ${toplam} ₺`;

window.open("https://wa.me/905553947288?text="+message);

}

}
```
