import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  getDocs 
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";

// Konfigurasi Resmi Web App Firebase POLARIS
const firebaseConfig = {
  apiKey: "AIzaSyDFYMS8Uf_8APgKQhZSOko7zUMBgnK8YJE",
  authDomain: "polaris-68e4b.firebaseapp.com",
  projectId: "polaris-68e4b",
  storageBucket: "polaris-68e4b.firebasestorage.app",
  messagingSenderId: "366304330596",
  appId: "1:366304330596:web:0199e45bf1426939277071"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

console.log("Firebase Connected 🚀");

// Ekspor semua module agar bisa digunakan di script.js
export {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs
};
