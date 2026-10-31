// ============================
// SUMMIT 2025 — Vanilla JS
// ============================

document.addEventListener('DOMContentLoaded', () => {

  // ---------------------------
  // 1. Scroll Progress Bar
  // ---------------------------
  const scrollProgress = document.getElementById('scroll-progress');

  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = percent + '%';
    scrollProgress.setAttribute('aria-valuenow', Math.round(percent));
  }

  window.addEventListener('scroll', updateScrollProgress, { passive: true });

  // ---------------------------
  // 2. Cursor Spotlight
  // ---------------------------
  const spotlight = document.getElementById('cursor-spotlight');
  const spotlightCircle = spotlight.querySelector('.spotlight-circle');
  let spotlightVisible = false;

  function onMouseMove(e) {
    spotlightCircle.style.left = (e.clientX - 200) + 'px';
    spotlightCircle.style.top = (e.clientY - 200) + 'px';
    if (!spotlightVisible) {
      spotlight.style.opacity = '1';
      spotlightVisible = true;
    }
  }

  function onMouseLeave() {
    spotlight.style.opacity = '0';
    spotlightVisible = false;
  }

  function onMouseEnter() {
    spotlight.style.opacity = '1';
    spotlightVisible = true;
  }

  window.addEventListener('mousemove', onMouseMove, { passive: true });
  document.addEventListener('mouseleave', onMouseLeave);
  document.addEventListener('mouseenter', onMouseEnter);

  // ---------------------------
  // 3. Navigation Scroll Effect
  // ---------------------------
  const nav = document.getElementById('main-nav');

  function updateNavScroll() {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateNavScroll, { passive: true });

  // ---------------------------
  // 4. Mobile Menu Toggle
  // ---------------------------
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  let mobileOpen = false;

  mobileMenuBtn.addEventListener('click', () => {
    mobileOpen = !mobileOpen;
    mobileMenuBtn.classList.toggle('open', mobileOpen);
    mobileMenu.classList.toggle('open', mobileOpen);
    mobileMenuBtn.setAttribute('aria-expanded', mobileOpen);
  });

  // Close mobile menu on link click
  document.querySelectorAll('[data-mobile-link]').forEach(link => {
    link.addEventListener('click', () => {
      mobileOpen = false;
      mobileMenuBtn.classList.remove('open');
      mobileMenu.classList.remove('open');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // ---------------------------
  // 5. Particle Canvas
  // ---------------------------
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');
  const PARTICLE_COUNT = 80;
  const CONNECTION_DISTANCE = 150;
  let particles = [];
  let animationId;

  function resizeCanvas() {
    const hero = document.querySelector('.hero');
    canvas.width = hero ? hero.offsetWidth : window.innerWidth;
    canvas.height = hero ? hero.offsetHeight : window.innerHeight;
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 87, 255, ' + p.opacity + ')';
      ctx.fill();
    });

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < CONNECTION_DISTANCE) {
          const opacity = (1 - distance / CONNECTION_DISTANCE) * 0.15;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = 'rgba(0, 87, 255, ' + opacity + ')';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    animationId = requestAnimationFrame(animateParticles);
  }

  resizeCanvas();
  initParticles();
  animateParticles();

  window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
  });

  // ---------------------------
  // 6. Countdown Timer
  // ---------------------------
  const cdDays = document.getElementById('cd-days');
  const cdHours = document.getElementById('cd-hours');
  const cdMins = document.getElementById('cd-mins');
  const cdSecs = document.getElementById('cd-secs');

  function updateCountdown() {
    // Static values as requested: 15 days, 20 hours, 45 minutes, 24 seconds
    cdDays.textContent = '15';
    cdHours.textContent = '20';
    cdMins.textContent = '45';
    cdSecs.textContent = '24';
  }

  updateCountdown();
  // No interval needed for static countdown

  // ---------------------------
  // 7. IntersectionObserver — Animate on scroll
  // ---------------------------
  function createInViewObserver(threshold) {
    return new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;

          // Animate stat cards
          el.querySelectorAll('.stat-card').forEach(card => {
            card.classList.add('visible');
          });

          // Animate reason cards
          el.querySelectorAll('.reason-card').forEach((card, i) => {
            const delay = card.getAttribute('data-delay') || (i * 150);
            setTimeout(() => card.classList.add('visible'), delay);
          });

          // Animate speaker cards
          el.querySelectorAll('.speaker-card').forEach((card, i) => {
            const delay = card.getAttribute('data-delay') || (i * 100);
            setTimeout(() => card.classList.add('visible'), delay);
          });

          // Animate timeline items
          el.querySelectorAll('.timeline-item').forEach((item, i) => {
            const delay = item.getAttribute('data-delay') || (i * 80);
            setTimeout(() => item.classList.add('visible'), delay);
          });

          // Animate venue grid
          const venueGrid = el.querySelector('.venue-grid');
          if (venueGrid) venueGrid.classList.add('visible');

          // Animate RSVP card
          const rsvpCard = el.querySelector('.rsvp-card');
          if (rsvpCard) rsvpCard.classList.add('visible');

          // Start counter animation
          el.querySelectorAll('[data-counter]').forEach(card => {
            animateCounter(card);
          });

          // Unobserve after triggering
          observer.unobserve(el);
        }
      });
    }, { threshold: threshold });
  }

  // Create observers for different thresholds
  document.querySelectorAll('[data-in-view]').forEach(el => {
    const threshold = parseFloat(el.getAttribute('data-in-view')) || 0.2;
    const observer = createInViewObserver(threshold);
    observer.observe(el);
  });

  // ---------------------------
  // 8. Animated Counter
  // ---------------------------
  function animateCounter(card) {
    const target = parseInt(card.getAttribute('data-counter'));
    const suffix = card.getAttribute('data-suffix') || '';
    const valueEl = card.querySelector('.stat-value');
    const duration = 2000;
    let startTime = null;

    function animate(currentTime) {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      valueEl.textContent = Math.floor(eased * target) + suffix;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }

  // ---------------------------
  // 9. Agenda Accordion
  // ---------------------------
  let expandedAgenda = null;

  document.querySelectorAll('[data-agenda]').forEach(btn => {
    btn.addEventListener('click', () => {
      const index = btn.getAttribute('data-agenda');
      const expandEl = document.querySelector('[data-expand="' + index + '"]');
      const chevron = btn.querySelector('.track-chevron');

      if (expandedAgenda === index) {
        // Close current
        expandEl.classList.remove('open');
        chevron.classList.remove('rotated');
        btn.classList.remove('active');
        btn.setAttribute('aria-expanded', 'false');
        expandedAgenda = null;
      } else {
        // Close previously open
        if (expandedAgenda !== null) {
          const prevExpand = document.querySelector('[data-expand="' + expandedAgenda + '"]');
          const prevBtn = document.querySelector('[data-agenda="' + expandedAgenda + '"]');
          const prevChevron = prevBtn.querySelector('.track-chevron');
          prevExpand.classList.remove('open');
          prevChevron.classList.remove('rotated');
          prevBtn.classList.remove('active');
          prevBtn.setAttribute('aria-expanded', 'false');
        }

        // Open new
        expandEl.classList.add('open');
        chevron.classList.add('rotated');
        btn.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
        expandedAgenda = index;
      }
    });
  });

  // ---------------------------
  // 10. RSVP Form
  // ---------------------------
  const rsvpForm = document.getElementById('rsvp-form');
  const rsvpCard = document.getElementById('rsvp-card');
  const rsvpSuccess = document.getElementById('rsvp-success');

  rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('rsvp-name').value;
    const email = document.getElementById('rsvp-email').value;

    document.getElementById('rsvp-success-name').textContent = name;
    document.getElementById('rsvp-success-email').textContent = email;

    rsvpCard.style.display = 'none';
    rsvpSuccess.style.display = 'block';
  });

  // ---------------------------
  // 11. Copy Email (Footer)
  // ---------------------------
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const copyEmailText = document.getElementById('copy-email-text');

  copyEmailBtn.addEventListener('click', () => {
    navigator.clipboard.writeText('info@summit2025.am').then(() => {
      copyEmailText.textContent = 'Պատճենված է!';
      setTimeout(() => {
        copyEmailText.textContent = 'info@summit2025.am';
      }, 2000);
    });
  });

});

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
document.addEventListener('DOMContentLoaded', () => {
  const heightObserver = new MutationObserver(reportHeight);
  if (document.body) {
    heightObserver.observe(document.body, { attributes: true, childList: true, subtree: true });
  }
});
