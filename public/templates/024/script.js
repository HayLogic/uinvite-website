// ===== Height Reporting (iframe) =====
let lastHeight = 0;

function reportHeight() {
	const height = Math.ceil(document.documentElement.scrollHeight || document.body.scrollHeight);
	if (Math.abs(height - lastHeight) > 5) {
		window.parent.postMessage({ type: 'SET_HEIGHT', height: height }, '*');
		lastHeight = height;
	}
}

// ===== Countdown Timer =====
(function initCountdown() {
	// Static countdown: always shows 12d 07h 43m 34s
	const countdownOffset = (12 * 86400000) + (7 * 3600000) + (43 * 60000) + (34 * 1000);
	const TARGET_DATE = new Date(Date.now() + countdownOffset);
	const els = {
		days: document.getElementById('cd-days'),
		hours: document.getElementById('cd-hours'),
		minutes: document.getElementById('cd-minutes'),
		seconds: document.getElementById('cd-seconds'),
	};

	function update() {
		const diff = TARGET_DATE.getTime() - Date.now();
		if (diff <= 0) {
			els.days.textContent = '00';
			els.hours.textContent = '00';
			els.minutes.textContent = '00';
			els.seconds.textContent = '00';
			return;
		}
		els.days.textContent = String(Math.floor(diff / 86400000)).padStart(2, '0');
		els.hours.textContent = String(Math.floor((diff / 3600000) % 24)).padStart(2, '0');
		els.minutes.textContent = String(Math.floor((diff / 60000) % 60)).padStart(2, '0');
		els.seconds.textContent = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');
	}

	update();
	setInterval(update, 1000);
})();


// ===== Scroll Animations (IntersectionObserver) =====
(function initScrollAnimations() {
	const elements = document.querySelectorAll('.animate-on-scroll');
	const observer = new IntersectionObserver(function (entries) {
		entries.forEach(function (entry) {
			if (entry.isIntersecting) {
				const el = entry.target;
				const delay = el.getAttribute('data-delay') || 0;
				setTimeout(function () {
					el.classList.add('visible');
				}, parseFloat(delay) * 1000);
				observer.unobserve(el);
			}
		});
	}, { threshold: 0.1, rootMargin: '-50px' });

	elements.forEach(function (el) { observer.observe(el); });
})();


// ===== Hero Load Animations =====
(function initLoadAnimations() {
	const elements = document.querySelectorAll('.animate-on-load');
	elements.forEach(function (el) {
		const delay = el.getAttribute('data-delay') || 0;
		setTimeout(function () {
			el.classList.add('visible');
		}, parseFloat(delay) * 1000);
	});
})();


// ===== RSVP Form =====
(function initRSVP() {
	const form = document.getElementById('rsvp-form');
	const formView = document.getElementById('rsvp-form-view');
	const successView = document.getElementById('rsvp-success-view');
	const attendingInput = document.getElementById('rsvp-attending');

	// Toggle buttons
	var toggleBtns = document.querySelectorAll('.rsvp__toggle-btn');
	toggleBtns.forEach(function (btn) {
		btn.addEventListener('click', function () {
			toggleBtns.forEach(function (b) { b.classList.remove('rsvp__toggle-btn--active'); });
			btn.classList.add('rsvp__toggle-btn--active');
			attendingInput.value = btn.getAttribute('data-value');
		});
	});

	// Focus styles
	var inputs = form.querySelectorAll('.rsvp__input');
	inputs.forEach(function (input) {
		input.addEventListener('focus', function () {
			clearError(input.name);
		});
	});

	function clearError(name) {
		var errEl = document.getElementById('error-' + name);
		if (errEl) errEl.textContent = '';
		var inp = form.querySelector('[name="' + name + '"]');
		if (inp) inp.classList.remove('rsvp__input--error');
	}

	function setError(name, msg) {
		var errEl = document.getElementById('error-' + name);
		if (errEl) errEl.textContent = msg;
		var inp = form.querySelector('[name="' + name + '"]');
		if (inp) inp.classList.add('rsvp__input--error');
	}

	// Submit
	form.addEventListener('submit', function (e) {
		e.preventDefault();
		var valid = true;

		var name = form.querySelector('[name="name"]').value.trim();
		var email = form.querySelector('[name="email"]').value.trim();
		var phone = form.querySelector('[name="phone"]').value.trim();

		if (!name) { setError('name', 'Անունը պարտադիր է'); valid = false; }
		if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
			setError('email', 'Սխալ էլ. հասցե'); valid = false;
		}
		if (!phone) { setError('phone', 'Հեռախոսահամարը պարտադիր է'); valid = false; }

		if (!valid) return;

		// Show success
		formView.style.display = 'none';
		successView.style.display = 'block';
		reportHeight();
	});
})();


// ===== Height Initialization (iframe) =====
document.addEventListener('DOMContentLoaded', function () {
	// Initial height report
	reportHeight();

	// Re-report on window resize and load
	window.addEventListener('resize', reportHeight);
	window.addEventListener('load', reportHeight);

	// Periodic check for dynamic content changes
	setInterval(reportHeight, 1500);

	// Watch for content changes (e.g. scroll animations, RSVP)
	var heightObserver = new MutationObserver(reportHeight);
	heightObserver.observe(document.body, { attributes: true, childList: true, subtree: true });
});
