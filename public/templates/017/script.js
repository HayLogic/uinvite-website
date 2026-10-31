// ===== CONFIGURATION =====
let lastHeight = 0;

// ===== HEIGHT REPORTING =====
function reportHeight() {
    const height = Math.ceil(document.documentElement.scrollHeight || document.body.scrollHeight);
    // Infinite Zoom Guard: Use a 5px threshold to prevent feedback loops in auto-sizing iframes
    if (Math.abs(height - lastHeight) > 5) {
        window.parent.postMessage({ type: 'SET_HEIGHT', height: height }, '*');
        lastHeight = height;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Navigation Scroll Effect
    const nav = document.getElementById('wedding-nav');
    const handleScroll = () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = mobileMenu.querySelectorAll('a');

    const toggleMenu = () => {
        menuToggle.classList.toggle('open');
        mobileMenu.classList.toggle('open');
        document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    };

    menuToggle.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('open');
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // Reveal on Scroll
    const revealElements = document.querySelectorAll('.reveal, .fade-up');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // RSVP Form Logic
    const rsvpForm = document.getElementById('rsvp-form');
    const rsvpContainer = document.getElementById('rsvp-form-container');
    const rsvpSuccess = document.getElementById('rsvp-success');
    const rsvpReset = document.getElementById('rsvp-reset');

    // Guest Selection
    const guestBtns = document.querySelectorAll('.guest-btn');
    const guestsInput = document.getElementById('guests');

    guestBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            guestBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            guestsInput.value = btn.dataset.value;
        });
    });

    // Attendance Selection
    const attendBtns = document.querySelectorAll('.attend-btn');
    const attendInput = document.getElementById('attending');

    attendBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            attendBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            attendInput.value = btn.dataset.value;
        });
    });

    // Form Submission
    rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const fullName = document.getElementById('fullName').value;
        const attending = attendInput.value;

        if (!fullName.trim() || !attending) {
            alert('Խնդրում ենք լրացնել բոլոր պարտադիր դաշտերը');
            return;
        }

        // Simulate form submission
        rsvpForm.classList.add('hidden');
        rsvpSuccess.classList.remove('hidden');

        // Scroll to success message
        const rsvpSection = document.getElementById('rsvp');
        rsvpSection.scrollIntoView({ behavior: 'smooth' });
    });

    rsvpReset.addEventListener('click', () => {
        rsvpForm.reset();
        rsvpForm.classList.remove('hidden');
        rsvpSuccess.classList.add('hidden');

        // Reset custom inputs
        guestBtns.forEach(b => b.classList.remove('active'));
        guestBtns[0].classList.add('active');
        guestsInput.value = "1";

        attendBtns.forEach(b => b.classList.remove('active'));
        attendInput.value = "";
    });

    // Initial height report
    reportHeight();

    // Re-report on window resize and load
    window.addEventListener('resize', reportHeight);
    window.addEventListener('load', reportHeight);

    // Periodic check for dynamic content changes
    setInterval(reportHeight, 1500);

    // Watch for content changes (e.g. form success state, reveal animations)
    const heightObserver = new MutationObserver(reportHeight);
    heightObserver.observe(document.body, { attributes: true, childList: true, subtree: true });
});
