/* =====================================================
   Wedding Invitation - JavaScript
   ===================================================== */

document.addEventListener('DOMContentLoaded', function () {
  // =====================================================
  // Report Height to Parent (for iframe embedding)
  // =====================================================

  let lastHeight = 0;
  function reportHeight() {
    const height = Math.ceil(document.documentElement.scrollHeight || document.body.scrollHeight);
    if (Math.abs(height - lastHeight) > 2) {
      window.parent.postMessage({ type: 'SET_HEIGHT', height: height }, '*');
      lastHeight = height;
    }
  }

  // Initial report
  reportHeight();

  // Watch for content changes (for height reporting)
  const heightObserver = new MutationObserver(reportHeight);
  heightObserver.observe(document.body, { attributes: true, childList: true, subtree: true });

  // Also report height after all images are loaded
  window.addEventListener('load', reportHeight);

  // Still keep a safe check but with longer interval
  setInterval(reportHeight, 1000);
  // =====================================================
  // Countdown Timer
  // =====================================================

  // Imitation of countdown (always 12 days, 5 hours, 34 mins, 15 secs from load)
  const weddingDate = new Date();
  weddingDate.setDate(weddingDate.getDate() + 12);
  weddingDate.setHours(weddingDate.getHours() + 5);
  weddingDate.setMinutes(weddingDate.getMinutes() + 34);
  weddingDate.setSeconds(weddingDate.getSeconds() + 15);

  function updateCountdown() {
    const now = new Date();
    const difference = weddingDate.getTime() - now.getTime();

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      document.getElementById('days').textContent = days.toString().padStart(2, '0');
      document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
      document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
      document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);



  // =====================================================
  // Scroll Animations (Intersection Observer)
  // =====================================================

  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        // Add delay based on data attribute or inline style
        const delay = entry.target.style.animationDelay || '0s';
        entry.target.style.transitionDelay = delay;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(function (el) {
    observer.observe(el);
  });



  // =====================================================
  // Toast Notification
  // =====================================================

  const toast = document.getElementById('toast');

  function showToast(title, message) {
    toast.innerHTML = `
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    `;
    toast.classList.add('show');

    setTimeout(function () {
      toast.classList.remove('show');
    }, 4000);
  }

  // =====================================================
  // RSVP Form
  // =====================================================

  const rsvpForm = document.getElementById('rsvp-form');
  const submitBtn = document.getElementById('submit-btn');

  rsvpForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Get form data
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      guests: document.getElementById('guests').value,
      dietary: document.getElementById('dietary').value,
      message: document.getElementById('message').value
    };

    // Disable button and show loading state
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    submitBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/></svg>
    `;

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Show success toast
    showToast('Շնորհակալություն հաստատման համար: 💕', 'Մենք անհամբեր սպասում ենք Ձեզ հետ հանդիպմանը:');

    // Reset form
    rsvpForm.reset();

    // Restore button
    submitBtn.disabled = false;
    submitBtn.classList.remove('loading');
    submitBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" x2="11" y1="2" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
      Ուղարկել հաստատումը
    `;
  });
});
