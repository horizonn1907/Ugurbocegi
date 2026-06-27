import { db } from "./firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const productGrid = document.getElementById("productGrid");

async function loadProducts() {

    productGrid.innerHTML = "<h2>Ürünler yükleniyor...</h2>";

    const querySnapshot = await getDocs(collection(db, "products"));

    productGrid.innerHTML = "";

    querySnapshot.forEach((doc) => {

        const product = doc.data();

        productGrid.innerHTML += `

<div class="product-card">

<img src="${product.image}" alt="${product.name}">

<h3>${product.name}</h3>

<p>${product.category}</p>

<div class="price">

<strong>${Number(product.price).toLocaleString("tr-TR")} ₺</strong>

</div>

<button
class="btn"
onclick="addToCart(
'${doc.id}',
'${product.name}',
${product.price},
'${product.image}'
)">

Sepete Ekle

</button>

</div>

`;

    });

}

loadProducts();
