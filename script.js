console.log("POLARIS AI READY 🚀");

import { auth, db } from "./firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";
import { doc, setDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";

/* MENU SIDEBAR MOBILE */
const menuBtn = document.querySelector(".menu-btn");
const sidebar = document.querySelector(".sidebar");
if (menuBtn && sidebar) {
  menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("active");
  });
}

/* EFEK MENGETIK HERO SECTION */
const text = "Platform Literasi Politik untuk Generasi Melek, Kritis, dan Berpartisipasi";
const typingText = document.getElementById("typing-text");
let index = 0;
function typeEffect() {
  if (typingText && index < text.length) {
    typingText.innerHTML += text.charAt(index);
    index++;
    setTimeout(typeEffect, 40);
  }
}
typeEffect();

/* SCREEN INITIAL LOADER */
const loader = document.querySelector(".loader");
window.addEventListener("load", () => {
  if (loader) {
    setTimeout(() => { loader.classList.add("hide"); }, 1500);
  }
});

/* TOGGLE POPUP ASSISTANT AI */
const aiPopup = document.getElementById("aiPopup");
const closeAI = document.getElementById("closeAI");
const openChat = document.getElementById("openChat");

if (closeAI && aiPopup && openChat) {
  closeAI.addEventListener("click", () => {
    aiPopup.style.display = "none";
    openChat.style.display = "block";
  });
}
if (openChat && aiPopup) {
  openChat.addEventListener("click", () => {
    aiPopup.style.display = "flex";
    openChat.style.display = "none";
  });
}

/* CHAT BOT VIRTUAL ASSISTANT SYSTEM */
const sendAI = document.getElementById("sendAI");
const aiInput = document.getElementById("aiInput");
const aiBody = document.getElementById("aiBody");

if (sendAI) sendAI.addEventListener("click", sendMessage);
if (aiInput) {
  aiInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });
}

function sendMessage() {
  if (!aiInput || !aiBody) return;
  const textVal = aiInput.value.trim();
  if (textVal === "") return;

  const userMsg = document.createElement("div");
  userMsg.classList.add("user-message");
  userMsg.innerText = textVal;
  aiBody.appendChild(userMsg);
  
  saveChat();
  aiInput.value = "";
  aiBody.scrollTop = aiBody.scrollHeight;

  const typing = document.createElement("div");
  typing.classList.add("ai-message", "typing");
  typing.innerText = "POLARIS AI sedang mengetik...";
  aiBody.appendChild(typing);
  aiBody.scrollTop = aiBody.scrollHeight;

  setTimeout(() => {
    typing.remove();
    const botMsg = document.createElement("div");
    botMsg.classList.add("ai-message");
    typeBotMessage(botMsg, getAIResponse(textVal));
    aiBody.appendChild(botMsg);
    aiBody.scrollTop = aiBody.scrollHeight;
    saveChat();
  }, 1200);
}

function getAIResponse(message) {
  message = message.toLowerCase();
  if (message.includes("halo") || message.includes("hai")) return "Halo Polarisian! 🚀 Ada topik politik atau demokrasi yang ingin kamu bahas?";
  if (message.includes("politik")) return "Politik adalah proses pengambilan keputusan dalam masyarakat dan negara 🌍";
  if (message.includes("demokrasi")) return "Demokrasi adalah sistem dimana rakyat memiliki hak memilih dan menyampaikan pendapat 👥";
  if (message.includes("pemilu")) return "Pemilu adalah sarana demokrasi untuk memilih pemimpin dan wakil rakyat 🗳️";
  return "Aku POLARIS AI 🚀 Gunakan modul Cek Fakta di menu utama untuk analisis hoaks menggunakan basis data real-time cerdas.";
}

function typeBotMessage(element, text) {
  let i = 0;
  function typing() {
    if (element && aiBody && i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      aiBody.scrollTop = aiBody.scrollHeight;
      setTimeout(typing, 20);
    }
  }
  typing();
}

function saveChat() { if (aiBody) localStorage.setItem("polarisChat", aiBody.innerHTML); }
window.addEventListener("load", () => {
  const savedChat = localStorage.getItem("polarisChat");
  if (savedChat && aiBody) aiBody.innerHTML = savedChat;
});

/* INTEGRASI INTERAKTIF LEVELING & XP SYSTEM */
let xp = 0; let level = 1;
const xpPoints = document.getElementById("xpPoints");
const userLevel = document.getElementById("userLevel");
const xpFill = document.getElementById("xpFill");

const savedXP = localStorage.getItem("polarisXP");
const savedLevel = localStorage.getItem("polarisLevel");
if (savedXP) xp = parseInt(savedXP);
if (savedLevel) level = parseInt(savedLevel);
updateXP();

function addXP(amount) {
  xp += amount;
  if (xp >= 100) { xp = 0; level++; showToast("🚀 Level Naik ke Level " + level); }
  updateXP();
  localStorage.setItem("polarisXP", xp);
  localStorage.setItem("polarisLevel", level);
}

function updateXP() {
  if (xpPoints) xpPoints.innerHTML = "⭐ " + xp;
  if (userLevel) userLevel.innerHTML = "Level " + level;
  if (xpFill) xpFill.style.width = xp + "%";
}

/* CURSOR GLOW TRAILING EFFECT */
const cursorGlow = document.querySelector(".cursor-glow");
document.addEventListener("mousemove", (e) => {
  if (cursorGlow) {
    cursorGlow.style.left = e.clientX + "px";
    cursorGlow.style.top = e.clientY + "px";
  }
});

/* SIMULASI DATA KUIS HOTS */
const quizData = [
  {
    question: "Mengapa literasi politik penting bagi generasi muda?",
    answers: ["Agar mudah mengikuti tren", "Agar memahami hak dan kewajiban", "Supaya terkenal", "Agar bisa debat tanpa data"],
    correct: 1
  }
];

let currentQuiz = 0;
const question = document.getElementById("question");
const answerBtns = document.querySelectorAll(".answer-btn");

if (question && answerBtns.length > 0) loadQuiz();

function loadQuiz() {
  if (!question) return;
  const current = quizData[currentQuiz];
  question.innerText = current.question;
  answerBtns.forEach((btn, index) => { btn.innerText = current.answers[index]; });
}

answerBtns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    if (index === quizData[currentQuiz].correct) {
      showToast("✅ Jawaban Benar! +25 XP");
      addXP(25);
    } else {
      showToast("❌ Jawaban Kurang Tepat");
    }
    question.innerText = "🎉 Quiz Selesai!";
    const answersDiv = document.querySelector(".answers");
    if (answersDiv) answersDiv.style.display = "none";
  });
});

function showToast(message) {
  const toast = document.querySelector(".toast");
  if (toast) {
    toast.innerText = message;
    toast.classList.add("show");
    setTimeout(() => { toast.classList.remove("show"); }, 3000);
  }
}

/* LOAD BERITA LIVE - GNEWS API */
const API_KEY = "18e89427a04c6b5440a483b5b6fbe0dc";
const articleList = document.querySelector(".article-list");

async function loadNews() {
  if (!articleList) return;
  try {
    const response = await fetch(`https://gnews.io/api/v4/top-headlines?category=general&lang=id&country=id&max=3&apikey=${API_KEY}`);
    const data = await response.json();
    articleList.innerHTML = "";
    if (!data.articles) { articleList.innerHTML = "<p>Berita gagal dimuat 😢</p>"; return; }
    data.articles.forEach(article => {
      articleList.innerHTML += `
      <div class="article-card">
        <img src="${article.image || 'https://via.placeholder.com/300x180'}" style="width:100%; height:180px; object-fit:cover; border-radius:15px; margin-bottom:15px;">
        <h3>${article.title}</h3>
        <p>${article.description || "Tidak ada deskripsi"}</p>
        <a href="${article.url}" target="_blank">Baca Selengkapnya →</a>
      </div>`;
    });
  } catch (error) {
    articleList.innerHTML = "<p>Gagal memuat berita aktual. Periksa jaringan Anda. 😢</p>";
  }
}
loadNews();

const startQuizBtn = document.getElementById("startQuizBtn");
const quizPage = document.getElementById("quizPage");
if (startQuizBtn && quizPage) {
  startQuizBtn.addEventListener("click", () => {
    quizPage.style.display = "block";
    quizPage.scrollIntoView({ behavior: "smooth" });
  });
}

/* FIREBASE AUTHENTICATION INTERFACE MANAGEMENT */
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const logoutBtn = document.getElementById("logoutBtn");
const userName = document.getElementById("userName");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");

if (registerBtn) {
  registerBtn.addEventListener("click", async () => {
    if (!emailInput || !passwordInput) return;
    try { await createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value); alert("Akun sukses terdaftar! 🚀"); } catch (e) { alert(e.message); }
  });
}
if (loginBtn) {
  loginBtn.addEventListener("click", async () => {
    if (!emailInput || !passwordInput) return;
    try { await signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value); alert("Selamat Datang Kembali! 🚀"); } catch (e) { alert(e.message); }
  });
}
if (logoutBtn) logoutBtn.addEventListener("click", () => { signOut(auth); });

onAuthStateChanged(auth, (user) => {
  if (!userName || !logoutBtn) return;
  if (user) { userName.innerHTML = "Halo, " + user.email; logoutBtn.style.display = "block"; } 
  else { userName.innerHTML = "Belum Login"; logoutBtn.style.display = "none"; }
});


/* ====================================================================
   🔥 MODUL INDEPENDEN: CEK FAKTA MULTIMODAL REAL-TIME (GEMINI AI ENGINE)
   ==================================================================== */
const hoaxInput = document.getElementById("hoaxInput");
const checkHoaxBtn = document.getElementById("checkHoaxBtn");
const hoaxResult = document.getElementById("hoaxResult");
const hoaxImageInput = document.getElementById("hoaxImage");
const fileNameSpan = document.getElementById("fileName");

if (hoaxImageInput && fileNameSpan) {
  hoaxImageInput.addEventListener("change", (e) => {
    fileNameSpan.innerText = e.target.files[0] ? `📁 ${e.target.files[0].name}` : "Belum ada gambar";
  });
}

if (checkHoaxBtn) {
  checkHoaxBtn.addEventListener("click", async () => {
    if (!hoaxInput || !hoaxResult) return;
    
    const textValue = hoaxInput.value.trim();
    const imageFile = hoaxImageInput ? hoaxImageInput.files[0] : null;

    if (textValue === "" && !imageFile) {
      hoaxResult.innerHTML = "⚠️ Harap ketik klaim kutipan atau masukkan file gambar!";
      return;
    }

    hoaxResult.innerHTML = "🔍 <span class='typing'>POLARIS AI sedang melacak basis data & memetakan link rujukan utama...</span>";

    try {
      const GEMINI_API_KEY = "AIzaSyDFYMS8Uf_8APgKQhZSOko7zUMBgnK8YJE";
      let url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

      let promptInstruction = "Kamu adalah sistem kecerdasan AI pemeriksa fakta terpercaya untuk Polaris. Analisis klaim teks atau gambar yang dikirimkan. Deteksi jika itu klaim palsu, rekayasa digital, kutipan sembarangan, atau fakta empiris. Berikan kesimpulan berparagraf. Paling penting: Kamu WAJIB mencantumkan satu atau beberapa tautan web aktif (URL hidup) sebagai bukti rujukan konkrit (misalnya dari turnbackhoax.id, cekfakta.com, kominfo.go.id, atau media nasional tepercaya). Format link rujukan wajib menggunakan tag HTML anchor, contoh: <a href='https://link-rujukan.com' target='_blank' style='color:#A78BFA; font-weight:bold; text-decoration:underline;'>Buka Sumber Fakta</a>. Jangan pakai format markdown. Seluruh output harus menggunakan variasi tag HTML paragraf (<p>) dan pemisah baris (<br>).";

      let contentsPayload = [];

      if (imageFile) {
        const base64Data = await convertToBase64(imageFile);
        contentsPayload = [{
          parts: [
            { text: `${promptInstruction}\nKonteks teks tambahan: "${textValue}"` },
            { inlineData: { mimeType: imageFile.type, data: base64Data } }
          ]
        }];
      } else {
        contentsPayload = [{
          parts: [{ text: `${promptInstruction}\nTeks klaim: "${textValue}"` }]
        }];
      }

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: contentsPayload })
      });

      const resultData = await response.json();
      
      if (resultData.candidates && resultData.candidates[0].content.parts[0].text) {
        let aiOutput = resultData.candidates[0].content.parts[0].text;
        aiOutput = aiOutput.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');

        hoaxResult.innerHTML = `
          <div style="border-left: 4px solid #00B894; padding-left: 12px; line-height: 1.6; background: rgba(255,255,255,0.04); padding: 15px; border-radius: 12px; margin-top:15px;">
            📊 <b>Hasil Analisis Cerdas POLARIS AI:</b><br><br>
            ${aiOutput}
          </div>
        `;
      } else {
        hoaxResult.innerHTML = "❌ AI mengalami kesalahan struktur pembacaan data. Coba berikan deskripsi teks yang lebih jelas.";
      }

    } catch (error) {
      console.error(error);
      hoaxResult.innerHTML = "❌ Terjadi kendala enkripsi jaringan dengan satelit server AI. Silakan coba lagi.";
    }
  });
}

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = error => reject(error);
  });
}
