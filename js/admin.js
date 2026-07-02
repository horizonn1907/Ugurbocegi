// ===========================
// ADMIN.JS - Geliştirilmiş (güncellendi)
// ===========================

const ADMIN_PASSWORD = "123456";

// Para Formatı
function formatPrice(price) {
    return Number(price).toLocaleString("tr-TR") + " ₺";
}

window.formatPrice = formatPrice;

// Ayarlar için varsayılan değerler
const defaultSettings = {
    siteName: "Uğur Böceği",
    location: "Bolu",
    phone: "0534 088 82 49",
    whatsapp: "905340888249",
    heroTitle: "Pratik Ev Aletlerinde Yeni Nesil Alışveriş",
    heroSubtitle: "Kaliteli ürünler • Uygun fiyat • Güvenli alışveriş",
    campaignText: "Seçili ürünlerde %30'a varan indirim.",
    copyright: "© 2026 Uğur Böceği Pratik Ev Aletleri",
    campaignTitle: "Haftanın Kampanyası",
    campaignDescription: "Seçili ürünlerde %30'a varan indirim.",
    discountPercent: 30,
    campaignActive: 1
};

// Ayarları yükle (yoksa varsayılan kullan)
function loadSettings() {
    const saved = localStorage.getItem("siteSettings");
    return saved ? JSON.parse(saved) : defaultSettings;
}

// ---------------------------
// JSON İNDİRME YARDIMCISI
// ---------------------------
function downloadJSON(filename, data){
    try{
        const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    }catch(e){
        console.error('JSON indirilemedi', e);
    }
}

// ===========================
// GİRİŞ / ÇIKIŞ
// ===========================

function adminLogin() {
    const password = document.getElementById("password").value;

    if (password === "") {
        alert("Şifre alanını doldurun!");
        return;
    }

    if (password !== ADMIN_PASSWORD) {
        alert("Şifre yanlış!");
        return;
    }

    document.getElementById("loginForm").style.display = "none";
    document.getElementById("adminPanel").style.display = "block";
    loadSettingsForm();
    loadProducts();
}

function adminLogout() {
    if (confirm("Çıkış yapmak istediğinize emin misiniz?")) {
        document.getElementById("loginForm").style.display = "block";
        document.getElementById("adminPanel").style.display = "none";
        document.getElementById("password").value = "";
    }
}

window.adminLogin = adminLogin;
window.adminLogout = adminLogout;

// ===========================
// TAB KONTROL
// ===========================

function switchTab(tabName) {
    // Tüm sekmeler gizle
    const contents = document.querySelectorAll(".tab-content");
    contents.forEach(el => el.classList.remove("active"));

    // Tüm butonları pasif yap
    const buttons = document.querySelectorAll(".tab-btn");
    buttons.forEach(el => el.classList.remove("active"));

    // Seçili sekmeyi göster
    document.getElementById(tabName).classList.add("active");
    
    // Seçili butonu aktif yap
    try{
      event.target.closest(".tab-btn").classList.add("active");
    }catch(e){/* ignore */}
}

window.switchTab = switchTab;

// ===========================
// AYARLAR
// ===========================

function loadSettingsForm() {
    // Önce repodan settings.json çekmeyi dene — varsa localStorage'a kaydet
    fetch('settings.json')
      .then(res => {
        if(!res.ok) throw new Error('settings.json bulunamadı');
        return res.json();
      })
      .then(remoteSettings => {
        try{ localStorage.setItem('siteSettings', JSON.stringify(remoteSettings)); }catch(e){}
        applySettingsToForm(remoteSettings);
      })
      .catch(() => {
        const settings = loadSettings();
        applySettingsToForm(settings);
      });
}

function applySettingsToForm(settings){
    document.getElementById("siteName").value = settings.siteName;
    document.getElementById("location").value = settings.location;
    document.getElementById("phone").value = settings.phone;
    document.getElementById("whatsapp").value = settings.whatsapp;
    document.getElementById("heroTitle").value = settings.heroTitle;
    document.getElementById("heroSubtitle").value = settings.heroSubtitle;
    document.getElementById("campaignText").value = settings.campaignText;
    document.getElementById("copyright").value = settings.copyright;
    document.getElementById("campaignTitle").value = settings.campaignTitle;
    document.getElementById("campaignDescription").value = settings.campaignDescription;
    document.getElementById("discountPercent").value = settings.discountPercent;
    document.getElementById("campaignActive").value = settings.campaignActive;
}

function saveSettings() {
    const settings = {
        siteName: document.getElementById("siteName").value,
        location: document.getElementById("location").value,
        phone: document.getElementById("phone").value,
        whatsapp: document.getElementById("whatsapp").value,
        heroTitle: document.getElementById("heroTitle").value,
        heroSubtitle: document.getElementById("heroSubtitle").value,
        campaignText: document.getElementById("campaignText").value,
        copyright: document.getElementById("copyright").value,
        campaignTitle: document.getElementById("campaignTitle").value,
        campaignDescription: document.getElementById("campaignDescription").value,
        discountPercent: parseInt(document.getElementById("discountPercent").value),
        campaignActive: parseInt(document.getElementById("campaignActive").value)
    };

    if (!settings.siteName || !settings.phone || !settings.location) {
        alert("Tüm zorunlu alanları doldurun!");
        return;
    }

    localStorage.setItem("siteSettings", JSON.stringify(settings));
    
    // Başarı mesajı göster
    const msg = document.getElementById("settingsMessage");
    msg.innerText = "✓ Ayarlar başarıyla kaydedildi!";
    msg.classList.add("show");
    setTimeout(() => msg.classList.remove("show"), 3000);

    // Kullanıcının repoya gönderebilmesi için settings.json indir
    downloadJSON('settings.json', settings);
}

window.saveSettings = saveSettings;

// ===========================
// KAMPANYA
// ===========================

function saveCampaign() {
    const settings = loadSettings();
    
    settings.campaignTitle = document.getElementById("campaignTitle").value;
    settings.campaignDescription = document.getElementById("campaignDescription").value;
    settings.discountPercent = parseInt(document.getElementById("discountPercent").value);
    settings.campaignActive = parseInt(document.getElementById("campaignActive").value);

    if (!settings.campaignTitle || !settings.campaignDescription) {
        alert("Kampanya başlığı ve açıklaması gereklidir!");
        return;
    }

    localStorage.setItem("siteSettings", JSON.stringify(settings));
    
    // Başarı mesajı göster
    const msg = document.getElementById("campaignMessage");
    msg.innerText = "✓ Kampanya ayarları başarıyla kaydedildi!";
    msg.classList.add("show");
    setTimeout(() => msg.classList.remove("show"), 3000);

    // İnidirilebilir settings.json güncelle
    downloadJSON('settings.json', settings);
}

window.saveCampaign = saveCampaign;

// ===========================
// ÜRÜNLER
// ===========================

function loadProducts() {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const list = document.getElementById("productsList");
    list.innerHTML = "";

    if (products.length === 0) {
        list.innerHTML = "<p style='grid-column: 1 / -1; text-align: center; color: #999;'>Henüz ürün eklenmemiş.</p>";
        return;
    }

    products.forEach(product => {
        list.innerHTML += `
        <div class="product-card">
            <img src="${product.image}" onerror="this.src='https://via.placeholder.com/230?text=Görsel+Bulunamadı'">
            <div class="product-info">
                <h4>${product.name}</h4>
                <p>${product.category}</p>
                <div class="price">${formatPrice(product.price)}</div>
                <button onclick="deleteProduct(${product.id})">Sil</button>
            </div>
        </div>
        `;
    });
}

window.loadProducts = loadProducts;

function addProduct() {
    const name = document.getElementById("productName").value.trim();
    const price = Number(document.getElementById("productPrice").value);
    const category = document.getElementById("productCategory").value.trim();
    const image = document.getElementById("productImage").value.trim();

    if (!name || !price || !category || !image) {
        alert("Tüm alanları doldurun.");
        return;
    }

    if (price <= 0) {
        alert("Fiyat 0'dan büyük olmalıdır.");
        return;
    }

    const products = JSON.parse(localStorage.getItem("products")) || [];

    products.push({
        id: Date.now(),
        name,
        price,
        category,
        image
    });

    localStorage.setItem("products", JSON.stringify(products));

    document.getElementById("productName").value = "";
    document.getElementById("productPrice").value = "";
    document.getElementById("productCategory").value = "";
    document.getElementById("productImage").value = "";

    loadProducts();
    
    // Başarı mesajı göster
    const msg = document.getElementById("productsMessage");
    msg.innerText = "✓ Ürün başarıyla eklendi!";
    msg.classList.add("show");
    setTimeout(() => msg.classList.remove("show"), 3000);

    // Yeni products.json indir
    const updatedProducts = JSON.parse(localStorage.getItem('products') || '[]');
    downloadJSON('products.json', updatedProducts);
}

window.addProduct = addProduct;

function deleteProduct(id) {
    if (!confirm("Bu ürünü silmek istediğinize emin misiniz?")) {
        return;
    }

    let products = JSON.parse(localStorage.getItem("products")) || [];
    products = products.filter(product => product.id !== id);
    localStorage.setItem("products", JSON.stringify(products));

    loadProducts();

    // Güncel products.json indir
    downloadJSON('products.json', products);
}

window.deleteProduct = deleteProduct;
