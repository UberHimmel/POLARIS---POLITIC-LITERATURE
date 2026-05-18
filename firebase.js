import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";

import { getFirestore }
from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";

const firebaseConfig = {

  apiKey: "API_KAMU",
  authDomain: "AUTH_KAMU",
  projectId: "PROJECT_KAMU",
  storageBucket: "STORAGE_KAMU",
  messagingSenderId: "MESSAGE_KAMU",
  appId: "APP_KAMU"

};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

window.db = db;

console.log("Firebase Connected 🚀");
