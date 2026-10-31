// ==========================================
// Navigation scroll behavior
// ==========================================
(function () {
  var navbar = document.getElementById('navbar');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
})();

// ==========================================
// Mobile menu toggle
// ==========================================
(function () {
  var toggle = document.getElementById('mobile-toggle');
  var menu = document.getElementById('mobile-menu');
  var links = menu.querySelectorAll('.mobile-link');

  toggle.addEventListener('click', function () {
    toggle.classList.toggle('open');
    menu.classList.toggle('open');
  });

  // Close mobile menu on link click
  links.forEach(function (link) {
    link.addEventListener('click', function () {
      toggle.classList.remove('open');
      menu.classList.remove('open');
    });
  });
})();

// ==========================================
// Hero fade-in on load
// ==========================================
(function () {
  var heroContent = document.getElementById('hero-content');
  // Small delay to ensure transition runs
  setTimeout(function () {
    heroContent.classList.add('visible');
  }, 100);
})();

// ==========================================
// Scroll-triggered animations (IntersectionObserver)
// ==========================================
(function () {
  var sections = document.querySelectorAll('[data-animate]');

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.15
  });

  sections.forEach(function (section) {
    observer.observe(section);
  });
})();

// ==========================================
// RSVP Form: attendance toggle
// ==========================================
(function () {
  var btnAccept = document.getElementById('btn-accept');
  var btnDecline = document.getElementById('btn-decline');
  var guestsField = document.getElementById('guests-field');

  btnAccept.addEventListener('click', function () {
    btnAccept.classList.add('selected');
    btnDecline.classList.remove('selected');
    guestsField.style.display = 'block';
  });

  btnDecline.addEventListener('click', function () {
    btnDecline.classList.add('selected');
    btnAccept.classList.remove('selected');
    guestsField.style.display = 'none';
  });
})();

// ==========================================
// RSVP Form: submit handler
// ==========================================
(function () {
  var form = document.getElementById('rsvp-form');
  var success = document.getElementById('rsvp-success');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    form.style.display = 'none';
    success.style.display = 'block';
    reportHeight();
  });
})();

// ==========================================
// Height reporting for iframe embed
// ==========================================
var lastHeight = 0;

function reportHeight() {
  var height = Math.ceil(document.documentElement.scrollHeight || document.body.scrollHeight);
  if (Math.abs(height - lastHeight) > 5) {
    window.parent.postMessage({ type: 'SET_HEIGHT', height: height }, '*');
    lastHeight = height;
  }
}

(function () {
  // Initial height report
  reportHeight();

  // Re-report on window resize and load
  window.addEventListener('resize', reportHeight);
  window.addEventListener('load', reportHeight);

  // Periodic check for dynamic content changes
  setInterval(reportHeight, 1500);

  // Watch for content changes (e.g. reveals, form toggling)
  var heightObserver = new MutationObserver(reportHeight);
  heightObserver.observe(document.body, { attributes: true, childList: true, subtree: true });
})();
