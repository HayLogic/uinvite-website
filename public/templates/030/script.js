// ===== Countdown Timer =====
(function () {
	// Static starting duration for the countdown
	let totalSeconds = 15 * 86400 + 10 * 3600 + 45 * 60 + 0; // 15 days, 10 hours, 45 minutes

	function updateCountdown() {
		if (totalSeconds <= 0) {
			document.getElementById('cd-days').textContent = '0';
			document.getElementById('cd-hours').textContent = '0';
			document.getElementById('cd-minutes').textContent = '0';
			document.getElementById('cd-seconds').textContent = '0';
			return;
		}

		const days = Math.floor(totalSeconds / 86400);
		const hours = Math.floor((totalSeconds % 86400) / 3600);
		const minutes = Math.floor((totalSeconds % 3600) / 60);
		const seconds = totalSeconds % 60;

		document.getElementById('cd-days').textContent = days;
		document.getElementById('cd-hours').textContent = hours;
		document.getElementById('cd-minutes').textContent = minutes;
		document.getElementById('cd-seconds').textContent = seconds;

		totalSeconds--;
	}

	updateCountdown();
	setInterval(updateCountdown, 1000);
})();

// ===== Scroll Reveal (IntersectionObserver) =====
(function () {
	const revealElements = document.querySelectorAll(
		'.scroll-reveal, .scroll-reveal--left, .scroll-reveal--right, .scroll-reveal--scale, .scroll-reveal--scaleX'
	);

	const observer = new IntersectionObserver(
		function (entries) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) {
					entry.target.classList.add('revealed');
					observer.unobserve(entry.target);
				}
			});
		},
		{ threshold: 0.1, rootMargin: '-80px 0px' }
	);

	revealElements.forEach(function (el) {
		observer.observe(el);
	});
})();

// ===== RSVP Form =====
(function () {
	const form = document.getElementById('rsvp-form');
	const success = document.getElementById('rsvp-success');

	if (form) {
		form.addEventListener('submit', function (e) {
			e.preventDefault();
			form.style.display = 'none';
			success.classList.add('active');
		});
	}
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
