// ===== Birthday Invitation - Main Script =====
document.addEventListener('DOMContentLoaded', () => {
	initAnimatedHeadline();
	initBalloonsCanvas();
	initSparklesCanvas();
	initConfettiCanvas();
	initBirthdayCakeFlames();
	initFlipCountdown();
	initRSVPButton();
	initRSVPForm();
});

// =======================================
// Animated Headline
// =======================================
function initAnimatedHeadline() {
	const headline = document.getElementById('headline');
	if (!headline) return;

	const text = headline.getAttribute('data-text') || "ՀՐԱՎԻՐՎԱԾ ԵՔ";
	headline.innerHTML = '';

	const letters = text.split('');
	letters.forEach((letter, index) => {
		const span = document.createElement('span');
		span.className = 'headline__letter' + (letter === ' ' ? ' headline__letter--space' : '');
		span.textContent = letter;
		span.style.animationDelay = `${index * 0.02}s`;
		headline.appendChild(span);
	});

	let currentIndex = 0;
	const dropInterval = setInterval(() => {
		if (currentIndex < letters.length) {
			const spans = headline.querySelectorAll('.headline__letter');
			if (spans[currentIndex]) {
				spans[currentIndex].classList.add('headline__letter--visible');
			}
			currentIndex++;
		} else {
			clearInterval(dropInterval);
			// Start glow animation after all letters appear
			setTimeout(() => startGlowAnimation(headline), 500);
		}
	}, 80);
}

function startGlowAnimation(headline) {
	let glowPhase = 0;
	const letters = headline.querySelectorAll('.headline__letter');

	setInterval(() => {
		glowPhase = (glowPhase + 0.05) % (Math.PI * 2);
		const intensity = 0.5 + Math.sin(glowPhase) * 0.3;

		letters.forEach(letter => {
			if (!letter.classList.contains('headline__letter--space')) {
				letter.style.textShadow =
					`0 0 ${20 * intensity}px rgba(255, 215, 0, ${intensity}),
					 0 0 ${40 * intensity}px rgba(255, 180, 0, ${intensity * 0.5}),
					 0 0 ${60 * intensity}px rgba(255, 140, 0, ${intensity * 0.3})`;
			}
		});
	}, 50);
}

// =======================================
// Balloons Canvas
// =======================================
function initBalloonsCanvas() {
	const canvas = document.getElementById('balloonsCanvas');
	if (!canvas) return;

	const ctx = canvas.getContext('2d');
	const BALLOON_COLORS = ['#FFB347', '#FFD700', '#FF7F50', '#FFA07A', '#FFDAB9', '#FFE4B5', '#F0E68C', '#FFE4C4'];
	let balloons = [];
	let animId;

	function resizeCanvas() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}

	resizeCanvas();
	window.addEventListener('resize', resizeCanvas);

	function createBalloon(randomY) {
		return {
			x: Math.random() * canvas.width,
			y: randomY ? Math.random() * (canvas.height + 200) : canvas.height + 100 + Math.random() * 200,
			size: 35 + Math.random() * 25,
			color: BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)],
			speed: 0.8 + Math.random() * 1.2,
			swayOffset: Math.random() * Math.PI * 2,
			swayAmplitude: 20 + Math.random() * 30,
			swaySpeed: 0.01 + Math.random() * 0.02,
			stringLength: 40 + Math.random() * 30
		};
	}

	// Create initial balloons
	for (let i = 0; i < 12; i++) {
		balloons.push(createBalloon(true));
	}

	function drawBalloon(b) {
		const swayX = Math.sin(b.swayOffset) * b.swayAmplitude;

		ctx.save();
		ctx.translate(b.x + swayX, b.y);

		// Balloon body
		const gradient = ctx.createRadialGradient(-b.size * 0.3, -b.size * 0.3, 0, 0, 0, b.size);
		gradient.addColorStop(0, '#ffffff');
		gradient.addColorStop(0.3, b.color);
		gradient.addColorStop(1, b.color);

		ctx.beginPath();
		ctx.ellipse(0, 0, b.size * 0.8, b.size, 0, 0, Math.PI * 2);
		ctx.fillStyle = gradient;
		ctx.fill();

		// Balloon knot
		ctx.beginPath();
		ctx.moveTo(0, b.size);
		ctx.lineTo(-5, b.size + 10);
		ctx.lineTo(5, b.size + 10);
		ctx.closePath();
		ctx.fillStyle = b.color;
		ctx.fill();

		// String
		ctx.beginPath();
		ctx.moveTo(0, b.size + 10);
		const stringSwayX = Math.sin(b.swayOffset * 1.5) * 10;
		ctx.quadraticCurveTo(
			stringSwayX,
			b.size + 10 + b.stringLength / 2,
			stringSwayX * 0.5,
			b.size + 10 + b.stringLength
		);
		ctx.strokeStyle = '#666';
		ctx.lineWidth = 1.5;
		ctx.stroke();

		ctx.restore();
	}

	function animate() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		balloons.forEach(b => {
			b.y -= b.speed;
			b.swayOffset += b.swaySpeed;

			if (b.y < -b.size * 2 - b.stringLength) {
				b.y = canvas.height + 100 + Math.random() * 100;
				b.x = Math.random() * canvas.width;
			}

			drawBalloon(b);
		});

		animId = requestAnimationFrame(animate);
	}

	animate();
}

// =======================================
// Sparkles Canvas
// =======================================
function initSparklesCanvas() {
	const canvas = document.getElementById('sparklesCanvas');
	if (!canvas) return;

	const ctx = canvas.getContext('2d');
	let sparkles = [];
	let animId;

	function resizeCanvas() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}

	resizeCanvas();
	window.addEventListener('resize', resizeCanvas);

	function createSparkle() {
		return {
			x: Math.random() * canvas.width,
			y: Math.random() * canvas.height,
			size: 0,
			rotation: Math.random() * 360,
			rotationSpeed: (Math.random() - 0.5) * 5,
			opacity: 0,
			phase: 'growing',
			growSpeed: 0.15 + Math.random() * 0.2,
			maxSize: 5 + Math.random() * 8,
			lifespan: 60 + Math.random() * 120,
			age: 0
		};
	}

	for (let i = 0; i < 30; i++) {
		const s = createSparkle();
		s.age = Math.random() * s.lifespan;
		sparkles.push(s);
	}

	function drawStar(x, y, size, rotation, opacity) {
		ctx.save();
		ctx.translate(x, y);
		ctx.rotate((rotation * Math.PI) / 180);
		ctx.globalAlpha = opacity;

		// Star lines
		ctx.beginPath();
		for (let i = 0; i < 4; i++) {
			const angle = (i * Math.PI) / 2;
			ctx.moveTo(0, 0);
			ctx.lineTo(Math.cos(angle) * size, Math.sin(angle) * size);
		}
		ctx.strokeStyle = '#FFD700';
		ctx.lineWidth = 2.5;
		ctx.lineCap = 'round';
		ctx.shadowColor = '#FFD700';
		ctx.shadowBlur = 8;
		ctx.stroke();

		// Center dot
		ctx.beginPath();
		ctx.arc(0, 0, size * 0.35, 0, Math.PI * 2);
		ctx.fillStyle = '#FFFFFF';
		ctx.shadowColor = '#FFFFFF';
		ctx.shadowBlur = 6;
		ctx.fill();

		ctx.restore();
	}

	function animate() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		sparkles = sparkles.map(s => {
			s.age++;
			s.rotation += s.rotationSpeed;

			if (s.phase === 'growing') {
				s.size += s.growSpeed;
				s.opacity += 0.05;
				if (s.size >= s.maxSize) s.phase = 'bright';
			} else if (s.phase === 'bright') {
				s.opacity = 0.8 + Math.sin(s.age * 0.2) * 0.2;
				if (s.age > s.lifespan * 0.7) s.phase = 'fading';
			} else if (s.phase === 'fading') {
				s.opacity -= 0.03;
				s.size -= s.growSpeed * 0.5;
			}

			if (s.opacity <= 0 || s.age > s.lifespan || s.size <= 0) {
				return createSparkle();
			}

			if (s.size > 0 && s.opacity > 0) {
				drawStar(s.x, s.y, Math.max(s.size, 0.1), s.rotation, s.opacity);
			}

			return s;
		});

		animId = requestAnimationFrame(animate);
	}

	animate();
}

// =======================================
// Confetti Canvas
// =======================================
function initConfettiCanvas() {
	const canvas = document.getElementById('confettiCanvas');
	if (!canvas) return;

	const ctx = canvas.getContext('2d');
	const COLORS = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#FF9F45', '#C9B1FF', '#FF6B9D', '#45B7D1'];
	let pieces = [];
	let hasExploded = false;
	let animId;

	function resizeCanvas() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}

	resizeCanvas();
	window.addEventListener('resize', resizeCanvas);

	function createExplosion() {
		if (hasExploded) return;
		hasExploded = true;

		const centerX = canvas.width / 2;
		const centerY = canvas.height / 2;

		for (let i = 0; i < 200; i++) {
			const angle = Math.random() * Math.PI * 2;
			const speed = 8 + Math.random() * 15;
			pieces.push({
				x: centerX,
				y: centerY,
				vx: Math.cos(angle) * speed,
				vy: Math.sin(angle) * speed - 5,
				rotation: Math.random() * 360,
				rotationSpeed: (Math.random() - 0.5) * 15,
				width: 8 + Math.random() * 6,
				height: 4 + Math.random() * 4,
				color: COLORS[Math.floor(Math.random() * COLORS.length)],
				opacity: 1,
				swayOffset: Math.random() * Math.PI * 2,
				swaySpeed: 0.02 + Math.random() * 0.03
			});
		}
	}

	function animate() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		pieces = pieces.filter(p => {
			p.vy += 0.15;
			p.vx *= 0.99;
			p.x += p.vx + Math.sin(p.swayOffset) * 1.5;
			p.y += p.vy;
			p.rotation += p.rotationSpeed;
			p.swayOffset += p.swaySpeed;

			if (p.y > canvas.height - 100) {
				p.opacity -= 0.02;
			}

			if (p.opacity <= 0) return false;

			ctx.save();
			ctx.translate(p.x, p.y);
			ctx.rotate((p.rotation * Math.PI) / 180);
			ctx.globalAlpha = p.opacity;
			ctx.fillStyle = p.color;
			ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height);
			ctx.restore();

			return true;
		});

		animId = requestAnimationFrame(animate);
	}

	setTimeout(createExplosion, 300);
	animate();
}

// =======================================
// Birthday Cake Flames
// =======================================
function initBirthdayCakeFlames() {
	const candlePositions = [-60, -30, 0, 30, 60];
	const flames = [];

	// Initialize flames
	for (let i = 0; i < 5; i++) {
		flames.push({
			height: 20 + Math.random() * 10,
			width: 8 + Math.random() * 4,
			tilt: (Math.random() - 0.5) * 10,
			innerOpacity: 0.9,
			outerOpacity: 0.6
		});
	}

	function updateFlameElements() {
		candlePositions.forEach((offset, index) => {
			const f = flames[index];
			if (!f) return;

			const outerEllipse = document.getElementById(`flame-outer-${index}`);
			const innerEllipse = document.getElementById(`flame-inner-${index}`);
			const coreEllipse = document.getElementById(`flame-core-${index}`);
			const flameGroup = document.getElementById(`flame-group-${index}`);

			if (!outerEllipse || !innerEllipse || !coreEllipse || !flameGroup) return;

			flameGroup.setAttribute('transform', `rotate(${f.tilt})`);

			outerEllipse.setAttribute('cy', String(-35 - f.height / 2));
			outerEllipse.setAttribute('rx', String(f.width));
			outerEllipse.setAttribute('ry', String(f.height));
			outerEllipse.setAttribute('opacity', String(f.outerOpacity));

			innerEllipse.setAttribute('cy', String(-35 - f.height / 2));
			innerEllipse.setAttribute('rx', String(f.width * 0.5));
			innerEllipse.setAttribute('ry', String(f.height * 0.6));
			innerEllipse.setAttribute('opacity', String(f.innerOpacity));

			coreEllipse.setAttribute('cy', String(-35 - f.height / 2));
			coreEllipse.setAttribute('rx', String(f.width * 0.25));
			coreEllipse.setAttribute('ry', String(f.height * 0.35));
		});
	}

	// Initial render
	updateFlameElements();

	// Flicker interval
	setInterval(() => {
		flames.forEach(f => {
			f.height = 18 + Math.random() * 14;
			f.width = 7 + Math.random() * 5;
			f.tilt = (Math.random() - 0.5) * 12;
			f.innerOpacity = 0.85 + Math.random() * 0.15;
			f.outerOpacity = 0.5 + Math.random() * 0.3;
		});
		updateFlameElements();
	}, 100);
}

// =======================================
// Flip Countdown
// =======================================
function initFlipCountdown() {
	const countdownEl = document.getElementById('countdown');
	if (!countdownEl) return;

	// Fake countdown: always starts from exactly 15 days, 21 hours, 34 minutes, 13 seconds
	// (we add 1 second so the first tick shows exactly :12)
	const partyDate = new Date(Date.now() + 15 * 86400000 + 21 * 3600000 + 34 * 60000 + 13 * 1000);

	// Store party date for other uses
	window.__partyDate = partyDate;

	// Update date display
	updateDateDisplay(partyDate);

	let prevTime = { days: '00', hours: '00', minutes: '00', seconds: '00' };

	function pad(n) {
		return n.toString().padStart(2, '0');
	}

	function calculateTimeLeft() {
		const diff = partyDate.getTime() - Date.now();
		if (diff <= 0) return { days: '00', hours: '00', minutes: '00', seconds: '00' };

		return {
			days: pad(Math.floor(diff / (1000 * 60 * 60 * 24))),
			hours: pad(Math.floor((diff / (1000 * 60 * 60)) % 24)),
			minutes: pad(Math.floor((diff / 1000 / 60) % 60)),
			seconds: pad(Math.floor((diff / 1000) % 60))
		};
	}

	function updateDigit(id, newValue, oldValue) {
		const valueEl = document.querySelector(`#${id} .flip-digit__value`);
		const cardEl = document.querySelector(`#${id} .flip-digit__card`);
		if (!valueEl) return;

		if (newValue !== oldValue) {
			// Remove old flip elements
			cardEl.querySelectorAll('.flip-digit__top, .flip-digit__bottom').forEach(el => el.remove());

			// Create top flip (old value going away)
			const topFlip = document.createElement('div');
			topFlip.className = 'flip-digit__top';
			topFlip.innerHTML = `<div class="flip-digit__value-container"><span class="flip-digit__value">${oldValue}</span></div>`;
			cardEl.appendChild(topFlip);

			// Create bottom flip (new value coming in)
			const bottomFlip = document.createElement('div');
			bottomFlip.className = 'flip-digit__bottom';
			bottomFlip.innerHTML = `<div class="flip-digit__value-container"><span class="flip-digit__value">${newValue}</span></div>`;
			cardEl.appendChild(bottomFlip);

			// Remove flip elements after animation
			setTimeout(() => {
				topFlip.remove();
				bottomFlip.remove();
			}, 700);
		}

		valueEl.textContent = newValue;
	}

	function update() {
		const time = calculateTimeLeft();

		updateDigit('digit-days', time.days, prevTime.days);
		updateDigit('digit-hours', time.hours, prevTime.hours);
		updateDigit('digit-minutes', time.minutes, prevTime.minutes);
		updateDigit('digit-seconds', time.seconds, prevTime.seconds);

		prevTime = { ...time };
	}

	// Initial update
	update();

	// Update every second
	setInterval(update, 1000);
}

function updateDateDisplay(partyDate) {
	const dateEl = document.getElementById('event-date');
	const rsvpDateEl = document.getElementById('rsvp-deadline');

	if (dateEl) {
		dateEl.textContent = '20 սեպտեմբերի 2026 թ. ժամը 18:00-ին';
	}

	if (rsvpDateEl) {
		rsvpDateEl.textContent = 'Խնդրում ենք հաստատել մասնակցությունը մինչև 1 սեպտեմբերի 2026 թ.';
	}
}

// =======================================
// RSVP Button
// =======================================
function initRSVPButton() {
	const btn = document.getElementById('rsvpBtn');
	if (!btn) return;

	let gradientPos = 0;
	let isHoveredFlag = false;
	let animId;

	btn.addEventListener('mouseenter', () => {
		isHoveredFlag = true;
		function animateGradient() {
			if (!isHoveredFlag) return;
			gradientPos = (gradientPos + 2) % 360;
			btn.style.background = `linear-gradient(${gradientPos}deg, #FFD700, #FFA500, #FFB347, #FFD700)`;
			animId = requestAnimationFrame(animateGradient);
		}
		requestAnimationFrame(animateGradient);
	});

	btn.addEventListener('mouseleave', () => {
		isHoveredFlag = false;
		if (animId) cancelAnimationFrame(animId);
		btn.style.background = 'linear-gradient(135deg, #FFD700, #FFA500)';
		// Clear ripples
		btn.querySelectorAll('.rsvp-btn__ripple').forEach(r => r.remove());
	});

	btn.addEventListener('mousemove', (e) => {
		const rect = btn.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		const ripple = document.createElement('span');
		ripple.className = 'rsvp-btn__ripple';
		ripple.style.left = x + 'px';
		ripple.style.top = y + 'px';
		btn.appendChild(ripple);

		// Limit ripples
		const ripples = btn.querySelectorAll('.rsvp-btn__ripple');
		if (ripples.length > 4) {
			ripples[0].remove();
		}

		setTimeout(() => ripple.remove(), 800);
	});

	btn.addEventListener('click', () => {
		openRSVPForm();
	});
}

// =======================================
// RSVP Form
// =======================================
function initRSVPForm() {
	const overlay = document.getElementById('rsvpOverlay');
	const closeBtn = document.getElementById('rsvpCloseBtn');
	const form = document.getElementById('rsvpFormEl');

	if (!overlay || !closeBtn || !form) return;

	// Close on overlay click
	overlay.addEventListener('click', (e) => {
		if (e.target === overlay) closeRSVPForm();
	});

	// Close button
	closeBtn.addEventListener('click', closeRSVPForm);

	// Form submit
	form.addEventListener('submit', (e) => {
		e.preventDefault();

		const submitBtn = form.querySelector('.rsvp-form__submit');
		if (submitBtn) {
			submitBtn.disabled = true;
			submitBtn.textContent = 'Ուղարկվում է...';
		}

		// Get button position for fireworks
		const rect = submitBtn.getBoundingClientRect();
		const originX = rect.left + rect.width / 2;
		const originY = rect.top + rect.height / 2;

		setTimeout(() => {
			// Show success
			showSubmitSuccess();

			// Launch fireworks
			launchFireworks(originX, originY);
		}, 500);
	});
}

function openRSVPForm() {
	const overlay = document.getElementById('rsvpOverlay');
	if (overlay) {
		overlay.classList.add('modal-overlay--active');
	}
}

function closeRSVPForm() {
	const overlay = document.getElementById('rsvpOverlay');
	if (overlay) {
		overlay.classList.remove('modal-overlay--active');
	}
}

function showSubmitSuccess() {
	const formContent = document.getElementById('rsvpFormContent');
	const successContent = document.getElementById('rsvpSuccess');

	if (formContent) formContent.style.display = 'none';
	if (successContent) successContent.style.display = 'block';
}

// =======================================
// Fireworks
// =======================================
function launchFireworks(originX, originY) {
	const canvas = document.getElementById('fireworksCanvas');
	if (!canvas) return;

	canvas.style.display = 'block';
	const ctx = canvas.getContext('2d');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	const FIREWORK_COLORS = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#FF9F45', '#C9B1FF', '#FF6B9D', '#45B7D1'];
	let particles = [];
	let rockets = [];
	let frameCount = 0;
	const maxFrames = 300;

	function createExplosion(x, y, color) {
		const numParticles = 60 + Math.floor(Math.random() * 40);
		for (let i = 0; i < numParticles; i++) {
			const angle = (Math.PI * 2 * i) / numParticles + (Math.random() - 0.5) * 0.3;
			const speed = 3 + Math.random() * 5;
			particles.push({
				x, y,
				vx: Math.cos(angle) * speed,
				vy: Math.sin(angle) * speed,
				color,
				life: 1,
				maxLife: 60 + Math.random() * 40,
				size: 2 + Math.random() * 2
			});
		}
	}

	// Launch rockets
	for (let i = 0; i < 5; i++) {
		setTimeout(() => {
			const color = FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)];
			const spreadX = (Math.random() - 0.5) * 200;
			rockets.push({
				x: originX + spreadX,
				y: originY,
				vy: -15 - Math.random() * 5,
				targetY: 100 + Math.random() * 200,
				color,
				hasExploded: false
			});
		}, i * 200);
	}

	function animate() {
		ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		// Update rockets
		rockets = rockets.filter(r => {
			if (r.hasExploded) return false;

			r.y += r.vy;
			r.vy += 0.3;

			// Draw rocket trail
			ctx.beginPath();
			ctx.moveTo(r.x, r.y);
			ctx.lineTo(r.x, r.y + 15);
			const gradient = ctx.createLinearGradient(r.x, r.y, r.x, r.y + 15);
			gradient.addColorStop(0, r.color);
			gradient.addColorStop(1, 'transparent');
			ctx.strokeStyle = gradient;
			ctx.lineWidth = 3;
			ctx.stroke();

			if (r.y <= r.targetY || r.vy >= 0) {
				createExplosion(r.x, r.y, r.color);
				r.hasExploded = true;
				return false;
			}

			return true;
		});

		// Update particles
		particles = particles.filter(p => {
			p.x += p.vx;
			p.y += p.vy;
			p.vy += 0.1;
			p.vx *= 0.98;
			p.life -= 1 / p.maxLife;

			if (p.life <= 0) return false;

			ctx.beginPath();
			ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
			ctx.fillStyle = p.color;
			ctx.globalAlpha = p.life;
			ctx.fill();
			ctx.globalAlpha = 1;

			return true;
		});

		frameCount++;

		if (frameCount < maxFrames || particles.length > 0 || rockets.length > 0) {
			requestAnimationFrame(animate);
		} else {
			// Clear and hide canvas
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			canvas.style.display = 'none';
		}
	}

	animate();
}

// ==========================================
// Height reporting for iframe embed
// ==========================================
let lastFrameHeight = 0;

function reportHeight() {
	var bodyHeight = document.body ? document.body.offsetHeight : 0;
	var htmlHeight = document.documentElement ? document.documentElement.offsetHeight : 0;
	var height = Math.max(bodyHeight, htmlHeight);

	if (Math.abs(height - lastFrameHeight) > 5) {
		window.parent.postMessage({ type: 'SET_HEIGHT', height: height }, '*');
		lastFrameHeight = height;
	}
}

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
	reportHeight(); // Initial report
});
