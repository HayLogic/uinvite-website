document.addEventListener('DOMContentLoaded', () => {
    // Height Reporting for Iframe Integration
    let lastHeight = 0;
    function reportHeight() {
        const height = Math.ceil(document.documentElement.scrollHeight || document.body.scrollHeight);
        if (Math.abs(height - lastHeight) > 2) {
            window.parent.postMessage({ type: 'SET_HEIGHT', height: height }, '*');
            lastHeight = height;
        }
    }

    // Initial and event-based reporting
    reportHeight();
    window.addEventListener('resize', reportHeight);
    window.addEventListener('load', reportHeight);

    // Periodic check is safer than MutationObserver for preventing infinite loops
    setInterval(reportHeight, 1500);


    // Reveal animations on scroll (using IntersectionObserver for better iframe support)
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

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Safety fallback: reveal all elements after a delay if they aren't revealed
    setTimeout(() => {
        revealElements.forEach(el => {
            if (!el.classList.contains('active')) {
                el.classList.add('active');
            }
        });
    }, 3000);


    // Hero background parallax effect
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        window.addEventListener('scroll', () => {
            const scroll = window.pageYOffset;
            heroBg.style.transform = `scale(1.1) translateY(${scroll * 0.3}px)`;
        });
    }

    // RSVP Form Handling
    const rsvpForm = document.getElementById('wedding-rsvp-form');
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = rsvpForm.querySelector('.luxury-btn');
            const originalText = submitBtn.querySelector('span').textContent;

            submitBtn.disabled = true;
            submitBtn.querySelector('span').textContent = 'Ուղարկվում է...';

            // Simulate form submission
            await new Promise(resolve => setTimeout(resolve, 2000));

            alert('Շնորհակալություն! Ձեր հայտն ուղարկված է։');
            rsvpForm.reset();

            submitBtn.disabled = false;
            submitBtn.querySelector('span').textContent = originalText;
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
