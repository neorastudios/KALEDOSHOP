/* ═══════════════════════════════════════
   KALEDOSHOP — Firebase Config
═══════════════════════════════════════ */

const firebaseConfig = {
    apiKey: "AIzaSyBcqNl50YN-pa0nr9dNQyTesVhA9O9ynrI",
    authDomain: "kaledoshopweb.firebaseapp.com",
    projectId: "kaledoshopweb",
    storageBucket: "kaledoshopweb.firebasestorage.app",
    messagingSenderId: "945907058215",
    appId: "1:945907058215:web:946deef336ba8a6fae3002"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function fmtXPF(price) {
    return Number(price).toLocaleString('fr-FR') + ' XPF';
}

console.log('🦅 Kaledoshop Firebase initialisé');
