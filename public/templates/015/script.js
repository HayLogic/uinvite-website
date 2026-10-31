// ========================================
// CONFETTI EFFECT
// ========================================
function createConfetti() {
    const container = document.querySelector('.confetti-container');
    if (!container) return;

    const colors = [
        'hsl(340, 60%, 75%)',
        'hsl(200, 60%, 78%)',
        'hsl(340, 60%, 85%)',
        'hsl(200, 60%, 88%)',
        'hsl(45, 80%, 80%)'
    ];

    for (let i = 0; i < 30; i++) {
        const piece = document.createElement('div');
        const size = Math.random() * 8 + 4;
        piece.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
            left: ${Math.random() * 100}%;
            top: -10px;
            opacity: 0.7;
            animation: confetti-fall ${Math.random() * 6 + 6}s linear ${Math.random() * 4}s infinite;
        `;
        container.appendChild(piece);
    }
}

// ========================================
// TEAM VOTE
// ========================================
function initVoteButtons() {
    const boyBtn = document.getElementById('vote-boy');
    const girlBtn = document.getElementById('vote-girl');
    const resultEl = document.getElementById('vote-result');

    if (!boyBtn || !girlBtn) return;

    boyBtn.addEventListener('click', () => {
        boyBtn.classList.add('active');
        girlBtn.classList.remove('active');
        resultEl.innerHTML = 'Դուք ընտրեցիք <span class="highlight-boy">Տղա 💙</span>: Շուտով կիմանանք:';
        resultEl.classList.add('animate-fade-in');
    });

    girlBtn.addEventListener('click', () => {
        girlBtn.classList.add('active');
        boyBtn.classList.remove('active');
        resultEl.innerHTML = 'Դուք ընտրեցիք <span class="highlight-girl">Աղջիկ 💖</span>: Շուտով կիմանանք:';
        resultEl.classList.add('animate-fade-in');
    });
}

// ========================================
// RSVP FORM
// ========================================
function initRSVPForm() {
    const yesBtn = document.getElementById('attending-yes');
    const noBtn = document.getElementById('attending-no');
    const guestsGroup = document.getElementById('guests-group');
    const form = document.getElementById('rsvp-form');
    const submitBtn = document.getElementById('submit-btn');
    const nameInput = document.getElementById('name');
    const rsvpMain = document.getElementById('rsvp-main');
    const rsvpThankyou = document.getElementById('rsvp-thankyou');
    const thankyouTitle = document.getElementById('thankyou-title');
    const thankyouMessage = document.getElementById('thankyou-message');

    let attending = '';

    function updateSubmitButton() {
        const nameValue = nameInput.value.trim();
        submitBtn.disabled = !nameValue || !attending;
    }

    if (yesBtn) {
        yesBtn.addEventListener('click', () => {
            attending = 'yes';
            yesBtn.classList.add('active-yes');
            noBtn.classList.remove('active-no');
            guestsGroup.classList.add('visible');
            updateSubmitButton();
        });
    }

    if (noBtn) {
        noBtn.addEventListener('click', () => {
            attending = 'no';
            noBtn.classList.add('active-no');
            yesBtn.classList.remove('active-yes');
            guestsGroup.classList.remove('visible');
            updateSubmitButton();
        });
    }

    if (nameInput) {
        nameInput.addEventListener('input', updateSubmitButton);
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = nameInput.value.trim();
            if (!name || !attending) return;

            // Show thank you message
            rsvpMain.classList.add('hidden');
            rsvpThankyou.classList.add('visible');

            thankyouTitle.textContent = `Շնորհակալություն, ${name}!`;

            if (attending === 'yes') {
                thankyouMessage.textContent = "Անհամբեր սպասում ենք ձեզ: Հրաշալի օր է լինելու: 💕";
            } else {
                thankyouMessage.textContent = "Կկարոտենք ձեզ: Սիրով՝ ձեզ համար 💕";
            }
        });
    }
}

// ========================================
// SMOOTH SCROLL
// ========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ========================================
// HEIGHT REPORTING FOR IFRAME INTEGRATION
// ========================================
let lastHeight = 0;
let resizeTimeout = null;

function reportHeight(forceUpdate = false) {
    const height = Math.ceil(document.documentElement.scrollHeight || document.body.scrollHeight);
    if (forceUpdate || Math.abs(height - lastHeight) > 2) {
        window.parent.postMessage({ type: 'SET_HEIGHT', height: height }, '*');
        lastHeight = height;
    }
}

// Debounced resize handler - forces height update after resize ends
function handleResize() {
    // Clear previous timeout
    if (resizeTimeout) {
        clearTimeout(resizeTimeout);
    }
    // Reset lastHeight to force update
    lastHeight = 0;
    // Debounce: wait for resize to finish, then report height
    resizeTimeout = setTimeout(() => {
        reportHeight(true);
    }, 150);
}

// ========================================
// INITIALIZE
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Height reporting for iframe
    reportHeight();
    window.addEventListener('resize', handleResize);
    window.addEventListener('load', () => reportHeight(true));

    // Periodic check (safe interval to prevent infinite loops)
    setInterval(reportHeight, 1500);

    // Initialize features
    createConfetti();
    initVoteButtons();
    initRSVPForm();
    initSmoothScroll();
});
