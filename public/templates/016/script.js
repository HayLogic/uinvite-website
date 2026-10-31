// ===== CONFIGURATION =====
// Set target date dynamically to show: 12 days, 7 hours, 43 minutes, 34 seconds
const countdownOffset = (12 * 24 * 60 * 60 * 1000) + (7 * 60 * 60 * 1000) + (43 * 60 * 1000) + (34 * 1000);
const TARGET_DATE = new Date(Date.now() + countdownOffset);
const CONFETTI_COLORS = [
  "hsl(38, 85%, 55%)",
  "hsl(40, 60%, 75%)",
  "hsl(350, 45%, 60%)",
  "hsl(350, 50%, 85%)",
  "hsl(0, 0%, 100%)",
  "hsl(36, 80%, 40%)",
];

// ===== DOM ELEMENTS =====
const envelopeScreen = document.getElementById('envelope-screen');
const mainContent = document.getElementById('main-content');
const letter = document.querySelector('.letter');
const envelopeFlap = document.querySelector('.envelope-flap');
const envelopeSeal = document.querySelector('.envelope-seal');
const envelopeCta = document.querySelector('.envelope-cta');
const confettiContainer = document.getElementById('confetti-burst');
const fallingConfettiContainer = document.getElementById('falling-confetti');
const rsvpForm = document.getElementById('rsvp-form');
const rsvpFormContainer = document.getElementById('rsvp-form-container');
const rsvpSuccess = document.getElementById('rsvp-success');
const guestNameSpan = document.getElementById('guest-name');

// ===== STATE =====
let isOpening = false;
let lastHeight = 0;

// ===== HEIGHT REPORTING =====
function reportHeight() {
  const height = Math.ceil(document.documentElement.scrollHeight || document.body.scrollHeight);
  if (Math.abs(height - lastHeight) > 5) {
    window.parent.postMessage({ type: 'SET_HEIGHT', height: height }, '*');
    lastHeight = height;
  }
}

// ===== ENVELOPE FUNCTIONS =====
function createConfettiBurst() {
  confettiContainer.innerHTML = '';

  for (let i = 0; i < 40; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';

    const x = (Math.random() - 0.5) * 600;
    const y = (Math.random() - 0.5) * 600 - 200;
    const rotation = Math.random() * 720 - 360;
    const color = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
    const size = Math.random() * 8 + 4;
    const delay = Math.random() * 0.3;
    const isCircle = Math.random() > 0.5;

    piece.style.cssText = `
      width: ${size}px;
      height: ${isCircle ? size : size * 0.6}px;
      background-color: ${color};
      border-radius: ${isCircle ? '50%' : '2px'};
      --tx: ${x}px;
      --ty: ${y}px;
      --rot: ${rotation}deg;
      animation: confetti-burst 1.5s ease-out ${delay}s forwards;
    `;

    confettiContainer.appendChild(piece);
  }
}

function createFallingConfetti() {
  fallingConfettiContainer.innerHTML = '';

  for (let i = 0; i < 50; i++) {
    const piece = document.createElement('div');
    piece.className = 'falling-piece';

    const color = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
    const size = Math.random() * 10 + 5;
    const leftPos = Math.random() * 100;
    const delay = Math.random() * 2;
    const duration = 3 + Math.random() * 2;
    const isCircle = Math.random() > 0.5;

    piece.style.cssText = `
      left: ${leftPos}%;
      width: ${size}px;
      height: ${isCircle ? size : size * 0.6}px;
      background-color: ${color};
      border-radius: ${isCircle ? '50%' : '2px'};
      animation-delay: ${delay}s;
      animation-duration: ${duration}s;
    `;

    fallingConfettiContainer.appendChild(piece);
  }
}

function openEnvelope() {
  if (isOpening) return;
  isOpening = true;

  // Create confetti burst
  createConfettiBurst();

  // Animate envelope opening
  envelopeFlap.classList.add('opening');
  envelopeSeal.classList.add('opening');
  envelopeCta.classList.add('hidden');

  // Animate letter sliding up
  setTimeout(() => {
    letter.classList.add('opening');
  }, 500);

  // Show main content
  setTimeout(() => {
    envelopeScreen.classList.add('hidden');
    mainContent.classList.add('visible');

    // Completely remove from flow after transition
    setTimeout(() => {
      envelopeScreen.style.display = 'none';
    }, 600);

    // Start falling confetti
    createFallingConfetti();

    // Remove falling confetti after animation
    setTimeout(() => {
      fallingConfettiContainer.innerHTML = '';
    }, 5000);

    // Initialize reveal animations
    initRevealAnimations();
  }, 2200);
}

// ===== COUNTDOWN TIMER =====
function calculateTimeLeft() {
  const now = new Date();
  const diff = TARGET_DATE.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function updateCountdown() {
  const timeLeft = calculateTimeLeft();

  const daysEl = document.getElementById('countdown-days');
  const hoursEl = document.getElementById('countdown-hours');
  const minutesEl = document.getElementById('countdown-minutes');
  const secondsEl = document.getElementById('countdown-seconds');

  if (daysEl) daysEl.textContent = String(timeLeft.days).padStart(2, '0');
  if (hoursEl) hoursEl.textContent = String(timeLeft.hours).padStart(2, '0');
  if (minutesEl) minutesEl.textContent = String(timeLeft.minutes).padStart(2, '0');
  if (secondsEl) secondsEl.textContent = String(timeLeft.seconds).padStart(2, '0');
}

// ===== RSVP FORM =====
function handleRsvpSubmit(e) {
  e.preventDefault();

  const name = rsvpNameInput.value.trim();
  const guests = rsvpGuestsSelect.value;
  const dietary = rsvpDietaryInput.value.trim();
  const comment = rsvpCommentTextarea.value.trim();

  if (!name) return;

  // Display success screen
  guestNameSpan.textContent = name;
  rsvpFormContainer.style.display = 'none';
  rsvpSuccess.classList.add('visible');

  // Update success date text
  const successDate = rsvpSuccess.querySelector('.rsvp-success-date');
  if (successDate) {
    successDate.textContent = `Սպասում ենք Ձեզ հունիսի 15-ին, ժամը 18:00-ին`;
  }

  console.log("RSVP Submitted:", { name, guests, dietary, comment });
  reportHeight();
}

// ===== REVEAL ANIMATIONS =====
function initRevealAnimations() {
  const revealElements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

// ===== SPARKLES ANIMATION =====
function createSparkles() {
  const sparklesContainer = document.querySelector('.sparkles-container');
  if (!sparklesContainer) return;

  for (let i = 0; i < 8; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="${16 + Math.random() * 16}" height="${16 + Math.random() * 16}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>`;

    sparkle.style.left = `${10 + Math.random() * 80}%`;
    sparkle.style.top = `${10 + Math.random() * 80}%`;
    sparkle.style.animationDelay = `${Math.random() * 2}s`;
    sparkle.style.animationDuration = `${3 + Math.random() * 2}s`;

    sparklesContainer.appendChild(sparkle);
  }
}

// ===== HOVER EFFECTS =====
function initHoverEffects() {
  // Gift cards hover
  const giftCards = document.querySelectorAll('.gift-card');
  giftCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-4px)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });
  });

  // Location icon hover
  const locationIcon = document.querySelector('.location-icon');
  if (locationIcon) {
    locationIcon.addEventListener('mouseenter', () => {
      locationIcon.style.transform = 'scale(1.1)';
    });
    locationIcon.addEventListener('mouseleave', () => {
      locationIcon.style.transform = 'scale(1)';
    });
  }
}

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
  // Create sparkles
  createSparkles();

  // Add envelope click handler
  if (envelopeScreen) {
    envelopeScreen.addEventListener('click', openEnvelope);
  }

  // Add float animation to envelope
  const envelopeWrapper = document.querySelector('.envelope-wrapper');
  if (envelopeWrapper) {
    envelopeWrapper.classList.add('animate-float');
  }

  // Start countdown
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // RSVP form handler
  if (rsvpForm) {
    rsvpForm.addEventListener('submit', handleRsvpSubmit);
  }

  // Initialize hover effects
  initHoverEffects();

  // Add pulse animation to letter heart
  const letterHeart = document.querySelector('.letter-heart svg');
  if (letterHeart) {
    letterHeart.classList.add('animate-pulse');
  }

  // Initial height report
  reportHeight();

  // Re-report on window resize and load
  window.addEventListener('resize', reportHeight);
  window.addEventListener('load', reportHeight);

  // Periodic check for dynamic content changes
  setInterval(reportHeight, 1500);

  // Watch for content changes (e.g. envelope opening, reveals)
  const heightObserver = new MutationObserver(reportHeight);
  heightObserver.observe(document.body, { attributes: true, childList: true, subtree: true });
});
