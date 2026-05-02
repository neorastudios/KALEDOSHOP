/* ═══════════════════════════════════════
   KALEDOSHOP — Firebase Config
   Fichier partagé par toutes les pages
═══════════════════════════════════════ */

const firebaseConfig = {
    apiKey: "AIzaSyCxxQqECMe_IO-5JjUSd8If6bNvIvaWPes",
    authDomain: "kaledoshopnc.firebaseapp.com",
    projectId: "kaledoshopnc",
    storageBucket: "kaledoshopnc.firebasestorage.app",
    messagingSenderId: "828687183789",
    appId: "1:828687183789:web:7483fd74c62d6a8d007b24",
    measurementId: "G-KMM84V5L9Q"
};

// Init Firebase
firebase.initializeApp(firebaseConfig);

// Services
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

// Helper: format XPF
function fmtXPF(price) {
    return Number(price).toLocaleString('fr-FR') + ' XPF';
}

console.log('🦅 Kaledoshop Firebase initialisé');
