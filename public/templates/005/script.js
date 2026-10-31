// Template 005 - Gender Reveal Party Script

document.addEventListener('DOMContentLoaded', function () {
    // Report height to parent for "single scroll" behavior
    function reportHeight() {
        // Small delay to ensure layout is settled
        setTimeout(() => {
            const height = document.documentElement.scrollHeight || document.body.scrollHeight;
            window.parent.postMessage({ type: 'SET_HEIGHT', height: height }, '*');
        }, 100);
    }

    // Initial report
    reportHeight();

    // Re-report on window resize
    window.addEventListener('resize', reportHeight);

    // Watch for content changes
    const observer = new MutationObserver(reportHeight);
    observer.observe(document.body, { attributes: true, childList: true, subtree: true });

    const form = document.getElementById('template-rsvp-form');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(form);
            const data = {
                attendance: formData.get('attendance'),
                guestName: formData.get('guest_name')
            };

            console.log('Form submitted:', data);

            // Show success message
            alert('Ձեր հայտը հաջողությամբ ուղարկվել է!');

            // Reset form
            form.reset();

            // Re-report height
            reportHeight();
        });
    }
});
