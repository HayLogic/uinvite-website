
// ===== REVEAL ON SCROLL =====
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });
reveals.forEach(r => observer.observe(r));

// ===== COUNTDOWN =====
// ===== COUNTDOWN =====
// The countdown is now completely static as requested by the user.
// Values are set directly in the HTML.

// ===== GOLDEN CONFETTI PARTICLES =====
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
resize();

const particles = [];
const colors = ['#C9A84C', '#E8C96A', '#F0D898', 'rgba(255,255,255,0.6)', '#D4A928'];

for (let i = 0; i < 60; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2.5 + 0.5,
    color: colors[Math.floor(Math.random() * colors.length)],
    speedY: Math.random() * 0.3 + 0.1,
    speedX: (Math.random() - 0.5) * 0.2,
    opacity: Math.random() * 0.6 + 0.2,
    pulse: Math.random() * Math.PI * 2
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.pulse += 0.02;
    const alpha = p.opacity * (0.7 + 0.3 * Math.sin(p.pulse));
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.color.replace(')', `, ${alpha})`).replace('rgb(', 'rgba(').replace('#', 'rgba(');
    // Simpler approach:
    ctx.globalAlpha = alpha;
    ctx.fillStyle = p.color;
    ctx.fill();
    ctx.globalAlpha = 1;
    p.y -= p.speedY;
    p.x += p.speedX;
    if (p.y < -5) {
      p.y = canvas.height + 5;
      p.x = Math.random() * canvas.width;
    }
  });
  requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', resize);

// ==========================================
// Height reporting for iframe embed
// ==========================================
let lastHeight = 0;

function reportHeight() {
  const height = Math.ceil(document.documentElement.scrollHeight || document.body.scrollHeight);
  if (Math.abs(height - lastHeight) > 5) {
    window.parent.postMessage({ type: 'SET_HEIGHT', height: height }, '*');
    lastHeight = height;
  }
}

// Initial height report
reportHeight();

// Re-report on window resize and load
window.addEventListener('resize', reportHeight);
window.addEventListener('load', reportHeight);

// Periodic check for dynamic content changes
setInterval(reportHeight, 1500);

// Watch for content changes
const heightObserver = new MutationObserver(reportHeight);
heightObserver.observe(document.body, { attributes: true, childList: true, subtree: true });

// ==========================================
// RSVP Form Logic
// ==========================================
(function () {
  const btnAccept = document.getElementById('btn-accept');
  const btnDecline = document.getElementById('btn-decline');
  const guestsField = document.getElementById('guests-field');

  if (btnAccept && btnDecline && guestsField) {
    btnAccept.addEventListener('click', function () {
      btnAccept.style.background = 'var(--gold)';
      btnAccept.style.color = 'white';
      btnAccept.style.opacity = '1';
      btnDecline.style.background = 'transparent';
      btnDecline.style.color = 'var(--burgundy)';
      btnDecline.style.opacity = '0.6';
      guestsField.style.display = 'block';
      if (typeof reportHeight === 'function') reportHeight();
    });

    btnDecline.addEventListener('click', function () {
      btnDecline.style.background = 'var(--gold)';
      btnDecline.style.color = 'white';
      btnDecline.style.opacity = '1';
      btnAccept.style.background = 'transparent';
      btnAccept.style.color = 'var(--burgundy)';
      btnAccept.style.opacity = '0.6';
      guestsField.style.display = 'none';
      if (typeof reportHeight === 'function') reportHeight();
    });
  }

  const form = document.getElementById('rsvp-form');
  const success = document.getElementById('rsvp-success');

  if (form && success) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      form.style.display = 'none';
      success.style.display = 'block';
      if (typeof reportHeight === 'function') reportHeight();
    });
  }
})();
