(function () {
	// Observe animated elements
	var animatedEls = document.querySelectorAll(
		'.fade-up, .fade-in, .fade-left, .fade-right, .scale-in, .scale-x-in, .scale-y-in, .footer__monogram'
	);

	var observer = new IntersectionObserver(function (entries) {
		entries.forEach(function (entry) {
			if (entry.isIntersecting) {
				entry.target.classList.add('visible');
				observer.unobserve(entry.target);
			}
		});
	}, {
		threshold: 0.1,
		rootMargin: '-50px'
	});

	animatedEls.forEach(function (el) {
		observer.observe(el);
	});

	// Auto-reveal hero elements immediately
	var heroEls = document.querySelectorAll('.hero .fade-up, .hero .fade-in');
	heroEls.forEach(function (el) {
		el.classList.add('visible');
	});
})();


/* ============================================
   Countdown Timer
   ============================================ */
(function () {
	// Set target date dynamically to show: 14 days, 8 hours, 45 minutes
	var countdownOffset = (14 * 24 * 60 * 60 * 1000) + (8 * 60 * 60 * 1000) + (45 * 60 * 1000);
	var weddingDate = new Date(Date.now() + countdownOffset).getTime();

	var daysEl = document.getElementById('countdown-days');
	var hoursEl = document.getElementById('countdown-hours');
	var minutesEl = document.getElementById('countdown-minutes');
	var secondsEl = document.getElementById('countdown-seconds');

	function pad(n) {
		return n < 10 ? '0' + n : '' + n;
	}

	function updateCountdown() {
		var now = new Date().getTime();
		var diff = weddingDate - now;

		if (diff > 0) {
			var days = Math.floor(diff / (1000 * 60 * 60 * 24));
			var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
			var seconds = Math.floor((diff % (1000 * 60)) / 1000);

			if (daysEl) daysEl.textContent = pad(days);
			if (hoursEl) hoursEl.textContent = pad(hours);
			if (minutesEl) minutesEl.textContent = pad(minutes);
			if (secondsEl) secondsEl.textContent = pad(seconds);
		}
	}

	updateCountdown();
	setInterval(updateCountdown, 1000);
})();


/* ============================================
   RSVP Form
   ============================================ */
(function () {
	var form = document.getElementById('rsvp-form');
	var successEl = document.getElementById('rsvp-success');
	var attendBtns = document.querySelectorAll('.rsvp__attend-btn');

	// Attendance toggle buttons
	attendBtns.forEach(function (btn) {
		btn.addEventListener('click', function () {
			attendBtns.forEach(function (b) { b.classList.remove('active'); });
			btn.classList.add('active');
		});
	});

	// Form submit
	form.addEventListener('submit', function (e) {
		e.preventDefault();
		form.style.display = 'none';
		successEl.style.display = 'block';
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

	// Audio functionality
	const bgMusic = document.getElementById('bg-music');
	const musicToggle = document.getElementById('music-toggle');
	const iconPlay = document.getElementById('icon-play');
	const iconPause = document.getElementById('icon-pause');

	if (bgMusic && musicToggle) {
		// Attempt to play immediately
		bgMusic.play().then(() => {
			iconPlay.style.display = 'none';
			iconPause.style.display = 'block';
		}).catch(() => {
			// Autoplay blocked by browser
		});

		// Start on first interaction if blocked
		const initEvents = ['click', 'scroll', 'touchstart', 'mousemove'];
		const initAudio = () => {
			if (bgMusic.paused) {
				bgMusic.play().then(() => {
					iconPlay.style.display = 'none';
					iconPause.style.display = 'block';
					initEvents.forEach(evt => document.removeEventListener(evt, initAudio));
				}).catch(() => {
					// Autoplay rejected (e.g., scroll not sufficient on some browsers)
				});
			} else {
				initEvents.forEach(evt => document.removeEventListener(evt, initAudio));
			}
		};

		initEvents.forEach(evt => {
			document.addEventListener(evt, initAudio, { passive: true });
		});

		// Toggle button
		musicToggle.addEventListener('click', (e) => {
			e.stopPropagation();
			if (bgMusic.paused) {
				bgMusic.play();
				iconPlay.style.display = 'none';
				iconPause.style.display = 'block';
			} else {
				bgMusic.pause();
				iconPlay.style.display = 'block';
				iconPause.style.display = 'none';
			}
		});
	}
});