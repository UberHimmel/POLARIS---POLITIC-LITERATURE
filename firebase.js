import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs
}
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

const auth = getAuth(app);


/* GLOBAL */

window.db = db;

window.auth = auth;

window.provider = provider;

window.signInWithRedirect =
signInWithRedirect;

window.signOut =
signOut;

window.onAuthStateChanged =
onAuthStateChanged;

console.log("Firebase Connected 🚀");

window.doc = doc;

window.setDoc = setDoc;

window.getDoc = getDoc;

window.collection = collection;

window.getDocs = getDocs;

window.createUserWithEmailAndPassword =
createUserWithEmailAndPassword;

window.signInWithEmailAndPassword =
signInWithEmailAndPassword;
