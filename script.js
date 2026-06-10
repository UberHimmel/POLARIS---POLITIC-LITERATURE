console.log("POLARIS READY 🚀");

import {
  auth,
  db
} from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";

import {
  doc,
  setDoc,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";

/* MENU */
const menuBtn = document.querySelector(".menu-btn");
const sidebar = document.querySelector(".sidebar");

if (menuBtn && sidebar) {
  menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("active");
  });
}

/* TYPING EFFECT */
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

/* LOADER */
const loader = document.querySelector(".loader");
window.addEventListener("load", () => {
  if (loader) {
    setTimeout(() => {
      loader.classList.add("hide");
    }, 1500);
  }
});

/* AI POPUP */
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

/* AI CHAT */
const sendAI = document.getElementById("sendAI");
const aiInput = document.getElementById("aiInput");
const aiBody = document.getElementById("aiBody");

if (sendAI) {
  sendAI.addEventListener("click", sendMessage);
}

if (aiInput) {
  aiInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  });
}

function sendMessage() {
  if (!aiInput || !aiBody) return;
  const text = aiInput.value.trim();
  if (text === "") return;

  /* USER MESSAGE */
  const userMsg = document.createElement("div");
  userMsg.classList.add("user-message");
  userMsg.innerText = text;
  aiBody.appendChild(userMsg);
  
  saveChat();
  aiInput.value = "";
  aiBody.scrollTop = aiBody.scrollHeight;

  /* TYPING EFFECT */
  const typing = document.createElement("div");
  typing.classList.add("ai-message", "typing");
  typing.innerText = "POLARIS AI sedang mengetik...";
  aiBody.appendChild(typing);
  aiBody.scrollTop = aiBody.scrollHeight;

  setTimeout(() => {
    typing.remove();

    /* BOT MESSAGE */
    const botMsg = document.createElement("div");
    botMsg.classList.add("ai-message");
    typeBotMessage(botMsg, getAIResponse(text));
    aiBody.appendChild(botMsg);
    aiBody.scrollTop = aiBody.scrollHeight;
    
    saveChat();
  }, 1200);
}

/* AI RESPONSE */
function getAIResponse(message) {
  message = message.toLowerCase();

  if (message.includes("halo") || message.includes("hai") || message.includes("hi")) {
    return "Halo Polarisian! 🚀 Ada topik politik atau demokrasi yang ingin kamu bahas?";
  }
  if (message.includes("politik")) {
    return "Politik adalah proses pengambilan keputusan dalam masyarakat dan negara 🌍";
  }
  if (message.includes("demokrasi")) {
    return "Demokrasi adalah sistem dimana rakyat memiliki hak memilih dan menyampaikan pendapat 👥";
  }
  if (message.includes("pemilu")) {
    return "Pemilu adalah sarana demokrasi untuk memilih pemimpin dan wakil rakyat 🗳️";
  }
  if (message.includes("hoax")) {
    return "Hoax biasanya memakai judul emosional dan provokatif. Selalu cek fakta sebelum menyebarkan informasi 🔍";
  }
  if (message.includes("korupsi")) {
    return "Korupsi adalah penyalahgunaan kekuasaan demi keuntungan pribadi dan dapat merugikan masyarakat ⚖️";
  }
  if (message.includes("ham")) {
    return "HAM adalah Hak Asasi Manusia, yaitu hak dasar yang dimiliki setiap manusia sejak lahir ✨";
  }
  if (message.includes("dpr")) {
    return "DPR adalah lembaga legislatif yang memiliki fungsi membuat undang-undang dan mengawasi pemerintah 🏛️";
  }
  if (message.includes("presiden")) {
    return "Presiden adalah kepala negara sekaligus kepala pemerintahan di Indonesia 🇮🇩";
  }
  if (message.includes("anak muda") || message.includes("generasi muda")) {
    return "Generasi muda punya peran besar dalam menjaga demokrasi dan melawan penyebaran hoax 🚀";
  }
  if (message.includes("terima kasih") || message.includes("makasih")) {
    return "Sama-sama Polarisian! 🚀";
  }

  return "Aku POLARIS AI 🚀 Saat ini aku masih belajar memahami pertanyaan politik yang lebih kompleks.";
}

/* BOT TYPING EFFECT */
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

/* SAVE CHAT */
function saveChat() {
  if (aiBody) {
    localStorage.setItem("polarisChat", aiBody.innerHTML);
  }
}

/* LOAD CHAT */
window.addEventListener("load", () => {
  const savedChat = localStorage.getItem("polarisChat");
  if (savedChat && aiBody) {
    aiBody.innerHTML = savedChat;
  }
});

/* XP SYSTEM */
let xp = 0;
let level = 1;

const xpPoints = document.getElementById("xpPoints");
const userLevel = document.getElementById("userLevel");
const xpFill = document.getElementById("xpFill");

/* LOAD XP */
const savedXP = localStorage.getItem("polarisXP");
const savedLevel = localStorage.getItem("polarisLevel");

if (savedXP) xp = parseInt(savedXP);
if (savedLevel) level = parseInt(savedLevel);

updateXP();

/* ADD XP */
function addXP(amount) {
  xp += amount;
  if (xp >= 100) {
    xp = 0;
    level++;
    showToast("🚀 Level Naik ke Level " + level);
  }
  updateXP();
  localStorage.setItem("polarisXP", xp);
  localStorage.setItem("polarisLevel", level);
}

/* UPDATE UI */
function updateXP() {
  if (xpPoints) xpPoints.innerHTML = "⭐ " + xp;
  if (userLevel) userLevel.innerHTML = "Level " + level;
  if (xpFill) xpFill.style.width = xp + "%";
}

/* CURSOR GLOW */
const cursorGlow = document.querySelector(".cursor-glow");
document.addEventListener("mousemove", (e) => {
  if (cursorGlow) {
    cursorGlow.style.left = e.clientX + "px";
    cursorGlow.style.top = e.clientY + "px";
  }
});

/* QUIZ DATA LOCAL */
const quizData = [
  {
    question: "Mengapa literasi politik penting bagi generasi muda?",
    answers: [
      "Agar mudah mengikuti tren",
      "Agar memahami hak dan kewajiban sebagai warga negara",
      "Supaya terkenal di media sosial",
      "Agar bisa berdebat tanpa data"
    ],
    correct: 1
  },
  {
    question: "Apa dampak hoax politik terhadap demokrasi?",
    answers: [
      "Meningkatkan kualitas informasi",
      "Membantu masyarakat berpikir kritis",
      "Menyebabkan polarisasi dan kesalahpahaman",
      "Mempercepat pembangunan"
    ],
    correct: 2
  }
];

let currentQuiz = 0;
const question = document.getElementById("question");
const answerBtns = document.querySelectorAll(".answer-btn");

if (question && answerBtns.length > 0) {
  loadQuiz();
}

function loadQuiz() {
  if (!question) return;
  const current = quizData[currentQuiz];
  question.innerText = current.question;
  answerBtns.forEach((btn, index) => {
    btn.innerText = current.answers[index];
  });
}

/* ANSWER LOGIC */
answerBtns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    const correct = quizData[currentQuiz].correct;
    if (index === correct) {
      showToast("✅ Jawaban Benar! +25 XP");
      addXP(25);
    } else {
      showToast("❌ Jawaban Kurang Tepat");
    }

    currentQuiz++;
    if (currentQuiz < quizData.length) {
      loadQuiz();
    } else {
      question.innerText = "🎉 Quiz Selesai!";
      const answersDiv = document.querySelector(".answers");
      if (answersDiv) answersDiv.style.display = "none";
    }
  });
});

/* TOAST FUNCTION */
function showToast(message) {
  const toast = document.querySelector(".toast");
  if (toast) {
    toast.innerText = message;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }
}

/* GNEWS API */
const API_KEY = "18e89427a04c6b5440a483b5b6fbe0dc";
const articleList = document.querySelector(".article-list");

async function loadNews() {
  if (!articleList) return;
  try {
    const response = await fetch(
      `https://gnews.io/api/v4/top-headlines?category=general&lang=id&country=id&max=3&apikey=${API_KEY}`
    );
    const data = await response.json();
    articleList.innerHTML = "";

    if (!data.articles) {
      articleList.innerHTML = "<p>Berita gagal dimuat 😢</p>";
      return;
    }

    data.articles.forEach(article => {
      articleList.innerHTML += `
      <div class="article-card">
        <img src="${article.image || 'https://via.placeholder.com/300x180'}"
        style="width:100%; height:180px; object-fit:cover; border-radius:15px; margin-bottom:15px;">
        <h3>${article.title}</h3>
        <p>${article.description || "Tidak ada deskripsi"}</p>
        <a href="${article.url}" target="_blank">Baca Selengkapnya →</a>
      </div>
      `;
    });

  } catch (error) {
    console.log(error);
    articleList.innerHTML = "<p>Gagal memuat berita. Silakan periksa koneksi internet Anda atau coba lagi nanti. 😢</p>";
  }
}
loadNews();

/* OPEN QUIZ PAGE */
const startQuizBtn = document.getElementById("startQuizBtn");
const quizPage = document.getElementById("quizPage");

if (startQuizBtn && quizPage) {
  startQuizBtn.addEventListener("click", () => {
    quizPage.style.display = "block";
    quizPage.scrollIntoView({ behavior: "smooth" });
  });
}

/* AUTH SYSTEM */
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const logoutBtn = document.getElementById("logoutBtn");
const userName = document.getElementById("userName");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");

if (registerBtn) {
  registerBtn.addEventListener("click", async () => {
    if (!emailInput || !passwordInput) return;
    try {
      await createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
      alert("Akun berhasil dibuat 🚀");
    } catch (error) {
      alert(error.message);
    }
  });
}

if (loginBtn) {
  loginBtn.addEventListener("click", async () => {
    if (!emailInput || !passwordInput) return;
    try {
      await signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
      alert("Login berhasil 🚀");
    } catch (error) {
      alert(error.message);
    }
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    signOut(auth);
  });
}

/* USER STATE */
onAuthStateChanged(auth, (user) => {
  if (!userName || !logoutBtn) return;
  if (user) {
    userName.innerHTML = "Halo, " + user.email;
    logoutBtn.style.display = "block";
  } else {
    userName.innerHTML = "Belum Login";
    logoutBtn.style.display = "none";
  }
});


/* =======================================================
   🔥 DETECTOR HOAX MULTIMODAL (TEKS & GAMBAR) + LIVE SOURCE LINK
   ======================================================= */
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
      hoaxResult.innerHTML = "⚠️ Masukkan kutipan teks atau unggah gambar terlebih dahulu!";
      return;
    }

    hoaxResult.innerHTML = "🔍 <span class='typing'>POLARIS AI sedang menganalisis keaslian data & mencari sumber rujukan...</span>";

    try {
      const GEMINI_API_KEY = "AIzaSyDFYMS8Uf_8APgKQhZSOko7zUMBgnK8YJE";
      let url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

      // Prompt Engineering yang sangat ketat dipaksa menggunakan tag anchor HTML (<a>) asli
      let promptInstruction = "Bertindaklah sebagai sistem pemeriksa fakta (Fact-Checker) independen untuk politik Indonesia. Analisis teks/gambar berikut secara mendalam. Tentukan validitasnya (FAKTA / HOAX / KUTIPAN PALSU). Berikan argumen rasional. WAJIB sertakan minimal 1 link referensi asli atau rujukan situs resmi (misal: turnbackhoax.id, kominfo.go.id, atau cekfakta.com) yang relevan dengan topik. Format link wajib menggunakan tag HTML murni seperti ini: <a href='https://situs.com' target='_blank' style='color:#A78BFA; text-decoration:underline;'>Nama Situs</a>. Jangan gunakan format markdown. Seluruh output harus menggunakan variasi tag HTML paragraf (<p>) dan pemisah baris (<br>).";

      let contentsPayload = [];

      if (imageFile) {
        const base64Data = await convertToBase64(imageFile);
        contentsPayload = [{
          parts: [
            { text: `${promptInstruction}\nTeks/Konteks tambahan dari user: "${textValue}"` },
            {
              inlineData: {
                mimeType: imageFile.type,
                data: base64Data
              }
            }
          ]
        }];
      } else {
        contentsPayload = [{
          parts: [{ text: `${promptInstruction}\nTeks klaim berita: "${textValue}"` }]
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
        
        // Membersihkan konversi paksa tanda bintang tebal markdown jika AI melakukan kesalahan output
        aiOutput = aiOutput.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');

        hoaxResult.innerHTML = `
          <div style="border-left: 4px solid #00B894; padding-left: 12px; line-height: 1.6; background: rgba(255,255,255,0.03); padding: 15px; border-radius: 10px;">
            📊 <b>Hasil Verifikasi Real-time POLARIS AI:</b><br><br>
            ${aiOutput}
          </div>
        `;
      } else {
        hoaxResult.innerHTML = "❌ Format data ditolak. Tulis deskripsi klaim berita secara lebih mendetail.";
      }

    } catch (error) {
      console.error(error);
      hoaxResult.innerHTML = "❌ Terjadi gangguan server enkripsi saat memeriksa data. Coba beberapa saat lagi.";
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


/* SAVE USER DATA TO FIRESTORE */
async function saveUserData(user) {
  try {
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
      name: user.displayName || user.email.split('@')[0],
      email: user.email,
      xp: xp,
      level: level
    });
  } catch (e) {
    console.error("Gagal simpan data user: ", e);
  }
}

/* LOAD LEADERBOARD FROM FIRESTORE */
async function loadLeaderboard() {
  const leaderboardList = document.getElementById("leaderboardList");
  if (!leaderboardList) return;
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    leaderboardList.innerHTML = "";
    querySnapshot.forEach((docData) => {
      const data = docData.data();
      leaderboardList.innerHTML += `
      <li>${data.name || data.email} - ⭐ ${data.xp}</li>
      `;
    });
  } catch (e) {
    console.error("Gagal memuat leaderboard: ", e);
  }
}
