document.addEventListener("DOMContentLoaded", () => {
    // 1. Scroll Reveal Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-in, .reveal-scale');
    revealElements.forEach(el => observer.observe(el));

    // 2. Countdown Logic (Static offset for demo: always starts from 45 days)
    const countdownOffset = (45 * 24 * 60 * 60 * 1000) + (8 * 60 * 60 * 1000) + (30 * 60 * 1000);
    const weddingDate = new Date().getTime() + countdownOffset;
    
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if(daysEl) daysEl.innerText = days < 10 ? "0" + days : days;
            if(hoursEl) hoursEl.innerText = hours < 10 ? "0" + hours : hours;
            if(minutesEl) minutesEl.innerText = minutes < 10 ? "0" + minutes : minutes;
            if(secondsEl) secondsEl.innerText = seconds < 10 ? "0" + seconds : seconds;
        }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // 3. RSVP Form Handling
    const form = document.getElementById("rsvpForm");
    const successMsg = document.getElementById("rsvpSuccess");
    const attendanceSelect = document.getElementById("attendance");
    const guestsGroup = document.getElementById("guests-group");

    if (attendanceSelect) {
        attendanceSelect.addEventListener("change", function() {
            if (this.value === "no") {
                guestsGroup.style.display = "none";
            } else {
                guestsGroup.style.display = "block";
            }
            // Trigger height update immediately because form size changed
            setTimeout(reportHeight, 50);
        });
    }

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            form.style.display = "none";
            successMsg.style.display = "block";
            
            // Trigger height update after showing success message
            setTimeout(reportHeight, 50);
        });
    }
});

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

// Watch for content changes in the DOM
if (typeof document !== 'undefined' && document.body) {
    const heightObserver = new MutationObserver(reportHeight);
    heightObserver.observe(document.body, { attributes: true, childList: true, subtree: true });
}
