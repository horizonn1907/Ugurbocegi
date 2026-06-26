/* ===========================================
   UĞUR BÖCEĞİ PRATİK EV ALETLERİ
   app.js
===========================================*/

console.log("Uğur Böceği Store Başlatıldı.");

/* ===========================
   SAYFA YÜKLENİNCE
=========================== */

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});

/* ===========================
   HEADER GÖLGESİ
=========================== */

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.style.background = "#0B1220";
        header.style.boxShadow = "0 10px 25px rgba(0,0,0,.35)";

    } else {

        header.style.background = "#111827";
        header.style.boxShadow = "none";

    }

});

/* ===========================
   ÜRÜN KARTI ANİMASYONU
=========================== */

const cards = document.querySelectorAll(".product-card");

cards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-12px) scale(1.03)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0) scale(1)";

    });

});

/* ===========================
   KATEGORİLER
=========================== */

const categories = document.querySelectorAll(".category");

categories.forEach(item => {

    item.addEventListener("click", () => {

        item.classList.toggle("active");

    });

});

/* ===========================
   BUTON EFEKTİ
=========================== */

const buttons = document.querySelectorAll(".btn");

buttons.forEach(btn => {

    btn.addEventListener("click", () => {

        btn.style.transform = "scale(.95)";

        setTimeout(() => {

            btn.style.transform = "scale(1)";

        },150);

    });

});

/* ===========================
   FAVORİLER
=========================== */

let favorites = [];

document.querySelectorAll(".fa-heart").forEach(icon=>{

icon.addEventListener("click",()=>{

icon.classList.toggle("fa-solid");

icon.classList.toggle("fa-regular");

});

});

/* ===========================
   SEPET
=========================== */

let cart=[];

document.querySelectorAll(".product-card .btn").forEach(button=>{

button.addEventListener("click",()=>{

alert("Ürün sepete eklendi.");

});

});

/* ===========================
   SCROLL ANİMASYONU
=========================== */

const observer = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("fade-up");

}

});

});

document.querySelectorAll(".product-card,.category,.why-box").forEach(el=>{

observer.observe(el);

});

/* ===========================
   WHATSAPP
=========================== */

const whatsapp=document.querySelector(".whatsapp");

if(whatsapp){

whatsapp.addEventListener("mouseenter",()=>{

whatsapp.style.transform="scale(1.15)";

});

whatsapp.addEventListener("mouseleave",()=>{

whatsapp.style.transform="scale(1)";

});

}

/* ===========================
   HERO PARALLAX
=========================== */

window.addEventListener("mousemove",(e)=>{

const image=document.querySelector(".hero-right img");

if(!image) return;

const x=(window.innerWidth/2-e.pageX)/40;

const y=(window.innerHeight/2-e.pageY)/40;

image.style.transform=`translate(${x}px,${y}px)`;

});

/* ===========================
   YUKARI ÇIK
=========================== */

const goTop=document.createElement("div");

goTop.innerHTML="⬆";

goTop.className="goTop";

document.body.appendChild(goTop);

goTop.style.cssText=`
position:fixed;
right:25px;
bottom:110px;
width:55px;
height:55px;
background:#D40000;
color:#fff;
display:flex;
align-items:center;
justify-content:center;
border-radius:50%;
cursor:pointer;
font-size:22px;
opacity:0;
transition:.3s;
z-index:999;
`;

window.addEventListener("scroll",()=>{

if(window.scrollY>300){

goTop.style.opacity="1";

}else{

goTop.style.opacity="0";

}

});

goTop.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});

console.log("App.js başarıyla yüklendi.");
