document.addEventListener('DOMContentLoaded', function () {
    // ========================
    // Height Reporting for Iframe
    // ========================
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

    // Re-report on window resize
    window.addEventListener('resize', reportHeight);

    // Also report height after all images are loaded
    window.addEventListener('load', reportHeight);

    // Periodic check for dynamic content changes
    setInterval(reportHeight, 1000);

    // Watch for content changes (e.g. dynamic forms, reveal animations)
    const heightObserver = new MutationObserver(reportHeight);
    heightObserver.observe(document.body, { attributes: true, childList: true, subtree: true });

    // ========================
    // Navbar Scroll Effect
    // ========================
    const navbar = document.querySelector('.navbar');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function () {
            mobileMenu.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('svg');
            if (mobileMenu.classList.contains('active')) {
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';
            } else {
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
            }
        });

        // Close mobile menu when clicking links
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('svg');
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
            });
        });
    }

    // ========================
    // Countdown Timer
    // ========================
    // Dynamic countdown: starts from a fixed duration when the page is loaded
    const eventDate = new Date();
    eventDate.setDate(eventDate.getDate() + 13);
    eventDate.setHours(eventDate.getHours() + 7);
    eventDate.setMinutes(eventDate.getMinutes() + 45);
    eventDate.setSeconds(eventDate.getSeconds() + 23);

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = eventDate.getTime() - now;

        if (difference <= 0) {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // ========================
    // Scroll Reveal Animation (using IntersectionObserver for better iframe support)
    // ========================
    const revealElements = document.querySelectorAll('.reveal');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // ========================
    // Registration Form
    // ========================
    const registrationForm = document.getElementById('registration-form');
    const formContainer = document.querySelector('.registration-form-container');

    if (registrationForm) {
        registrationForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form values
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;

            // Basic validation
            if (!firstName || !lastName || !email) {
                showToast('Please fill in all required fields', 'error');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showToast('Please enter a valid email address', 'error');
                return;
            }

            // Show success message
            showSuccessState();
            showToast('Registration submitted successfully!', 'success');
        });
    }

    function showSuccessState() {
        formContainer.innerHTML = `
            <div class="success-container animate-scale-in">
                <div class="success-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h2 class="success-title">Thank You!</h2>
                <p class="success-message">
                    Your registration has been received. We'll send you a confirmation
                    email with all the event details shortly.
                </p>
                <button class="btn btn-outline" onclick="location.reload()">
                    Submit Another Response
                </button>
            </div>
        `;
    }

    // ========================
    // Toast Notifications
    // ========================
    function showToast(message, type = 'success') {
        // Remove existing toasts
        const existingToast = document.querySelector('.toast');
        if (existingToast) {
            existingToast.remove();
        }

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <span>${message}</span>
        `;

        // Add toast styles
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: ${type === 'success' ? 'linear-gradient(135deg, hsl(330, 85%, 50%) 0%, hsl(270, 70%, 55%) 100%)' : '#ef4444'};
            color: white;
            border-radius: 0.75rem;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            z-index: 9999;
            animation: slideIn 0.3s ease, fadeOut 0.3s ease 2.7s forwards;
        `;

        document.body.appendChild(toast);

        // Remove after 3 seconds
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    // Add toast animations to head
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes fadeOut {
            from {
                opacity: 1;
            }
            to {
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // ========================
    // Smooth Scroll for Links
    // ========================
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

    // ========================
    // Hover Effects Enhancement
    // ========================
    const cards = document.querySelectorAll('.card-glow, .speaker-card, .material-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });

    // Navbar link hover effects
    const navLinks = document.querySelectorAll('.navbar-nav > a');

    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-2px)';
        });

        link.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });
});
