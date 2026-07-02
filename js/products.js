// =====================================
// UĞUR BÖCEĞİ PRATİK EV ALETLERİ
// PRODUCTS.JS (güncellendi: products.json'dan fetch + fallback)
// =====================================

// Varsayılan ürünler (fallback olarak kullanılır)
const defaultProducts = [
{
id:1,
name:"Airfryer XL",
price:5999,
image:"https://images.unsplash.com/photo-1586201375761-83865001e31b?w=600",
category:"Airfryer"
},
{
id:2,
name:"Blender Seti",
price:2499,
image:"https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600",
category:"Blender"
},
{
id:3,
name:"Robot Süpürge",
price:8999,
image:"https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600",
category:"Robot Süpürge"
}
];

// Global products değişkeni (diğer fonksiyonlar kullanacak)
window.products = [];

// Ürünleri render eden fonksiyon
function renderProducts(products){
  const productGrid = document.getElementById("productGrid");
  if(!productGrid) return;
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

// Önce repodaki products.json'dan çekmeyi dene
fetch('products.json')
  .then(res => {
    if(!res.ok) throw new Error('products.json bulunamadı');
    return res.json();
  })
  .then(remoteProducts => {
    window.products = remoteProducts;
    try{ localStorage.setItem('products', JSON.stringify(remoteProducts)); } catch(e){/* ignore */}
    renderProducts(remoteProducts);
  })
  .catch(() => {
    // fallback: localStorage ya da defaultProducts
    if(localStorage.getItem('products')==null){
      localStorage.setItem('products', JSON.stringify(defaultProducts));
    }
    const products = JSON.parse(localStorage.getItem('products'))||[];
    window.products = products;
    renderProducts(products);
  });

// -------------------------
// Sepete Ekle
// -------------------------

function addToCart(id){
  const product = (window.products || []).find(x=>x.id==id);
  if(!product) return showToast('Ürün bulunamadı');

  let cart=JSON.parse(localStorage.getItem("cart"))||[];

  const index=cart.findIndex(x=>x.id==id);

  if(index==-1){
    cart.push({
      ...product,
      quantity:1
    });
  }else{
    cart[index].quantity++;
  }

  localStorage.setItem("cart",JSON.stringify(cart));

  updateCartCount();

  showToast("Ürün sepete eklendi.");
}

window.addToCart=addToCart;
