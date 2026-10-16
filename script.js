const heartWrap = document.querySelector(".heart-wrap");
const cloud = document.getElementById("message-cloud");
const startButton = document.getElementById("startButton");
const song = document.getElementById("loveSong");
const volume = document.getElementById("volume");
const volumeValue = document.getElementById("volumeValue");
const statusText = document.getElementById("status");

const phrases = [
  "I love you ❤️", "รักนะ 💗", "You are special", "คิดถึงนะ",
  "My favorite person", "อยู่ด้วยกันนาน ๆ นะ", "Love you more",
  "เธอคือรอยยิ้มของฉัน", "Always yours", "ส่งหัวใจให้ 💕"
];
const colors = ["#ff4fa3", "#ff315d", "#ff8ad8", "#ffffff", "#ff6b35", "#f5a7ff"];
let started = false;
let phraseTimer = null;

function addLoveWords() {
  cloud.innerHTML = "";
  // วางข้อความเป็นชั้น ๆ ภายในรูปหัวใจ โดยให้มีพื้นที่ห่างกัน
  const rows = [
    { y: 19, count: 3, spread: 43 },
    { y: 30, count: 5, spread: 68 },
    { y: 41, count: 6, spread: 76 },
    { y: 52, count: 6, spread: 70 },
    { y: 63, count: 5, spread: 55 },
    { y: 74, count: 4, spread: 38 },
    { y: 84, count: 2, spread: 19 }
  ];
  let index = 0;
  rows.forEach((row, rowIndex) => {
    for (let i = 0; i < row.count; i++) {
      const el = document.createElement("span");
      el.className = "love-word";
      el.textContent = phrases[Math.floor(Math.random() * phrases.length)];
      el.style.color = colors[Math.floor(Math.random() * colors.length)];
      const x = row.count === 1 ? 50 : 50 - row.spread / 2 + (row.spread * i / (row.count - 1));
      // สลับตำแหน่งแนวตั้งเล็กน้อยให้ข้อความไม่เป็นเส้นตรงจนเกินไป
      const y = row.y + (i % 2 ? 2.5 : -2.5);
      el.style.left = `${x}%`;
      el.style.top = `${y}%`;
      el.style.fontSize = `${Math.random() * 3 + 10}px`;
      el.style.animationDelay = `${index * 0.13}s`;
      cloud.appendChild(el);
      index++;
    }
  });
}

async function startExperience() {
  if (started) {
    if (song.paused) {
      try { await song.play(); statusText.textContent = "เพลงกำลังเล่นอยู่ 💗"; }
      catch { statusText.textContent = "แตะปุ่มอีกครั้งเพื่ออนุญาตให้เล่นเพลง"; }
    } else {
      song.pause();
      statusText.textContent = "หยุดเพลงชั่วคราว";
      startButton.textContent = "เล่นเพลงต่อ ♫";
    }
    return;
  }

  started = true;
  heartWrap.classList.add("started");
  addLoveWords();
  // กระจายข้อความทีละชั้น เพื่อให้แอนิเมชันไม่เร็วเกินไป
  phraseTimer = setInterval(addLoveWords, 12000);
  song.volume = Number(volume.value);
  try {
    await song.play();
    statusText.textContent = "เพลงกำลังเล่น ขอให้มีความสุขนะ ❤️";
    startButton.textContent = "หยุด / เล่นเพลง ♫";
  } catch (error) {
    statusText.textContent = "เปิดหัวใจแล้ว แต่เล่นเพลงไม่ได้ ตรวจสอบไฟล์ love.mp3";
    startButton.textContent = "ลองเปิดเพลงอีกครั้ง ♫";
  }
}

volume.addEventListener("input", () => {
  song.volume = Number(volume.value);
  volumeValue.textContent = `${Math.round(Number(volume.value) * 100)}%`;
});
startButton.addEventListener("click", startExperience);
