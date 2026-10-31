/**
 * Script for Template 011 to report height to parent iframe.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Report height to parent for "single scroll" behavior
    let lastHeight = 0;
    function reportHeight() {
        const height = Math.ceil(document.documentElement.scrollHeight || document.body.scrollHeight);
        if (Math.abs(height - lastHeight) > 2) {
            window.parent.postMessage({ type: 'SET_HEIGHT', height: height }, '*');
            lastHeight = height;
        }
    }

    // Initial report
    reportHeight();

    // Watch for content changes (for height reporting)
    const heightObserver = new MutationObserver(reportHeight);
    heightObserver.observe(document.body, { attributes: true, childList: true, subtree: true });

    // Also report height after all images are loaded
    window.addEventListener('load', reportHeight);

    // Still keep a safe check but with longer interval
    setInterval(reportHeight, 1000);

    // Initialize Lucide Icons
    lucide.createIcons();

    // Scroll-in animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Hero Confetti
    const confettiContainer = document.getElementById('confetti-container');
    const createConfetti = () => {
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                const isCoral = Math.random() > 0.5;
                confetti.className = `confetti ${isCoral ? 'coral' : 'gold'}`;

                const left = Math.random() * 100;
                const duration = 5 + Math.random() * 3;
                const delay = Math.random() * 5;

                confetti.style.left = `${left}%`;
                confetti.style.animation = `confettiFall ${duration}s linear infinite`;
                confetti.style.animationDelay = `${delay}s`;

                confettiContainer.appendChild(confetti);
            }, i * 300);
        }
    };

    // Add confetti animation style
    const style = document.createElement('style');
    style.textContent = `
        @keyframes confettiFall {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    createConfetti();

    // RSVP Form Logic
    const rsvpForm = document.getElementById('rsvp-form');
    const rsvpFormContainer = document.getElementById('rsvp-form-container');
    const rsvpSuccess = document.getElementById('rsvp-success');
    const successMessage = document.getElementById('success-message');
    const btnYes = document.getElementById('btn-yes');
    const btnNo = document.getElementById('btn-no');
    const guestsGroup = document.getElementById('guests-group');

    let attendance = null;

    btnYes.addEventListener('click', () => {
        attendance = 'yes';
        btnYes.classList.add('active-yes');
        btnNo.classList.remove('active-no');
        guestsGroup.style.display = 'block';

        // Update heart icon
        const icon = btnYes.querySelector('i');
        icon.setAttribute('fill', 'var(--gold)');
        const iconNo = btnNo.querySelector('i');
        iconNo.removeAttribute('fill');
    });

    btnNo.addEventListener('click', () => {
        attendance = 'no';
        btnNo.classList.add('active-no');
        btnYes.classList.remove('active-yes');
        guestsGroup.style.display = 'none';

        // Update heart icon
        const icon = btnNo.querySelector('i');
        icon.setAttribute('fill', 'var(--coral)');
        const iconYes = btnYes.querySelector('i');
        iconYes.removeAttribute('fill');
    });

    rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!attendance) {
            alert('Խնդրում ենք նշել՝ ներկա կլինեք, թե ոչ');
            return;
        }

        const name = document.getElementById('name').value;
        if (!name.trim()) {
            alert('Խնդրում ենք լրացնել ձեր անունը');
            return;
        }

        // Simulate submission
        rsvpFormContainer.style.display = 'none';
        rsvpSuccess.style.display = 'block';

        if (attendance === 'yes') {
            successMessage.textContent = 'Մենք շատ ուրախ ենք, որ դուք կլինեք մեզ հետ: Կհանդիպենք տոնին: 🎈';
        } else {
            successMessage.textContent = 'Մենք հասկանում ենք, որ միշտ չէ, որ ստացվում է: Մենք կկարոտենք ձեզ: 💐';
        }

        // Re-initialize icons for the success view
        lucide.createIcons();
    });
});
