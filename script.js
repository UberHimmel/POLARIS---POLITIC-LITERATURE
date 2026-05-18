console.log("POLARIS READY 🚀");

/* MENU */

const menuBtn =
document.querySelector(".menu-btn");

const sidebar =
document.querySelector(".sidebar");

menuBtn.addEventListener("click", ()=>{

  sidebar.classList.toggle("active");

});

/* TYPING EFFECT */

const text =
"Platform Literasi Politik untuk Generasi Melek, Kritis, dan Berpartisipasi";

const typingText =
document.getElementById("typing-text");

let index = 0;

function typeEffect(){

  if(index < text.length){

    typingText.innerHTML +=
    text.charAt(index);

    index++;

    setTimeout(typeEffect,40);

  }

}

typeEffect();

/* LOADER */

const loader =
document.querySelector(".loader");

window.addEventListener("load", ()=>{

  setTimeout(()=>{

    loader.classList.add("hide");

  },1500);

});

/* AI POPUP */

const aiPopup =
document.getElementById("aiPopup");

const closeAI =
document.getElementById("closeAI");

const openChat =
document.getElementById("openChat");

closeAI.addEventListener("click", ()=>{

  aiPopup.style.display = "none";

  openChat.style.display = "block";

});

openChat.addEventListener("click", ()=>{

  aiPopup.style.display = "flex";

  openChat.style.display = "none";

});

/* AI CHAT */

const sendAI =
document.getElementById("sendAI");

const aiInput =
document.getElementById("aiInput");

const aiBody =
document.getElementById("aiBody");

/* SEND BUTTON */

sendAI.addEventListener(
"click",
sendMessage
);

/* ENTER KEY */

aiInput.addEventListener(
"keypress",
(e)=>{

  if(e.key === "Enter"){

    sendMessage();

  }

});

function sendMessage(){

  const text =
  aiInput.value.trim();

  if(text === "") return;

  /* USER MESSAGE */

  const userMsg =
  document.createElement("div");

  userMsg.classList.add(
  "user-message"
  );

  userMsg.innerText = text;

  aiBody.appendChild(userMsg);
  
  saveChat();

  aiInput.value = "";

  aiBody.scrollTop =
  aiBody.scrollHeight;

  /* TYPING EFFECT */

  const typing =
  document.createElement("div");

  typing.classList.add(
  "ai-message",
  "typing"
  );

  typing.innerText =
  "POLARIS AI sedang mengetik...";

  aiBody.appendChild(typing);

  aiBody.scrollTop =
  aiBody.scrollHeight;

  setTimeout(()=>{

    typing.remove();

    /* BOT MESSAGE */

    const botMsg =
    document.createElement("div");

    botMsg.classList.add(
    "ai-message"
    );

    typeBotMessage(
botMsg,
getAIResponse(text)
);

    aiBody.appendChild(botMsg);

    aiBody.scrollTop =
    aiBody.scrollHeight;
    
    saveChat();

  },1200);

}

/* AI RESPONSE */

function getAIResponse(message){

  message =
  message.toLowerCase();

  /* SAPAAN */

  if(
    message.includes("halo") ||
    message.includes("hai") ||
    message.includes("hi")
  ){

    return "Halo Polarisian! 🚀 Ada topik politik atau demokrasi yang ingin kamu bahas?";
  }

  /* POLITIK */

  if(
    message.includes("politik")
  ){

    return "Politik adalah proses pengambilan keputusan dalam masyarakat dan negara 🌍";
  }

  /* DEMOKRASI */

  if(
    message.includes("demokrasi")
  ){

    return "Demokrasi adalah sistem dimana rakyat memiliki hak memilih dan menyampaikan pendapat 👥";
  }

  /* PEMILU */

  if(
    message.includes("pemilu")
  ){

    return "Pemilu adalah sarana demokrasi untuk memilih pemimpin dan wakil rakyat 🗳️";
  }

  /* HOAX */

  if(
    message.includes("hoax")
  ){

    return "Hoax biasanya memakai judul emosional dan provokatif. Selalu cek fakta sebelum menyebarkan informasi 🔍";
  }

  /* KORUPSI */

  if(
    message.includes("korupsi")
  ){

    return "Korupsi adalah penyalahgunaan kekuasaan demi keuntungan pribadi dan dapat merugikan masyarakat ⚖️";
  }

  /* HAM */

  if(
    message.includes("ham")
  ){

    return "HAM adalah Hak Asasi Manusia, yaitu hak dasar yang dimiliki setiap manusia sejak lahir ✨";
  }

  /* DPR */

  if(
    message.includes("dpr")
  ){

    return "DPR adalah lembaga legislatif yang memiliki fungsi membuat undang-undang dan mengawasi pemerintah 🏛️";
  }

  /* PRESIDEN */

  if(
    message.includes("presiden")
  ){

    return "Presiden adalah kepala negara sekaligus kepala pemerintahan di Indonesia 🇮🇩";
  }

  /* ANAK MUDA */

  if(
    message.includes("anak muda") ||
    message.includes("generasi muda")
  ){

    return "Generasi muda punya peran besar dalam menjaga demokrasi dan melawan penyebaran hoax 🚀";
  }

  /* TERIMA KASIH */

  if(
    message.includes("terima kasih") ||
    message.includes("makasih")
  ){

    return "Sama-sama Polarisian! 🚀";
  }

  /* DEFAULT */

  return "Aku POLARIS AI 🚀 Saat ini aku masih belajar memahami pertanyaan politik yang lebih kompleks.";
}

/* BOT TYPING EFFECT */

function typeBotMessage(
element,
text
){

  let i = 0;

  function typing(){

    if(i < text.length){

      element.innerHTML +=
      text.charAt(i);

      i++;

      aiBody.scrollTop =
      aiBody.scrollHeight;

      setTimeout(
        typing,
        20
      );

    }

  }

  typing();

}

/* SAVE CHAT */

function saveChat(){

  localStorage.setItem(
    "polarisChat",
    aiBody.innerHTML
  );

}

/* LOAD CHAT */

window.addEventListener("load", ()=>{

  const savedChat =
  localStorage.getItem(
    "polarisChat"
  );

  if(savedChat){

    aiBody.innerHTML =
    savedChat;

  }

});

/* XP SYSTEM */

let xp = 0;

let level = 1;

const xpPoints =
document.getElementById(
"xpPoints"
);

const userLevel =
document.getElementById(
"userLevel"
);

const xpFill =
document.getElementById(
"xpFill"
);

/* LOAD XP */

const savedXP =
localStorage.getItem(
"polarisXP"
);

const savedLevel =
localStorage.getItem(
"polarisLevel"
);

if(savedXP){

  xp = parseInt(savedXP);

}

if(savedLevel){

  level = parseInt(savedLevel);

}

updateXP();

/* ADD XP */

function addXP(amount){

  xp += amount;

  /* LEVEL UP */

  if(xp >= 100){

    xp = 0;

    level++;

    showToast(
      "🚀 Level Naik ke Level "
      + level
    );

  }

  updateXP();

  localStorage.setItem(
    "polarisXP",
    xp
  );

  localStorage.setItem(
    "polarisLevel",
    level
  );

}

/* UPDATE UI */

function updateXP(){

  xpPoints.innerHTML =
  "⭐ " + xp;

  userLevel.innerHTML =
  "Level " + level;

  xpFill.style.width =
  xp + "%";

}

const cursorGlow =
document.querySelector(".cursor-glow");

document.addEventListener("mousemove",(e)=>{

  if(cursorGlow){

    cursorGlow.style.left =
    e.clientX + "px";

    cursorGlow.style.top =
    e.clientY + "px";

  }

});

function tambahXP(){

  xp += 10;

  if(xp > 100){
    xp = 100;
  }

  document.querySelector(".xp-fill")
  .style.width = xp + "%";

}

const quizData = [

  {

    question:
    "Mengapa literasi politik penting bagi generasi muda?",

    answers:[
      "Agar mudah mengikuti tren",
      "Agar memahami hak dan kewajiban sebagai warga negara",
      "Supaya terkenal di media sosial",
      "Agar bisa berdebat tanpa data"
    ],

    correct:1

  },

  {

    question:
    "Apa dampak hoax politik terhadap demokrasi?",

    answers:[
      "Meningkatkan kualitas informasi",
      "Membantu masyarakat berpikir kritis",
      "Menyebabkan polarisasi dan kesalahpahaman",
      "Mempercepat pembangunan"
    ],

    correct:2

  }

];

let currentQuiz = 0;

const question =
document.getElementById(
"question"
);

const answerBtns =
document.querySelectorAll(
".answer-btn"
);

loadQuiz();

function loadQuiz(){

  const current =
  quizData[currentQuiz];

  question.innerText =
  current.question;

  answerBtns.forEach(
  (btn,index)=>{

    btn.innerText =
    current.answers[index];

  });

}

/* ANSWER */

answerBtns.forEach(
(btn,index)=>{

  btn.addEventListener(
  "click",
  ()=>{

    const correct =
    quizData[currentQuiz].correct;

    if(index === correct){

      showToast(
      "✅ Jawaban Benar! +25 XP"
      );

      addXP(25);

    }else{

      showToast(
      "❌ Jawaban Kurang Tepat"
      );

    }

    currentQuiz++;

    if(
      currentQuiz <
      quizData.length
    ){

      loadQuiz();

    }else{

      question.innerText =
      "🎉 Quiz Selesai!";

      document.querySelector(
      ".answers"
      ).style.display =
      "none";

    }

  });

});

/* TOAST FUNCTION */

function showToast(message){

  const toast =
  document.querySelector(".toast");

  toast.innerText = message;

  toast.classList.add("show");

  setTimeout(()=>{

    toast.classList.remove("show");

  },3000);

}

/* GNEWS API */

const API_KEY =
"18e89427a04c6b5440a483b5b6fbe0dc";

const articleList =
document.querySelector(".article-list");

async function loadNews(){

  try{

    const response =
    await fetch(
      `https://gnews.io/api/v4/top-headlines?category=general&lang=id&country=id&max=3&apikey=${API_KEY}`
    );

    const data =
    await response.json();

    console.log(data);

    articleList.innerHTML = "";

    if(!data.articles){

      articleList.innerHTML =
      "<p>Berita gagal dimuat 😢</p>";

      return;
    }

    data.articles.forEach(article=>{

      articleList.innerHTML += `

      <div class="article-card">

        <img
        src="${article.image || 'https://via.placeholder.com/300x180'}"

        style="
        width:100%;
        height:180px;
        object-fit:cover;
        border-radius:15px;
        margin-bottom:15px;
        ">

        <h3>${article.title}</h3>

        <p>
          ${article.description || "Tidak ada deskripsi"}
        </p>

        <a href="${article.url}"
        target="_blank">

        Baca Selengkapnya →

        </a>

      </div>

      `;

    });

  }catch(error){

    console.log(error);

    articleList.innerHTML =
    "<p>Gagal memuat berita 😢</p>";

  }

}

loadNews();

/* OPEN QUIZ PAGE */

const startQuizBtn =
document.getElementById(
"startQuizBtn"
);

const quizPage =
document.getElementById(
"quizPage"
);

startQuizBtn.addEventListener(
"click",
()=>{

  quizPage.style.display =
  "block";

  quizPage.scrollIntoView({
    behavior:"smooth"
  });

});

/* BUTTON */

const loginBtn =
document.getElementById("loginBtn");

const logoutBtn =
document.getElementById("logoutBtn");

const userName =
document.getElementById("userName");

/* LOGIN */

loginBtn.addEventListener("click", async()=>{

  try{

    await signInWithPopup(
      auth,
      provider
    );

  }catch(error){

    alert(error.message);

  }

});

/* LOGOUT */

logoutBtn.addEventListener("click", ()=>{

  signOut(auth);

});

/* USER STATE */

onAuthStateChanged(auth,(user)=>{

  if(user){

    userName.innerHTML =
    "Halo, " + user.displayName;

    loginBtn.style.display =
    "none";

    logoutBtn.style.display =
    "block";

  }else{

    userName.innerHTML =
    "Belum Login";

    loginBtn.style.display =
    "block";

    logoutBtn.style.display =
    "none";

  }

});

/* HOAX DETECTOR */

const hoaxInput =
document.getElementById(
"hoaxInput"
);

const checkHoaxBtn =
document.getElementById(
"checkHoaxBtn"
);

const hoaxResult =
document.getElementById(
"hoaxResult"
);

checkHoaxBtn.addEventListener(
"click",
()=>{

  const text =
  hoaxInput.value.toLowerCase();

  if(text === ""){

    hoaxResult.innerHTML =
    "⚠️ Masukkan informasi terlebih dahulu";

    return;
  }

  /* DETEKSI SEDERHANA */

  if(

    text.includes("sebarkan") ||
    text.includes("viralkan") ||
    text.includes("darurat") ||
    text.includes("pasti benar") ||
    text.includes("100%")

  ){

    hoaxResult.innerHTML =

    `
    🚨 <b>Kemungkinan Hoax Tinggi</b>

    <br><br>

    Informasi mengandung ciri manipulatif atau provokatif.

    <br><br>

    ✅ Tips:
    <br>
    - cek sumber resmi
    <br>
    - cek tanggal berita
    <br>
    - bandingkan media lain
    `;

  }else{

    hoaxResult.innerHTML =

    `
    ✅ <b>Tidak ditemukan indikasi hoax besar</b>

    <br><br>

    Tapi tetap lakukan verifikasi informasi dari sumber terpercaya.
    `;
  }

});
