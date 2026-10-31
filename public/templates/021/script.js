document.addEventListener('DOMContentLoaded', () => {

    // --- 1. COUNTDOWN TIMER ---
    // Make sure we calculate correctly
    const targetDate = new Date("2026-08-15T16:00:00").getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const diff = Math.max(0, targetDate - now);

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (daysEl) daysEl.innerText = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.innerText = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.innerText = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.innerText = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);


    // --- 2. FLOATING PARTICLES (Hero Background) ---
    const particlesContainer = document.getElementById('particles-container');
    if (particlesContainer) {
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            // Give even indexed particles float, odd float-slow
            particle.className = `particle ${i % 2 === 0 ? 'animate-float' : 'animate-float-slow'}`;

            // Random properties
            const size = (Math.random() * 4 + 2) + 'px';
            particle.style.width = size;
            particle.style.height = size;
            particle.style.top = (Math.random() * 100) + '%';
            particle.style.left = (Math.random() * 100) + '%';
            particle.style.animationDelay = (Math.random() * 5) + 's';
            particle.style.animationDuration = (Math.random() * 3 + 3) + 's';

            particlesContainer.appendChild(particle);
        }
    }


    // --- 3. SCROLL REVEAL ANIMATIONS ---
    function initRevealAnimations() {
        const reveals = document.querySelectorAll('.reveal, .reveal-scale');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Small delay to ensure sequential animation if multiple appear at once
                    setTimeout(() => {
                        entry.target.classList.add('active');
                    }, index * 50);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.05,
            rootMargin: '0px 0px 50px 0px'
        });

        reveals.forEach(el => observer.observe(el));
    }

    initRevealAnimations();


    // --- 4. RSVP FORM HANDLING ---
    const rsvpForm = document.getElementById('rsvp-form');
    const rsvpSuccess = document.getElementById('rsvp-success');

    if (rsvpForm && rsvpSuccess) {
        rsvpForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // In a real app, you would send fetch/XHR request here.
            // For now, simple mock state switch:

            rsvpForm.style.display = 'none';
            rsvpSuccess.style.display = 'block';
        });
    }

    // --- 5. HEIGHT REPORTING (IFRAME FIX) ---
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
    const heightObserver = new MutationObserver(reportHeight);
    heightObserver.observe(document.body, { attributes: true, childList: true, subtree: true });

});
