document.addEventListener('DOMContentLoaded', () => {
    // 0. Iframe height reporting
    let lastHeight = 0;
    function reportHeight() {
        // Use offsetHeight to avoid infinite zoom bugs caused by scrollHeight in some 100vh scenarios
        const bodyHeight = document.body ? document.body.offsetHeight : 0;
        const htmlHeight = document.documentElement ? document.documentElement.offsetHeight : 0;
        const height = Math.max(bodyHeight, htmlHeight);

        if (Math.abs(height - lastHeight) > 5) {
            window.parent.postMessage({ type: 'SET_HEIGHT', height: height }, '*');
            lastHeight = height;
        }
    }

    reportHeight();
    window.addEventListener('resize', reportHeight);
    window.addEventListener('load', reportHeight);
    setInterval(reportHeight, 1500);
    const heightObserver = new MutationObserver(reportHeight);
    heightObserver.observe(document.body, { attributes: true, childList: true, subtree: true });

    // 1. Initialize Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. Countdown Timer
    const countdownOffset = (12 * 24 * 60 * 60 * 1000) + (7 * 60 * 60 * 1000) + (43 * 60 * 1000) + (34 * 1000);
    const eventDate = new Date().getTime() + countdownOffset;
    const daysEl = document.getElementById("count-days");
    const hoursEl = document.getElementById("count-hours");
    const minutesEl = document.getElementById("count-minutes");
    const secondsEl = document.getElementById("count-seconds");

    function updateCountdown() {
        const now = new Date().getTime();
        const diff = eventDate - now;

        if (diff <= 0) {
            if (daysEl) daysEl.textContent = "00";
            if (hoursEl) hoursEl.textContent = "00";
            if (minutesEl) minutesEl.textContent = "00";
            if (secondsEl) secondsEl.textContent = "00";
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // 3. Scroll Reveal Animations & Number Counting
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const numberElements = document.querySelectorAll('.stat-count');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const animateObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => animateObserver.observe(el));

    // Number counting logic
    const numberObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target') || '0', 10);
                countUp(entry.target, target, 2000);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    numberElements.forEach(el => numberObserver.observe(el));

    function countUp(element, target, duration) {
        let start = 0;
        const step = target / (duration / 16); // 60fps

        const timer = setInterval(() => {
            start += step;
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    }

    // 4. Speakers Hover Logic
    const speakerCards = document.querySelectorAll('.speaker-card');

    speakerCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            speakerCards.forEach(c => {
                if (c !== card) {
                    c.classList.remove('is-active');
                    c.classList.add('is-dimmed');
                }
            });
            card.classList.remove('is-dimmed');
            card.classList.add('is-active');
        });

        card.addEventListener('mouseleave', () => {
            speakerCards.forEach(c => {
                c.classList.remove('is-active');
                c.classList.remove('is-dimmed');
            });
        });
    });

    // 5. Form Submission
    const registerForm = document.getElementById('registration-form');
    const submitBtn = document.getElementById('submit-btn');
    const submitText = document.getElementById('submit-text');

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Basic validation check
            const nameInput = document.getElementById('form-name').value;
            const emailInput = document.getElementById('form-email').value;

            if (!nameInput.trim() || !emailInput.trim()) return;

            // Loading state
            if (submitBtn) submitBtn.disabled = true;
            if (submitText) submitText.textContent = "Գրանցվում է...";

            // Simulate API request
            setTimeout(() => {
                alert("🎉 Դուք Գրանցված էք: Ստուգեք Ձեր էլ. փոստը հաստատման մանրամասների համար:");
                registerForm.reset();
                if (submitBtn) submitBtn.disabled = false;
                if (submitText) submitText.textContent = "Ամրագրել Իմ Տեղը";
            }, 1000);
        });
    }

    // 6. Smooth Scrolling for "Register Now" buttons
    const registerButtons = document.querySelectorAll('[data-scroll-to="register"]');
    registerButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const el = document.getElementById('register');
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
