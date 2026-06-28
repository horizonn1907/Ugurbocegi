// ===========================
// SETTINGS.JS
// Admin tarafından ayarlanan değerleri sayfaya uygular
// ===========================

// Ayarları yükle
function loadSiteSettings() {
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

    const saved = localStorage.getItem("siteSettings");
    return saved ? JSON.parse(saved) : defaultSettings;
}

// Ayarları sayfaya uygula
function applySiteSettings() {
    const settings = loadSiteSettings();

    // Logo ve başlık
    const logos = document.querySelectorAll(".logo");
    logos.forEach(logo => {
        if (logo.innerText.includes("🐞")) {
            logo.innerHTML = `🐞 ${settings.siteName}`;
        }
    });

    // Hero başlığı
    const heroTitles = document.querySelectorAll(".hero-content h1");
    heroTitles.forEach(el => {
        el.innerText = settings.heroTitle;
    });

    // Hero alt başlığı
    const heroSubtitles = document.querySelectorAll(".hero-content p");
    if (heroSubtitles.length > 0) {
        heroSubtitles[0].innerText = settings.heroSubtitle;
    }

    // İletişim bölümü
    const contactPhones = document.querySelectorAll(".contact p");
    if (contactPhones.length > 0) {
        contactPhones[0].innerText = `📞 ${settings.phone}`;
    }

    if (contactPhones.length > 1) {
        contactPhones[1].innerText = `📍 ${settings.location}`;
    }

    // WhatsApp linki
    const whatsappLinks = document.querySelectorAll('.whatsapp, a[href*="wa.me"]');
    whatsappLinks.forEach(link => {
        link.href = `https://wa.me/${settings.whatsapp}`;
    });

    // Kampanya bölümü
    const campaignTitles = document.querySelectorAll(".campaign h2");
    campaignTitles.forEach(el => {
        el.innerText = settings.campaignTitle;
    });

    const campaignTexts = document.querySelectorAll(".campaign p");
    if (campaignTexts.length > 0) {
        campaignTexts[0].innerText = settings.campaignDescription;
    }

    // Footer
    const footers = document.querySelectorAll("footer p, .footer p");
    footers.forEach(el => {
        if (el.innerText.includes("©") || el.innerText.includes("Uğur Böceği")) {
            el.innerText = settings.copyright;
        }
    });
}

// Sayfa yüklendiğinde ayarları uygula
document.addEventListener("DOMContentLoaded", applySiteSettings);

// Export for global use
window.loadSiteSettings = loadSiteSettings;
window.applySiteSettings = applySiteSettings;
