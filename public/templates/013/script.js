// =============================================
// Armenian Baptism Invitation - Main JavaScript
// =============================================

document.addEventListener('DOMContentLoaded', function () {
    // ========================
    // Height Reporting for Iframe
    // ========================
    let lastHeight = 0;
    function reportHeight() {
        const wrapper = document.getElementById('invitation-wrapper');
        if (!wrapper) return;
        const height = Math.ceil(wrapper.offsetHeight);
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

    // Initialize all animations and interactions
    initIntersectionObserver();
    initRSVPForm();
});

// =============================================
// Intersection Observer for Scroll Animations
// =============================================
function initIntersectionObserver() {
    // Observer for fade-in sections
    const fadeObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                }
            });
        },
        { threshold: 0.1 }
    );

    // Observer for reveal items with staggered animation
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const children = entry.target.querySelectorAll('.reveal-item');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('animate-slide-up');
                        }, index * 150);
                    });
                }
            });
        },
        { threshold: 0.2 }
    );

    // Apply fade observer to hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        fadeObserver.observe(heroSection);
    }

    // Apply fade observer to invitation section
    const invitationSection = document.querySelector('.invitation-section');
    if (invitationSection) {
        fadeObserver.observe(invitationSection);
    }

    // Apply reveal observer to sections with reveal items
    const sectionsWithReveal = document.querySelectorAll(
        '.details-section, .family-section, .gallery-section, .rsvp-section'
    );
    sectionsWithReveal.forEach((section) => {
        revealObserver.observe(section);
    });
}

// =============================================
// RSVP Form Handling
// =============================================
function initRSVPForm() {
    const form = document.getElementById('rsvp-form');
    const radioOptions = document.querySelectorAll('.radio-option');
    const formContainer = document.querySelector('.rsvp-form');
    const successContainer = document.getElementById('rsvp-success');

    if (!form) return;

    // Radio button selection
    radioOptions.forEach((option) => {
        option.addEventListener('click', function () {
            // Remove selected class from all options
            radioOptions.forEach((opt) => opt.classList.remove('selected'));
            // Add selected class to clicked option
            this.classList.add('selected');
            // Check the radio input
            const radio = this.querySelector('input[type="radio"]');
            if (radio) {
                radio.checked = true;
            }
        });
    });

    // Form submission
    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const nameInput = document.getElementById('name');
        const attendanceYes = document.getElementById('attendance-yes');
        const attendanceNo = document.getElementById('attendance-no');
        const messageInput = document.getElementById('message');
        const submitBtn = document.getElementById('submit-btn');
        const submitText = document.getElementById('submit-text');
        const submitSpinner = document.getElementById('submit-spinner');

        // Validation
        if (!nameInput.value.trim()) {
            showToast('Please enter your name', 'error');
            nameInput.focus();
            return;
        }

        if (!attendanceYes.checked && !attendanceNo.checked) {
            showToast('Please select your attendance', 'error');
            return;
        }

        // Show loading state
        submitBtn.disabled = true;
        submitText.style.display = 'none';
        submitSpinner.style.display = 'block';

        // Send RSVP to backend API
        const API_URL = API_BASE_URL + '/api/rsvp';

        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    template_code: '013',
                    name: nameInput.value.trim(),
                    attendance: attendanceYes.checked ? 'yes' : 'no',
                    message: messageInput ? messageInput.value.trim() : '',
                }),
            });

            const data = await res.json();

            if (data.success) {
                // Show success state
                if (formContainer && successContainer) {
                    formContainer.style.display = 'none';
                    successContainer.style.display = 'block';
                    successContainer.classList.add('animate-fade-in');
                }
                showToast('Thank you for your response!', 'success');
            } else {
                submitBtn.disabled = false;
                submitText.style.display = 'flex';
                submitSpinner.style.display = 'none';
                showToast('Something went wrong. Please try again.', 'error');
            }
        } catch (err) {
            submitBtn.disabled = false;
            submitText.style.display = 'flex';
            submitSpinner.style.display = 'none';
            showToast('Network error. Please try again.', 'error');
        }
    });
}

// =============================================
// Toast Notification
// =============================================
function showToast(message, type = 'info') {
    // Remove existing toast if any
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
    <div class="toast-content">
      <span class="toast-message">${message}</span>
    </div>
  `;

    // Add styles dynamically if not present
    if (!document.querySelector('#toast-styles')) {
        const styles = document.createElement('style');
        styles.id = 'toast-styles';
        styles.textContent = `
      .toast {
        position: fixed;
        bottom: 2rem;
        left: 50%;
        transform: translateX(-50%);
        padding: 1rem 1.5rem;
        border-radius: 0.75rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        animation: slideInUp 0.3s ease-out;
      }
      
      .toast-success {
        background: linear-gradient(to right, hsl(38, 60%, 50%), hsl(38, 50%, 40%));
        color: hsl(40, 33%, 98%);
      }
      
      .toast-error {
        background: hsl(0, 84%, 60%);
        color: white;
      }
      
      .toast-info {
        background: hsl(210, 30%, 70%);
        color: hsl(30, 10%, 20%);
      }
      
      .toast-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      
      .toast-message {
        font-family: 'Nunito Sans', sans-serif;
      }
      
      @keyframes slideInUp {
        from {
          opacity: 0;
          transform: translate(-50%, 20px);
        }
        to {
          opacity: 1;
          transform: translate(-50%, 0);
        }
      }
    `;
        document.head.appendChild(styles);
    }

    // Add toast to body
    document.body.appendChild(toast);

    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideInUp 0.3s ease-out reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// =============================================
// Smooth Scroll for Navigation (if needed)
// =============================================
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}
