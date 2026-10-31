document.addEventListener('DOMContentLoaded', () => {
    // Loader
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 1000);

    // Navbar scroll effect and Mobile Menu
    const navbar = document.getElementById('navbar');
    const hamburger = document.querySelector('.hamburger');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    hamburger.addEventListener('click', () => {
        navbar.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
        });
    });

    // Parallax effect for Hero Background
    const bgImg = document.querySelector('.bg-img');
    const bgImgRsvp = document.querySelector('.bg-img-rsvp');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (bgImg) {
            bgImg.style.transform = `translateY(${scrolled * 0.4}px)`;
        }
        if (bgImgRsvp) {
            // simpler parallax for rsvp to avoid overflow issues
            bgImgRsvp.style.transform = `translateY(${(scrolled - document.getElementById('rsvp').offsetTop) * 0.2}px)`;
        }
    });

    // Scroll Reveal Animation
    const reveals = document.querySelectorAll('.reveals');
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger on load

    // Countdown Timer (Static as requested)
    // Values are updated directly in index.html

    // RSVP Form Handling
    const rsvpForm = document.getElementById('rsvp-form');
    const rsvpSuccess = document.getElementById('rsvp-success');

    if (rsvpForm) {
        rsvpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Simulate form submission
            const btn = rsvpForm.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            btn.innerText = 'Ուղարկվում է...';
            btn.disabled = true;

            setTimeout(() => {
                rsvpForm.reset();
                btn.innerText = originalText;
                btn.disabled = false;
                rsvpSuccess.classList.remove('hidden');
                if (typeof reportHeight === 'function') reportHeight();

                setTimeout(() => {
                    rsvpSuccess.classList.add('hidden');
                    if (typeof reportHeight === 'function') reportHeight();
                }, 5000);
            }, 1500);
        });
    }

    // ===== GOLD DUST PARTICLES =====
    const canvas = document.getElementById('dust-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.1;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * -0.5 - 0.1;
                this.opacity = Math.random() * 0.5 + 0.1;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.size > 0.2) this.size -= 0.005;

                if (this.y < 0 || this.x < 0 || this.x > canvas.width) {
                    this.y = canvas.height;
                    this.x = Math.random() * canvas.width;
                    this.size = Math.random() * 2 + 0.1;
                }
            }
            draw() {
                ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const initParticles = () => {
            particles = [];
            let numParticles = window.innerWidth > 768 ? 100 : 40;
            for (let i = 0; i < numParticles; i++) {
                particles.push(new Particle());
            }
        };

        const animateParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }
            requestAnimationFrame(animateParticles);
        };

        initParticles();
        animateParticles();
    }
});

// ==========================================
// Height reporting for iframe embed
// ==========================================
let lastFrameHeight = 0;

function reportHeight() {
    var bodyHeight = document.body ? document.body.offsetHeight : 0;
    var htmlHeight = document.documentElement ? document.documentElement.offsetHeight : 0;
    var height = Math.max(bodyHeight, htmlHeight);

    if (Math.abs(height - lastFrameHeight) > 5) {
        window.parent.postMessage({ type: 'SET_HEIGHT', height: height }, '*');
        lastFrameHeight = height;
    }
}

// Initial height report
reportHeight();

// Re-report on window resize and load
window.addEventListener('resize', reportHeight);
window.addEventListener('load', reportHeight);

// Periodic check for dynamic content changes
setInterval(reportHeight, 1500);

// Watch for content changes
document.addEventListener('DOMContentLoaded', () => {
    const heightObserver = new MutationObserver(reportHeight);
    if (document.body) {
        heightObserver.observe(document.body, { attributes: true, childList: true, subtree: true });
    }
    reportHeight();
});
