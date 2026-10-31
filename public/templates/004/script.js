// Template 004 - Birthday Party Script

document.addEventListener('DOMContentLoaded', function () {
    console.log('Template 004 loaded');

    // Send height to parent iframe
    function sendHeight() {
        const height = document.documentElement.offsetHeight;
        if (window.parent !== window) {
            window.parent.postMessage({ type: 'SET_HEIGHT', height: height }, '*');
        }
    }

    // Send initial height
    sendHeight();

    // Re-send on resize and after images load
    window.addEventListener('resize', sendHeight);

    // Wait for images to load then update height
    const images = document.querySelectorAll('img');
    let loadedImages = 0;

    images.forEach(img => {
        if (img.complete) {
            loadedImages++;
            if (loadedImages === images.length) {
                sendHeight();
            }
        } else {
            img.addEventListener('load', () => {
                loadedImages++;
                if (loadedImages === images.length) {
                    sendHeight();
                }
            });
        }
    });

    // Fallback: send height after a delay
    setTimeout(sendHeight, 500);
    setTimeout(sendHeight, 1000);
    setTimeout(sendHeight, 2000);
});
