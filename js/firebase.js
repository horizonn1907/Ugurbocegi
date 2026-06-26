// Firebase SDK
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

/* Firebase Ayarları */

const firebaseConfig = {

    apiKey: "BURAYA_API_KEY",

    authDomain: "BURAYA.firebaseapp.com",

    projectId: "BURAYA",

    storageBucket: "BURAYA.appspot.com",

    messagingSenderId: "000000000",

    appId: "1:000000:web:000000"

};

/* Firebase Başlat */

const app = initializeApp(firebaseConfig);

/* Servisler */

export const db = getFirestore(app);

export const storage = getStorage(app);

export const auth = getAuth(app);

console.log("Firebase bağlandı.");
