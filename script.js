document.addEventListener("DOMContentLoaded", () => {
if (window.innerWidth < 768) {
  document.querySelectorAll("button").forEach(btn => {
    btn.style.transform = "none";
  });
}
  // =====================
  // 🎵 SOUND SYSTEM
  // =====================
  const clickSound = new Audio("click.mp3");
  const successSound = new Audio("success.mp3");
  const popSound = new Audio("pop.mp3");

  clickSound.volume = 0.3;
  successSound.volume = 0.3;
  popSound.volume = 0.4;

  // =====================
  // GLOBAL ELEMENTS
  // =====================
  const overlay = document.querySelector(".mission-overlay");
  const restartBtn = document.querySelector(".restart-btn");
  const levels = document.querySelectorAll(".level");

  // =====================
  // INTRO BUTTON
  // =====================
  const startBtn = document.querySelector(".start-btn");

  if (startBtn) {
    startBtn.addEventListener("click", () => {
      document.querySelector("#level-html").scrollIntoView({
        behavior: "smooth"
      });
    });
  }

  // =====================
  // HTML LEVEL (XP SYSTEM)
  // =====================
  const addSkillBtn = document.querySelector(".add-skill");
  const skillList = document.querySelector(".skills");
  const xpFill = document.querySelector(".xp-fill");
  const xpText = document.querySelector(".xp-text");

  let skills = ["HTML", "CSS", "JavaScript", "Git", "React"];
  let index = 0;
  let xp = 0;

  if (addSkillBtn) {
    addSkillBtn.addEventListener("click", () => {
      if (index < skills.length) {

        const li = document.createElement("li");
        li.textContent = skills[index];
        skillList.appendChild(li);

        xp += 20;
        xpFill.style.width = xp + "%";
        xpText.textContent = "XP: " + xp;

        index++;
      } else {
        xpText.textContent = "MAX LEVEL REACHED 🚀";
      }
    });
  }

  // =====================
  // CSS LEVEL
  // =====================
  const fixBtn = document.querySelector(".fix-btn");
  const layout = document.querySelector(".layout-area");
  const statusText = document.querySelector(".status");

  if (fixBtn) {
    fixBtn.addEventListener("click", () => {
      layout.classList.add("glitch");

      setTimeout(() => {
        layout.classList.remove("glitch");
        layout.classList.add("layout-fixed");

        statusText.textContent = "✨ Finally Centered!";
        statusText.style.color = "lime";
      }, 800);
    });
  }

  // =====================
  // JS LEVEL (TERMINAL + ☕)
  // =====================
  const runBtn = document.querySelector(".run-btn");
  const consoleBox = document.querySelector(".console");
  const coffeeStatus = document.querySelector(".coffee-status");

  const coffeeMessages = [
    "☕ Coffee level: LOW",
    "☕ Coffee level: MEDIUM",
    "☕ Coffee level: HIGH",
    "☕ Coffee level: CRITICAL 🚨",
    "☕ Injecting caffeine...",
    "☕ Debugging powered by coffee 💀"
  ];

  if (runBtn) {
    runBtn.addEventListener("click", () => {
      consoleBox.innerHTML = "";

      const lines = [
        "Running code...",
        "undefined",
        "Fixing bug...",
        "1 bug fixed...",
        "💀 120 new bugs appeared",
        "Crying in console.log()",
        "Success (somehow) ✅"
      ];

      let i = 0;

      function typeLine() {
        if (i < lines.length) {
          const p = document.createElement("p");
          p.textContent = lines[i];
          consoleBox.appendChild(p);
          i++;
          setTimeout(typeLine, 600);
        }
      }

      typeLine();

      // ☕ coffee update
      if (coffeeStatus) {
        const random = Math.floor(Math.random() * coffeeMessages.length);
        coffeeStatus.textContent = coffeeMessages[random];
      }
    });
  }
// =====================
// DEBUG GAME 🐞 (FIXED)
// =====================

const gameArea = document.querySelector(".game-area");
const progressFill = document.querySelector(".progress-fill");
const resultText = document.querySelector(".result");
const timerEl = document.querySelector(".timer");

let score = 0;
let totalBugs = 10;
let gameStarted = false;
let gameWon = false;
let gameOver = false;
let timerInterval;
// 🐞 spawn bug
function spawnBug() {
  if (score >= totalBugs) {
    resultText.textContent = "🎉 BUGS DEFEATED!";
    gameWon = true;
    gameOver = true;

    clearInterval(timerInterval);
    return;
  }

  const bug = document.createElement("div");
  bug.classList.add("bug");
  bug.textContent = "🐞";

  bug.style.top = Math.random() * 250 + "px";
  bug.style.left = Math.random() * 90 + "%";

  gameArea.appendChild(bug);

  bug.addEventListener("click", () => {
    popSound.currentTime = 0;
    popSound.play();

    bug.remove();
    score++;

    let progress = (score / totalBugs) * 100;
    progressFill.style.width = progress + "%";

    spawnBug();
  });
}

// 🎮 start game ONLY when visible
function startGame() {

  let time = 20;
  gameWon=false;
  gameOver=false;
  resultText.textContent = "🎯 Get ready...";

  setTimeout(() => {

    resultText.textContent = "🐞 Kill the bugs!";

    spawnBug(); 

    timerInterval = setInterval(() => {
      if (gameOver) return;
      time--;
      timerEl.textContent = "⏳ Deadline: " + time + "s";

      if (time === 5) {
        resultText.textContent = "⚠ Deadline approaching!";
      }

      if (time <= 0) {
        clearInterval(timerInterval);
        gameOver = true;

        if (!gameWon) {
          resultText.textContent = "💀 Deadline missed! Client angry!";
          gameArea.innerHTML = "";

          showRestart(); // 🔥 SHOW PLAY AGAIN
        }
      }

      
    }, 1000);

  }, 1000);
}
function showRestart() {
  const btn = document.createElement("button");
  btn.textContent = "🔁 Play Again";
  btn.classList.add("restart-btn");

  resultText.appendChild(document.createElement("br"));
  resultText.appendChild(btn);

  btn.addEventListener("click", () => {
    location.reload();
  });
}
// 👀 detect when user reaches debug section
const debugSection = document.querySelector("#level-debug");

if (debugSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {

      if (entry.isIntersecting && !gameStarted) {
        gameStarted = true;
        startGame();
      }

    });
  }, {
    threshold: 0.5
  });

  observer.observe(debugSection);
}

  // =====================
  // 🎉 CONFETTI
  // =====================
  function createConfetti() {
    for (let i = 0; i < 120; i++) {
      const conf = document.createElement("div");
      conf.classList.add("confetti");

      conf.style.left = Math.random() * 100 + "vw";
      conf.style.background = `hsl(${Math.random()*360},100%,50%)`;

      const size = Math.random() * 8 + 4;
      conf.style.width = size + "px";
      conf.style.height = size + "px";
      conf.style.animationDuration = (Math.random()*2 + 2) + "s";

      document.body.appendChild(conf);
      setTimeout(() => conf.remove(), 4000);
    }
  }

  function burstCenter() {
    for (let i = 0; i < 40; i++) {
      const conf = document.createElement("div");
      conf.classList.add("confetti");

      conf.style.left = "50vw";
      conf.style.top = "50vh";
      conf.style.transform = `translate(${Math.random()*200-100}px, ${Math.random()*200-100}px)`;

      document.body.appendChild(conf);
      setTimeout(() => conf.remove(), 2000);
    }
  }

  // =====================
  // 🚀 FINAL DEPLOY
  // =====================
  const deployBtn = document.querySelector(".deploy-btn");
  const celebration = document.querySelector(".celebration");

  if (deployBtn) {
    deployBtn.addEventListener("click", () => {
      if (!gameWon) {
      alert("❌ You must fix all bugs before deploying!");
      return;
    }

      celebration.innerHTML = "🚀 Deploying...";

      setTimeout(() => {
        celebration.innerHTML = "🎉 Project Deployed Successfully!";

        successSound.play();
        createConfetti();
        burstCenter();

        document.body.classList.add("flash");
        setTimeout(() => document.body.classList.remove("flash"), 300);

        if (overlay) {
          setTimeout(() => {
            overlay.classList.add("show");
          }, 1000);
        }

      }, 1500);
    });
  }

  // =====================
  // 🔁 RESTART
  // =====================
  if (restartBtn) {
    restartBtn.addEventListener("click", () => {
      location.reload();
    });
  }

  // =====================
  // 🎯 SCROLL SYSTEM (ALL-IN-ONE)
  // =====================
  window.addEventListener("scroll", () => {

    const scrollTop = window.scrollY;
    const height = document.body.scrollHeight - window.innerHeight;
    const progress = (scrollTop / height) * 100;

    const progressBar = document.querySelector(".scroll-progress");
    if (progressBar) {
      progressBar.style.width = progress + "%";
    }

    levels.forEach(level => {
      const top = level.getBoundingClientRect().top;
      if (top < window.innerHeight - 100) {
        level.classList.add("show");
      }
    });

    const img = document.querySelector(".hero-img");
    if (img) {
      img.style.transform = `translateY(${scrollTop * 0.2}px)`;
    }

  });

  // =====================
  // 🎯 BUTTON EFFECTS + SOUND
  // =====================
  document.querySelectorAll("button").forEach(btn => {

    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width/2;
      const y = e.clientY - rect.top - rect.height/2;
      btn.style.transform = `translate(${x*0.2}px, ${y*0.2}px)`;
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "translate(0,0)";
    });

    btn.addEventListener("click", () => {
      clickSound.currentTime = 0;
      clickSound.play();
    });

  });

});