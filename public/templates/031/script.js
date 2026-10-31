/* ===================================================
   The Autumn Design Gala — Invitation Site
   JavaScript: Animations, Interactions, Effects
   =================================================== */

(function () {
  'use strict';

  /* -------------------------------------------------
     1. Scroll-reveal via IntersectionObserver
     ------------------------------------------------- */
  const revealSelectors = '.reveal, .reveal-left, .reveal-right, .reveal-scale';

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '-40px' }
  );

  document.querySelectorAll(revealSelectors).forEach((el) => {
    revealObserver.observe(el);
  });

  /* -------------------------------------------------
     2. Timeline vertical line animation
     ------------------------------------------------- */
  const timelineTrack = document.getElementById('timelineTrack');
  if (timelineTrack) {
    const trackObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            timelineTrack.classList.add('visible');
            trackObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    trackObserver.observe(timelineTrack);
  }

  /* -------------------------------------------------
     3. Floating navigation — show after scrolling
     past hero section
     ------------------------------------------------- */
  const floatingNav = document.getElementById('floatingNav');
  const heroSection = document.getElementById('hero');

  if (floatingNav && heroSection) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            floatingNav.classList.add('visible');
          } else {
            floatingNav.classList.remove('visible');
          }
        });
      },
      { threshold: 0.05 }
    );
    navObserver.observe(heroSection);

    // Active link highlighting based on scroll position
    const navLinks = floatingNav.querySelectorAll('a');
    const sectionIds = Array.from(navLinks).map((link) =>
      link.getAttribute('href').replace('#', '')
    );

    const activeLinkObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach((link) => {
              link.classList.toggle(
                'active',
                link.getAttribute('href') === '#' + id
              );
            });
          }
        });
      },
      { threshold: 0.3, rootMargin: '-20% 0px -60% 0px' }
    );

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) activeLinkObserver.observe(section);
    });
  }

  /* -------------------------------------------------
     4. Static countdown display
     ------------------------------------------------- */
  const countDays = document.getElementById('countDays');
  const countHours = document.getElementById('countHours');
  const countMinutes = document.getElementById('countMinutes');
  const countSeconds = document.getElementById('countSeconds');

  if (countDays) countDays.textContent = '16';
  if (countHours) countHours.textContent = '23';
  if (countMinutes) countMinutes.textContent = '56';
  if (countSeconds) countSeconds.textContent = '12';

  /* -------------------------------------------------
     5. RSVP form submission
     ------------------------------------------------- */
  const rsvpFormEl = document.getElementById('rsvpFormEl');
  const rsvpFormContainer = document.getElementById('rsvpForm');
  const rsvpSuccess = document.getElementById('rsvpSuccess');
  const rsvpSuccessName = document.getElementById('rsvpSuccessName');
  const rsvpSuccessEmail = document.getElementById('rsvpSuccessEmail');

  if (rsvpFormEl) {
    rsvpFormEl.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('rsvpName').value.trim();
      const email = document.getElementById('rsvpEmail').value.trim();

      if (!name || !email) return;

      // Hide form, show success
      rsvpFormContainer.style.display = 'none';
      rsvpSuccess.classList.add('active');
      rsvpSuccessName.textContent = 'Կհանդիպենք, ' + name + '!';
      rsvpSuccessEmail.textContent = 'Մենք հաստատումը կուղարկենք ' + email + ' հասցեին';
    });
  }

  /* -------------------------------------------------
     6. Hero parallax on scroll
     ------------------------------------------------- */
  const heroBg = document.querySelector('.hero__bg');

  if (heroBg) {
    let ticking = false;

    function updateParallax() {
      const scrollY = window.scrollY;
      const heroH = heroSection ? heroSection.offsetHeight : window.innerHeight;

      if (scrollY < heroH) {
        heroBg.style.transform = 'scale(1) translateY(' + scrollY * 0.35 + 'px)';
      }
      ticking = false;
    }

    window.addEventListener(
      'scroll',
      function () {
        if (!ticking) {
          requestAnimationFrame(updateParallax);
          ticking = true;
        }
      },
      { passive: true }
    );
  }

  /* -------------------------------------------------
     7. Floating particles in hero
     ------------------------------------------------- */
  const particlesContainer = document.getElementById('heroParticles');

  if (particlesContainer) {
    const particleCount = 15;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');

      // Randomise position, size, duration and delay
      const size = Math.random() * 4 + 3;
      const left = Math.random() * 100;
      const duration = Math.random() * 10 + 8;
      const delay = Math.random() * 12;
      const opacity = Math.random() * 0.4 + 0.2;

      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      particle.style.left = left + '%';
      particle.style.bottom = '-10px';
      particle.style.animationDuration = duration + 's';
      particle.style.animationDelay = delay + 's';
      particle.style.setProperty('--max-opacity', opacity);

      particlesContainer.appendChild(particle);
    }
  }

  /* -------------------------------------------------
     8. Cursor glow effect (desktop only)
     ------------------------------------------------- */
  const cursorGlow = document.getElementById('cursorGlow');

  if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
    let glowX = 0;
    let glowY = 0;
    let currentX = 0;
    let currentY = 0;

    document.addEventListener('mousemove', function (e) {
      glowX = e.clientX;
      glowY = e.clientY;
      cursorGlow.classList.add('active');
    });

    document.addEventListener('mouseleave', function () {
      cursorGlow.classList.remove('active');
    });

    // Smooth follow with lerp
    function animateGlow() {
      currentX += (glowX - currentX) * 0.12;
      currentY += (glowY - currentY) * 0.12;
      cursorGlow.style.left = currentX + 'px';
      cursorGlow.style.top = currentY + 'px';
      requestAnimationFrame(animateGlow);
    }

    animateGlow();
  }

  /* -------------------------------------------------
     9. Smooth scroll for anchor links
     ------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();

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
