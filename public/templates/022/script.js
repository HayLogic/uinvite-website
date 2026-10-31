// ==========================================
// Countdown Timer
// ==========================================
(function () {
  // Static offset: always shows 12d 07h 43m 34s from page load
  const countdownOffset = (12 * 24 * 60 * 60 * 1000) + (7 * 60 * 60 * 1000) + (43 * 60 * 1000) + (34 * 1000);
  const targetDate = new Date(Date.now() + countdownOffset);

  const daysEl = document.getElementById("countdown-days");
  const hoursEl = document.getElementById("countdown-hours");
  const minutesEl = document.getElementById("countdown-minutes");
  const secondsEl = document.getElementById("countdown-seconds");

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function tick() {
    const diff = Math.max(0, targetDate.getTime() - Date.now());
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    daysEl.textContent = pad(days);
    hoursEl.textContent = pad(hours);
    minutesEl.textContent = pad(minutes);
    secondsEl.textContent = pad(seconds);
  }

  tick();
  setInterval(tick, 1000);
})();

// ==========================================
// RSVP Form
// ==========================================
(function () {
  const form = document.getElementById("rsvp-form");
  const successEl = document.getElementById("rsvp-success");
  const successName = document.getElementById("rsvp-success-name");

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("rsvp-name").value.trim();
    const email = document.getElementById("rsvp-email").value.trim();

    if (!name || !email) {
      alert("Please fill in your name and email");
      return;
    }

    // Show success state
    successName.textContent = name;
    form.style.display = "none";
    successEl.style.display = "block";

    // Hide section header when showing success
    var header = form.closest(".rsvp-section").querySelector(".section-header");
    if (header) header.style.display = "none";
  });
})();

// ==========================================
// Scroll Animations (IntersectionObserver)
// ==========================================
(function () {
  var elements = document.querySelectorAll(
    ".animate-on-scroll, .animate-fade-left, .animate-fade-scale, .animate-scale-x"
  );

  if (!("IntersectionObserver" in window)) {
    // Fallback: show everything immediately
    elements.forEach(function (el) {
      el.classList.add("visible");
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var delay = parseInt(entry.target.getAttribute("data-delay") || "0", 10);
          setTimeout(function () {
            entry.target.classList.add("visible");
          }, delay * 150);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  elements.forEach(function (el) {
    observer.observe(el);
  });
})();


// ==========================================
// Iframe Height Reporting
// ==========================================
(function () {
  var lastHeight = 0;

  function reportHeight() {
    // Use offsetHeight to avoid infinite zoom bugs caused by scrollHeight in iframe scenarios
    var bodyHeight = document.body ? document.body.offsetHeight : 0;
    var htmlHeight = document.documentElement ? document.documentElement.offsetHeight : 0;
    var height = Math.max(bodyHeight, htmlHeight);

    if (Math.abs(height - lastHeight) > 5) {
      window.parent.postMessage({ type: 'SET_HEIGHT', height: height }, '*');
      lastHeight = height;
    }
  }

  reportHeight();
  window.addEventListener('resize', reportHeight);
  window.addEventListener('load', reportHeight);
  setInterval(reportHeight, 1500);

  var heightObserver = new MutationObserver(reportHeight);
  heightObserver.observe(document.body, { attributes: true, childList: true, subtree: true });
})();

