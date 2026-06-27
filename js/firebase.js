// ======================================
// UĞUR BÖCEĞİ PRATİK EV ALETLERİ
// FIREBASE.JS
// ======================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import {
  getStorage
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-storage.js";

import {
  getAuth
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

/*
====================================================

PROJE BİTTİKTEN SONRA
BURAYA FIREBASE'İN VERDİĞİ
firebaseConfig BİLGİLERİNİ YAPIŞTIRACAKSIN.

ÖRNEK:

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

====================================================
*/

const firebaseConfig = {};

// Firebase yapılandırmasını ekledikten sonra
// aşağıdaki satır aktif olacaktır.

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
