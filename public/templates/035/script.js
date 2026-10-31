document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 1. Scratch-to-Reveal Logic
    // ==========================================
    const overlay = document.getElementById("scratchOverlay");
    const weddingSite = document.getElementById("weddingSite");
    const canvas = document.getElementById("scratchCanvas");
    const scratchCard = document.getElementById("scratchCard");

    if (canvas && scratchCard) {
        const ctx = canvas.getContext("2d");
        const cardRect = scratchCard.getBoundingClientRect();

        // Set canvas size to match the card
        canvas.width = cardRect.width;
        canvas.height = cardRect.height;

        // Draw image overlay on canvas
        const overlayImg = new Image();
        overlayImg.src = './assets/couple.webp';
        
        const drawOverlay = () => {
            const prevOp = ctx.globalCompositeOperation;
            ctx.globalCompositeOperation = "source-over";
            
            // Draw image with object-fit: cover behavior
            const canvasRatio = canvas.width / canvas.height;
            const imgRatio = overlayImg.width / overlayImg.height;
            let drawWidth = canvas.width;
            let drawHeight = canvas.height;
            let offsetX = 0;
            let offsetY = 0;

            if (imgRatio > canvasRatio) {
                drawWidth = canvas.height * imgRatio;
                offsetX = (canvas.width - drawWidth) / 2;
            } else {
                drawHeight = canvas.width / imgRatio;
                offsetY = (canvas.height - drawHeight) / 2;
            }

            ctx.drawImage(overlayImg, offsetX, offsetY, drawWidth, drawHeight);
            ctx.globalCompositeOperation = prevOp;
        };

        if (overlayImg.complete) {
            drawOverlay();
        } else {
            overlayImg.onload = drawOverlay;
        }

        let isScratching = false;
        let isComplete = false;
        const MIN_SCRATCH_PERCENTAGE = 70;

        // Scratch function
        function scratch(clientX, clientY) {
            const rect = canvas.getBoundingClientRect();
            const x = clientX - rect.left;
            const y = clientY - rect.top;
            ctx.globalCompositeOperation = "destination-out";
            ctx.beginPath();
            const eraserRadius = canvas.width < 400 ? 55 : 90; // Smaller on mobile
            ctx.arc(x, y, eraserRadius, 0, Math.PI * 2);
            ctx.fill();
        }

        // Check scratch completion
        function checkCompletion() {
            if (isComplete) return;

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const pixels = imageData.data;
            const totalPixels = pixels.length / 4;
            let clearPixels = 0;

            for (let i = 3; i < pixels.length; i += 4) {
                if (pixels[i] === 0) clearPixels++;
            }

            const percentage = (clearPixels / totalPixels) * 100;

            if (percentage >= MIN_SCRATCH_PERCENTAGE) {
                isComplete = true;
                handleScratchComplete();
            }
        }

        // Complete handler: transition to wedding site
        function handleScratchComplete() {
            // Clear remaining canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Small shake animation on the card
            scratchCard.style.animation = "scratchShake 0.5s ease";

            // Fade out overlay after shake
            setTimeout(() => {
                overlay.classList.add("fade-out");

                // Show wedding site
                weddingSite.style.display = "block";
                
                // Allow browser to register display:block before fading in
                setTimeout(() => {
                    weddingSite.classList.add("visible");
                    reportHeight();
                }, 50);

                // Fully hide overlay after fade
                setTimeout(() => {
                    overlay.classList.add("hidden");
                    reportHeight();
                }, 900);
            }, 500);
        }

        // Mouse events
        canvas.addEventListener("mousedown", (e) => {
            isScratching = true;
            scratch(e.clientX, e.clientY);
        });

        document.addEventListener("mousemove", (e) => {
            if (!isScratching) return;
            scratch(e.clientX, e.clientY);
        });

        document.addEventListener("mouseup", () => {
            isScratching = false;
            checkCompletion();
        });

        // Touch events
        canvas.addEventListener("touchstart", (e) => {
            e.preventDefault();
            isScratching = true;
            const touch = e.touches[0];
            scratch(touch.clientX, touch.clientY);
        }, { passive: false });

        document.addEventListener("touchmove", (e) => {
            if (!isScratching) return;
            const touch = e.touches[0];
            scratch(touch.clientX, touch.clientY);
        });

        document.addEventListener("touchend", () => {
            isScratching = false;
            checkCompletion();
        });

        document.addEventListener("touchcancel", () => {
            isScratching = false;
            checkCompletion();
        });

        // Resize handler to fix canvas dimensions
        window.addEventListener("resize", () => {
            if (isComplete) return;
            const newRect = scratchCard.getBoundingClientRect();
            canvas.width = newRect.width;
            canvas.height = newRect.height;

            // Re-draw image wrapper
            if (overlayImg.complete) {
                drawOverlay();
            }
        });
    }

    // Add shake keyframes programmatically
    const shakeStyle = document.createElement("style");
    shakeStyle.textContent = `
        @keyframes scratchShake {
            0%, 100% { transform: rotate(0deg) scale(1); }
            20% { transform: rotate(8deg) scale(1.05); }
            40% { transform: rotate(-8deg) scale(1.05); }
            60% { transform: rotate(5deg) scale(1.02); }
            80% { transform: rotate(-5deg) scale(1.02); }
        }
    `;
    document.head.appendChild(shakeStyle);

    // ==========================================
    // 2. Scroll Reveal Animations
    // ==========================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-in, .reveal-scale');
    revealElements.forEach(el => observer.observe(el));

    // ==========================================
    // 3. Countdown Logic
    // ==========================================
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

            if (daysEl) daysEl.innerText = days < 10 ? "0" + days : days;
            if (hoursEl) hoursEl.innerText = hours < 10 ? "0" + hours : hours;
            if (minutesEl) minutesEl.innerText = minutes < 10 ? "0" + minutes : minutes;
            if (secondsEl) secondsEl.innerText = seconds < 10 ? "0" + seconds : seconds;
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // ==========================================
    // 4. RSVP Form Handling
    // ==========================================
    const form = document.getElementById("rsvpForm");
    const successMsg = document.getElementById("rsvpSuccess");
    const attendanceSelect = document.getElementById("attendance");
    const guestsGroup = document.getElementById("guests-group");

    if (attendanceSelect) {
        attendanceSelect.addEventListener("change", function () {
            if (this.value === "no") {
                guestsGroup.style.display = "none";
            } else {
                guestsGroup.style.display = "block";
            }
            setTimeout(reportHeight, 50);
        });
    }

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            form.style.display = "none";
            successMsg.style.display = "block";
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
