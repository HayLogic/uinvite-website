// html/script.js

document.addEventListener("DOMContentLoaded", () => {
    // ── Confetti ──────────────────────────────────────────────────────────────────
    const CONFETTI_COLORS = [
        "hsl(42,55%,54%)",
        "hsl(42,80%,75%)",
        "hsl(36,79%,88%)",
        "hsl(348,45%,45%)",
        "hsl(348,45%,65%)",
        "hsl(230,38%,55%)",
    ];
    const CONFETTI_SHAPES = ["square", "circle", "rect"];

    const confettiContainer = document.getElementById("confetti-container");
    if (confettiContainer) {
        for (let i = 0; i < 40; i++) {
            const p = {
                left: Math.random() * 100,
                size: 6 + Math.random() * 10,
                color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
                shape: CONFETTI_SHAPES[Math.floor(Math.random() * CONFETTI_SHAPES.length)],
                delay: Math.random() * 8,
                duration: 5 + Math.random() * 8,
            };
            const el = document.createElement("div");
            el.className = "confetti-piece";
            el.style.left = `${p.left}%`;
            el.style.top = "-50px";
            el.style.width = p.shape === "rect" ? `${p.size * 2}px` : `${p.size}px`;
            el.style.height = `${p.size}px`;
            el.style.background = p.color;
            el.style.borderRadius = p.shape === "circle" ? "50%" : p.shape === "rect" ? "2px" : "1px";
            el.style.animationDelay = `${p.delay}s`;
            el.style.animationDuration = `${p.duration}s`;
            confettiContainer.appendChild(el);
        }
    }

    // ── Sparkles ──────────────────────────────────────────────────────────────────
    const sparklesContainer = document.getElementById("sparkles-container");
    if (sparklesContainer) {
        for (let i = 0; i < 14; i++) {
            const s = {
                left: 5 + Math.random() * 90,
                bottom: Math.random() * 100,
                size: 8 + Math.random() * 16,
                delay: Math.random() * 6,
                duration: 3 + Math.random() * 4,
            };
            const el = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            el.setAttribute("width", s.size);
            el.setAttribute("height", s.size);
            el.setAttribute("viewBox", "0 0 24 24");
            el.setAttribute("fill", "currentColor");
            el.setAttribute("class", "sparkle text-primary");
            el.style.position = "absolute";
            el.style.left = `${s.left}%`;
            el.style.bottom = `${s.bottom}%`;
            el.style.animationDelay = `${s.delay}s`;
            el.style.animationDuration = `${s.duration}s`;
            el.style.opacity = "0.6";

            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("d", "M12 2 L13.5 9 L20 10.5 L13.5 12 L12 19 L10.5 12 L4 10.5 L10.5 9 Z");
            el.appendChild(path);

            sparklesContainer.appendChild(el);
        }
    }

    // ── Scroll reveal ────────────────────────────────────────────────────────
    const revealElements = document.querySelectorAll(".section-reveal");
    if (revealElements.length > 0) {
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(el => obs.observe(el));
    }

    // ── Countdown ─────────────────────────────────────────────────────────────────
    const daysEl = document.getElementById("cd-days");
    const hoursEl = document.getElementById("cd-hours");
    const minEl = document.getElementById("cd-minutes");
    const secEl = document.getElementById("cd-seconds");

    if (daysEl) daysEl.textContent = "15";
    if (hoursEl) hoursEl.textContent = "04";
    if (minEl) minEl.textContent = "20";
    if (secEl) secEl.textContent = "00";

    // ── Nav Scroll ────────────────────────────────────────────────────────────────
    const nav = document.getElementById("main-nav");
    if (nav) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 60) {
                nav.classList.add("scrolled");
            } else {
                nav.classList.remove("scrolled");
            }
        });
    }

    // ── RSVP Form ─────────────────────────────────────────────────────────────────
    const rsvpForm = document.getElementById("rsvp-form");
    const rsvpSuccess = document.getElementById("rsvp-success");

    if (rsvpForm) {
        const radios = document.querySelectorAll('input[name="attendance"]');
        const labels = document.querySelectorAll('.attendance-label');

        radios.forEach((radio, idx) => {
            radio.addEventListener("change", (e) => {
                labels.forEach(l => l.classList.remove("active"));

                if (e.target.checked) {
                    labels[idx].classList.add("active");
                }
            });
        });

        rsvpForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const nameInput = document.getElementById("rsvp-name").value;

            rsvpForm.style.display = "none";
            if (rsvpSuccess) {
                rsvpSuccess.style.display = "block";
                const rsvpSuccessTitle = document.getElementById("rsvp-success-title");
                if (rsvpSuccessTitle) rsvpSuccessTitle.innerText = "Կհանդիպենք Այնտեղ։";
            }

            // Mimic toast
            const toast = document.createElement("div");
            toast.className = "toast-success show";
            toast.innerHTML = `<div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;color:hsl(42,55%,54%);"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3h-2M7 3h2M12 18v4M9 22h6M6 3l1 7c2 2 5 2 7 2V3M18 3l-1 7c-2 2-5 2-7 2"></path></svg><h4 class="font-display semibold" style="font-size: 18px; margin: 0; color:var(--foreground);">Մասնակցությունը Հաստատված է։</h4></div><p class="font-body text-muted" style="font-size: 14px;">Շնորհակալություն, ${nameInput}։ Անհամբեր սպասում ենք միասին տոնելուն։</p>`;
            document.body.appendChild(toast);

            setTimeout(() => {
                toast.classList.remove("show");
                setTimeout(() => toast.remove(), 500);
            }, 4000);
        });
    }

    // ── HEIGHT REPORTING ────────────────────────────────────────────────────────
    let lastHeight = 0;
    function reportHeight() {
        const height = Math.ceil(document.documentElement.scrollHeight || document.body.scrollHeight);
        // Infinite Zoom Guard: Use a 5px threshold to prevent feedback loops in auto-sizing iframes
        if (Math.abs(height - lastHeight) > 5) {
            window.parent.postMessage({ type: 'SET_HEIGHT', height: height }, '*');
            lastHeight = height;
        }
    }

    // Initial report
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

