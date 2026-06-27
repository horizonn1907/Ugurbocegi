// =======================================
// UĞUR BÖCEĞİ PRATİK EV ALETLERİ
// PRODUCTS.JS
// =======================================

const productGrid = document.getElementById("productGrid");

// Admin panelinden eklenen ürünleri oku
let products = JSON.parse(localStorage.getItem("products")) || [];

// İlk açılışta örnek ürünler ekle
if (products.length === 0) {

    products = [

        {
            id: 1,
            name: "Airfryer XL",
            category: "Airfryer",
            price: 5999,
            image: "images/airfryer.jpg"
        },

        {
            id: 2,
            name: "Blender Seti",
            category: "Blender",
            price: 2499,
            image: "images/blender.jpg"
        },

        {
            id: 3,
            name: "Robot Süpürge",
            category: "Robot Süpürge",
            price: 8999,
            image: "images/robot.jpg"
        }

    ];

    localStorage.setItem("products", JSON.stringify(products));

}

drawProducts();

function drawProducts() {

    if (!productGrid) return;

    productGrid.innerHTML = "";

    products.forEach(product => {

        productGrid.innerHTML += `

<div class="product-card">

<img src="${product.image}" alt="${product.name}">

<h3>${product.name}</h3>

<p>${product.category}</p>

<div class="price">

${formatPrice(product.price)}

</div>

<button onclick="addToCart(${product.id})">

Sepete Ekle

</button>

</div>

`;

    });

}

window.addToCart = function(id){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const product = products.find(p=>p.id==id);

    const existing = cart.find(i=>i.id==id);

    if(existing){

        existing.quantity++;

    }else{

        cart.push({

            ...product,

            quantity:1

        });

    }

    localStorage.setItem("cart",JSON.stringify(cart));

    showMessage("Ürün sepete eklendi.");

    const total = cart.reduce((a,b)=>a+b.quantity,0);

    const badge=document.getElementById("cartCount");

    if(badge){

        badge.innerText=total;

    }

}
