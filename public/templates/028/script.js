// ─── Intro Sequence ─────────────────────────────
(function () {
  // Generate stars
  var starsEl = document.getElementById('intro-stars');
  if (starsEl) {
    for (var i = 0; i < 60; i++) {
      var star = document.createElement('div');
      star.style.cssText = 'position:absolute;width:1px;height:1px;background:hsl(45,80%,75%);border-radius:50%;opacity:0.4;left:' + (Math.random() * 100) + '%;top:' + (Math.random() * 100) + '%;transform:scale(' + (0.5 + Math.random() * 2) + ')';
      starsEl.appendChild(star);
    }
  }

  var namesEl = document.getElementById('intro-names');
  var overlay = document.getElementById('intro-overlay');
  var mainContent = document.getElementById('main-content');

  // Fix for iframe expanding height bug causing vertical centering issues:
  // Bind the absolute overlay firmly to the standard screen height
  if (overlay) {
    overlay.style.height = window.innerHeight + 'px';
  }

  // Phase: show names
  setTimeout(function () {
    if (namesEl) { namesEl.style.opacity = '1'; namesEl.style.transform = 'translateY(0)'; }
  }, 2600);

  // Phase: dissolve
  setTimeout(function () {
    if (overlay) overlay.style.opacity = '0';
  }, 4000);

  // Phase: done
  setTimeout(function () {
    if (overlay) overlay.style.display = 'none';
    if (mainContent) mainContent.style.opacity = '1';
  }, 5200);
})();

// ─── Navbar Scroll ──────────────────────────────
(function () {
  var navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 80) {
      navbar.classList.add('nav-scrolled');
      navbar.style.padding = '12px 0';
    } else {
      navbar.classList.remove('nav-scrolled');
      navbar.style.padding = '20px 0';
    }
  }, { passive: true });
})();

// ─── Mobile Menu ────────────────────────────────
(function () {
  var toggle = document.getElementById('menu-toggle');
  var menu = document.getElementById('mobile-menu');
  var bar1 = document.getElementById('bar1');
  var bar2 = document.getElementById('bar2');
  var bar3 = document.getElementById('bar3');
  var open = false;

  toggle.addEventListener('click', function () {
    open = !open;
    menu.style.maxHeight = open ? '320px' : '0';
    bar1.style.transform = open ? 'rotate(45deg) translateY(8px)' : '';
    bar2.style.opacity = open ? '0' : '1';
    bar3.style.transform = open ? 'rotate(-45deg) translateY(-8px)' : '';
  });

  // Close on link click
  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      open = false;
      menu.style.maxHeight = '0';
      bar1.style.transform = '';
      bar2.style.opacity = '1';
      bar3.style.transform = '';
    });
  });
})();

// ─── Responsive Nav ─────────────────────────────
(function () {
  var desktopNav = document.getElementById('desktop-nav');
  var menuToggle = document.getElementById('menu-toggle');
  function checkWidth() {
    if (window.innerWidth <= 768) {
      desktopNav.style.display = 'none';
      menuToggle.style.display = 'block';
    } else {
      desktopNav.style.display = 'flex';
      menuToggle.style.display = 'none';
    }
  }
  checkWidth();
  window.addEventListener('resize', checkWidth);
})();

// ─── Nav Link Styles ────────────────────────────
(function () {
  var css = document.createElement('style');
  css.textContent = '.nav-link{font-family:"Lato",sans-serif;font-size:0.75rem;letter-spacing:0.2em;text-transform:uppercase;color:hsla(45,70%,80%,0.7);text-decoration:none;transition:color 0.3s;position:relative;}.nav-link:hover{color:hsl(45,80%,75%);}.mobile-nav-link{font-family:"Lato",sans-serif;font-size:0.875rem;letter-spacing:0.2em;text-transform:uppercase;color:hsla(45,70%,80%,0.8);text-decoration:none;transition:color 0.3s;padding:4px 0;}.mobile-nav-link:hover{color:hsl(45,80%,75%);}';
  document.head.appendChild(css);
})();

// ─── Hero Parallax ──────────────────────────────
(function () {
  var heroBg = document.getElementById('hero-bg');
  window.addEventListener('scroll', function () {
    if (heroBg) heroBg.style.transform = 'translateY(' + (window.scrollY * 0.4) + 'px)';
  }, { passive: true });
})();

// ─── Falling Petals ─────────────────────────────
(function () {
  var container = document.getElementById('petals-container');
  if (!container) return;
  var symbols = ['🌹', '🍂', '❀'];
  for (var i = 0; i < 24; i++) {
    var petal = document.createElement('div');
    petal.style.cssText = 'position:absolute;top:0;left:' + ((i * 4.17) % 100) + '%;opacity:' + (0.6 + (i % 4) * 0.1) + ';font-size:' + (12 + (i % 8)) + 'px;animation:petal-fall ' + (6 + (i % 4)) + 's linear ' + ((i * 0.37) % 6) + 's infinite;';
    petal.textContent = symbols[i % 3];
    container.appendChild(petal);
  }
})();

// ─── Countdown Timer ────────────────────────────
(function () {
  document.getElementById('cd-days').textContent = '24';
  document.getElementById('cd-hours').textContent = '12';
  document.getElementById('cd-minutes').textContent = '35';
  document.getElementById('cd-seconds').textContent = '00';
})();

// ─── Story Timeline Reveal ──────────────────────
(function () {
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.story-event').forEach(function (el) {
    observer.observe(el);
  });
})();

// ─── Ceremony Reveal ────────────────────────────
(function () {
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.reveal').forEach(function (el) {
    observer.observe(el);
  });
})();

// ─── Wedding Day Timeline ───────────────────────
(function () {
  var row = document.getElementById('timeline-row');
  if (!row) return;
  var schedule = [
    { time: '15:00', event: 'Պսակադրություն', desc: 'Սուրբ Գրիգոր Լուսավորիչ մայր տաճար' },
    { time: '17:00', event: 'Ֆոտոշարք', desc: 'Կասկադ համալիր' },
    { time: '18:30', event: 'Ժամանում Սրահ', desc: '«Գրանդ Հոթել» Երևան, Աբովյան փող.' },
    { time: '19:00', event: 'Առաջին Պար', desc: 'Մարիամ և Արամ' },
    { time: '20:00', event: 'Խորոված և Խնջույք', desc: 'Ավանդական հայկական խնջույք' },
    { time: '22:00', event: 'Շաբաշ և Պարեր', desc: 'Տոնակատարություն և հարսանեկան պար' },
    { time: '00:00', event: 'Կենաց և Տորթ', desc: 'Հայկական կոնյակ և քաղցրավենիք' },
  ];
  schedule.forEach(function (item, i) {
    var div = document.createElement('div');
    div.style.cssText = 'position:relative;display:flex;flex-direction:column;align-items:center;gap:12px;cursor:default;min-width:140px;';
    // Connector line
    if (i < schedule.length - 1) {
      var line = document.createElement('div');
      line.style.cssText = 'position:absolute;top:24px;left:calc(50% + 24px);right:-72px;height:1px;background:hsla(42,54%,55%,0.4);';
      div.appendChild(line);
    }
    // Circle
    var circle = document.createElement('div');
    circle.style.cssText = 'width:48px;height:48px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.875rem;font-weight:700;z-index:10;transition:transform 0.3s;box-shadow:0 4px 12px rgba(0,0,0,0.2);background:linear-gradient(135deg,hsl(38,65%,35%),hsl(42,54%,55%));color:hsl(36,100%,97%);border:2px solid hsl(42,80%,65%);';
    circle.textContent = i + 1;
    div.appendChild(circle);
    // Time
    var time = document.createElement('p');
    time.className = 'font-cormorant';
    time.style.cssText = 'font-size:0.875rem;font-weight:700;color:hsl(0,100%,27%);';
    time.textContent = item.time;
    div.appendChild(time);
    // Event info
    var info = document.createElement('div');
    info.style.cssText = 'text-align:center;padding:0 8px;';
    info.innerHTML = '<p class="font-cormorant" style="font-size:0.875rem;font-weight:600;color:hsl(0,0%,15%);">' + item.event + '</p><p class="font-lato" style="font-size:10px;margin-top:2px;color:hsl(0,0%,40%);">' + item.desc + '</p>';
    div.appendChild(info);
    // Hover
    div.addEventListener('mouseenter', function () { circle.style.transform = 'scale(1.1)'; });
    div.addEventListener('mouseleave', function () { circle.style.transform = ''; });
    row.appendChild(div);
  });
})();

// ─── Pomegranate Divider ────────────────────────
(function () {
  var divider = document.getElementById('pom-divider');
  var left = document.getElementById('pom-left');
  var right = document.getElementById('pom-right');
  var text = document.getElementById('pom-text');
  if (!divider) return;
  divider.addEventListener('mouseenter', function () {
    left.style.transform = 'translateX(-40px) rotate(-15deg)';
    right.style.transform = 'translateX(40px) rotate(15deg)';
    text.style.opacity = '1';
  });
  divider.addEventListener('mouseleave', function () {
    left.style.transform = '';
    right.style.transform = '';
    text.style.opacity = '0';
  });
})();

// ─── RSVP Form ──────────────────────────────────
var currentAttendance = 'yes';

function setAttendance(val) {
  currentAttendance = val;
  var btnYes = document.getElementById('btn-yes');
  var btnNo = document.getElementById('btn-no');
  var mealSection = document.getElementById('meal-section');
  if (val === 'yes') {
    btnYes.className = 'btn-gold';
    btnYes.style.border = 'none';
    btnNo.className = '';
    btnNo.style.cssText = 'flex:1;padding:12px;font-family:"Cormorant Garamond",serif;font-size:1rem;letter-spacing:0.05em;border-radius:2px;background:transparent;border:1px solid hsla(42,54%,55%,0.5);color:hsla(42,70%,50%,0.6);cursor:pointer;';
    mealSection.style.display = '';
  } else {
    btnNo.className = 'btn-gold';
    btnNo.style.border = 'none';
    btnYes.className = '';
    btnYes.style.cssText = 'flex:1;padding:12px;font-family:"Cormorant Garamond",serif;font-size:1rem;letter-spacing:0.05em;border-radius:2px;background:transparent;border:1px solid hsla(42,54%,55%,0.5);color:hsla(42,70%,50%,0.6);cursor:pointer;';
    mealSection.style.display = 'none';
  }
}

function setMeal(btn) {
  document.querySelectorAll('.meal-btn').forEach(function (b) {
    b.classList.remove('active');
    b.style.background = 'transparent';
    b.style.borderColor = 'hsla(42,54%,55%,0.3)';
    b.style.color = 'hsla(42,70%,50%,0.6)';
  });
  btn.classList.add('active');
  btn.style.background = 'hsl(42,54%,55%)';
  btn.style.borderColor = 'hsl(42,54%,55%)';
  btn.style.color = 'hsl(0,0%,8%)';
}

(function () {
  var form = document.getElementById('rsvp-form');
  var success = document.getElementById('rsvp-success');
  var congrats = document.getElementById('rsvp-congrats');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = document.getElementById('rsvp-name').value;
    congrats.textContent = 'Շնորհակալություն, ' + name + '։';
    form.style.display = 'none';
    success.style.display = 'block';

    // Coin burst
    for (var i = 0; i < 24; i++) {
      var coin = document.createElement('div');
      coin.style.cssText = 'position:absolute;top:0;left:50%;pointer-events:none;font-size:1.25rem;animation:coin-burst 1s ease-out ' + (Math.random() * 0.4) + 's forwards;transform:translateX(' + (Math.random() * 300 - 150) + 'px);';
      coin.textContent = '💰';
      success.appendChild(coin);
      (function (c) { setTimeout(function () { c.remove(); }, 2000); })(coin);
    }
  });
})();

// ─── Music Player ───────────────────────────────
(function () {
  var btn = document.getElementById('music-btn');
  var playing = false;
  var audio = new Audio();
  audio.loop = true;
  audio.volume = 0.3;
  audio.src = 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3';

  btn.addEventListener('click', function () {
    if (playing) {
      audio.pause();
      btn.classList.remove('playing');
      btn.querySelector('span').textContent = '🎶';
      btn.title = 'Միացնել տոնական երաժշտություն';
    } else {
      audio.play().catch(function () { });
      btn.classList.add('playing');
      btn.querySelector('span').textContent = '🎵';
      btn.title = 'Անջատել երաժշտությունը';
    }
    playing = !playing;
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
