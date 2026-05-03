/* ═══════════════════════════════════════
   KALEDOSHOP — Firebase Config
   Fichier partagé par toutes les pages
═══════════════════════════════════════ */

const firebaseConfig = {
    apiKey: "AIzaSyBcqNl50YN-pa0nr9dNQyTesVhA9O9ynrI",
    authDomain: "kaledoshopweb.firebaseapp.com",
    projectId: "kaledoshopweb",
    storageBucket: "kaledoshopweb.firebasestorage.app",
    messagingSenderId: "945907058215",
    appId: "1:945907058215:web:946deef336ba8a6fae3002"
};

// Init Firebase
firebase.initializeApp(firebaseConfig);

// Services — init seulement si le SDK est chargé
const db = firebase.firestore();
const auth = typeof firebase.auth === 'function' ? firebase.auth() : null;
const storage = typeof firebase.storage === 'function' ? firebase.storage() : null;

// Helper: format XPF
function fmtXPF(price) {
    return Number(price).toLocaleString('fr-FR') + ' XPF';
}

console.log('🦅 Kaledoshop Firebase initialisé');
