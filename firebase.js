import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";

import { getFirestore }
from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";

const firebaseConfig = {

  apiKey: "AIzaSyDFYMS8Uf_8APgKQhZSOko7zUMBgnK8YJE",

  authDomain: "polaris-68e4b.firebaseapp.com",

  projectId: "polaris-68e4b",

  storageBucket: "polaris-68e4b.firebasestorage.app",

  messagingSenderId: "366304330596",

  appId: "1:366304330596:web:0199e45bf1426939277071"

};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

window.db = db;

console.log("Firebase Connected 🚀");
