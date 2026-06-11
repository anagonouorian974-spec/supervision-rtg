// service-worker.js minimal pour l'écoute Firebase en tâche de fond

importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-database-compat.js');

const firebaseConfig = {
  // Copiez VOTRE config Firebase ici
  apiKey: "eUJSjyx1W95zjmkqAL8PGir4rGWQUMuxJDucYIP4",
  authDomain: "supervision-rtg-default-rtdb.firebaseapp.com",
  databaseURL: "https://supervision-rtg-default-rtdb.firebaseio.com/",
  projectId: "supervision-rtg-default-rtdb",
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Verrou anti-spam propre au Service Worker
let wasAlertedInBg = false;

// Écoute des données
database.ref('/rtg_system/filtered_state').on('value', (snapshot) => {
  const state = snapshot.val();
  
  if (state === "USURE" && !wasAlertedInBg) {
    wasAlertedInBg = true;
    console.log("[SW] Alerte USURE reçue en arrière-plan. Envoi WhatsApp.");
    
    // ICI : Vous devez copier la logique WhatsApp triggerWhatsAppNotifications() 
    // adaptée pour le Service Worker (car localStorage n'est pas accessible ici, 
    // il faut utiliser IndexedDB ou lire les contacts depuis Firebase directement).
    
    // Exemple d'appel direct simplifié pour le SW :
    // fetch('https://api.callmebot.com/whatsapp.php?phone=229...&text=...&apikey=...');

  } else if (state === "OK") {
    wasAlertedInBg = false;
  }
});

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});
