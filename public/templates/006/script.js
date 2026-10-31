/**
 * Template 006 - Header and Mobile Menu Script
 */

document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu elements
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    // Toggle menu
    function toggleMenu() {
        const isOpen = mobileMenu.classList.contains('active');

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    // Open menu
    function openMenu() {
        mobileMenu.classList.add('active');
        mobileMenuBtn.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Close menu
    function closeMenu() {
        mobileMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Event listeners
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMenu);
    }

    // RSVP Form Handling
    const rsvpForm = document.getElementById('rsvpForm');
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(rsvpForm);
            const data = Object.fromEntries(formData.entries());
            console.log('RSVP Submission:', data);
            alert('Շնորհակալություն ձեր պատասխանի համար:');
            rsvpForm.reset();
        });
    }

    // Unified Navigation Handling
    const allLinks = document.querySelectorAll('a[href^="#"]');
    allLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || !href.startsWith('#')) return;

            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();

                // 1. Close mobile menu first
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    closeMenu();
                }

                // 2. Use a short timeout to ensure body overflow is restored
                setTimeout(() => {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 50);
            }
        });
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const toggle = item.querySelector('.faq-toggle');

        function toggleFaq() {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
        }

        if (question) {
            question.addEventListener('click', toggleFaq);
        }

        if (toggle) {
            toggle.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleFaq();
            });
        }
    });

    // Report height to parent for iframe behavior
    function reportHeight() {
        const height = document.body.offsetHeight;
        window.parent.postMessage({ type: 'SET_HEIGHT', height: height }, '*');
    }

    // Initial report
    reportHeight();

    // Re-report on window resize
    window.addEventListener('resize', reportHeight);

    // Watch for content changes
    const observer = new MutationObserver(reportHeight);
    observer.observe(document.body, { attributes: true, childList: true, subtree: true });
});
