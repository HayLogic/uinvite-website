// ============================================
// Height Reporting (iframe)
// ============================================
let lastHeight = 0;

function reportHeight() {
  const height = Math.ceil(document.documentElement.scrollHeight || document.body.scrollHeight);
  if (Math.abs(height - lastHeight) > 5) {
    window.parent.postMessage({ type: 'SET_HEIGHT', height: height }, '*');
    lastHeight = height;
  }
}

// ============================================
// Countdown Timer
// ============================================
const TARGET_DATE = new Date("2026-03-15T16:00:00");

function getTimeLeft() {
  const diff = TARGET_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function updateCountdown() {
  const t = getTimeLeft();
  document.getElementById("cd-days").textContent = String(t.days).padStart(2, "0");
  document.getElementById("cd-hours").textContent = String(t.hours).padStart(2, "0");
  document.getElementById("cd-minutes").textContent = String(t.minutes).padStart(2, "0");
  document.getElementById("cd-seconds").textContent = String(t.seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ============================================
// Team Voting
// ============================================
let votes = { boy: 47, girl: 53 };
let voted = null;

function handleVote(team) {
  if (voted) return;
  voted = team;
  votes[team]++;

  const boyBtn = document.getElementById("vote-boy");
  const girlBtn = document.getElementById("vote-girl");

  // Mark voted state
  boyBtn.classList.add("voted");
  girlBtn.classList.add("voted");

  if (team === "boy") {
    boyBtn.classList.add("selected");
    girlBtn.classList.add("dimmed");
  } else {
    girlBtn.classList.add("selected");
    boyBtn.classList.add("dimmed");
  }

  // Show results
  const total = votes.boy + votes.girl;
  const boyPct = Math.round((votes.boy / total) * 100);
  const girlPct = 100 - boyPct;

  const resultsEl = document.getElementById("vote-results");
  resultsEl.style.display = "block";

  // Animate progress bars after a small delay
  setTimeout(() => {
    document.getElementById("progress-boy").style.width = boyPct + "%";
    document.getElementById("progress-boy").textContent = boyPct + "%";
    document.getElementById("progress-girl").style.width = girlPct + "%";
    document.getElementById("progress-girl").textContent = girlPct + "%";
  }, 50);

  document.getElementById("boy-count").textContent = "👦 " + votes.boy + " ձայն";
  document.getElementById("girl-count").textContent = votes.girl + " ձայն 👧";
  reportHeight();
}

// ============================================
// RSVP Form — Team prediction selection
// ============================================
function selectTeam(el, type) {
  // Clear all selections
  document.querySelectorAll("#team-options .team-option").forEach(opt => {
    opt.classList.remove("selected-boy", "selected-girl", "selected-surprise");
  });

  // Apply selected class
  if (type === "boy") el.classList.add("selected-boy");
  else if (type === "girl") el.classList.add("selected-girl");
  else el.classList.add("selected-surprise");
}

// ============================================
// RSVP Form — Submit
// ============================================
function handleRSVP(e) {
  e.preventDefault();

  // Clear previous errors
  document.getElementById("err-name").textContent = "";
  document.getElementById("err-email").textContent = "";
  document.getElementById("err-phone").textContent = "";

  const form = e.target;
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const phone = form.phone.value.trim();
  let valid = true;

  if (!name) {
    document.getElementById("err-name").textContent = "\u0531\u0576\u0578\u0582\u0576\u0568 \u057a\u0561\u0580\u057f\u0561\u0564\u056b\u0580 \u0567";
    valid = false;
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    document.getElementById("err-email").textContent = "\u054d\u056d\u0561\u056c \u0567\u056c. \u0570\u0561\u057d\u0581\u0565";
    valid = false;
  }

  if (!phone) {
    document.getElementById("err-phone").textContent = "\u0540\u0565\u057c\u0561\u056d\u0578\u057d\u0561\u0570\u0561\u0574\u0561\u0580\u0568 \u057a\u0561\u0580\u057f\u0561\u0564\u056b\u0580 \u0567";
    valid = false;
  }

  if (!valid) return;

  // Show success
  document.getElementById("rsvp-form-wrapper").style.display = "none";
  document.getElementById("rsvp-success").style.display = "block";
  reportHeight();
}

// ============================================
// Scroll Reveal (IntersectionObserver)
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  const reveals = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  reveals.forEach((el) => observer.observe(el));

  // Initial height report
  reportHeight();

  // Re-report on window resize and load
  window.addEventListener('resize', reportHeight);
  window.addEventListener('load', reportHeight);

  // Periodic check for dynamic content changes
  setInterval(reportHeight, 1500);

  // Watch for content changes (e.g. voting, reveals, RSVP)
  const heightObserver = new MutationObserver(reportHeight);
  heightObserver.observe(document.body, { attributes: true, childList: true, subtree: true });
});
