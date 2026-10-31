/**
 * Simple script for Template 001 to report height to parent iframe.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Report height to parent for "single scroll" behavior
    function reportHeight() {
        const height = document.documentElement.scrollHeight || document.body.scrollHeight;
        window.parent.postMessage({ type: 'SET_HEIGHT', height: height }, '*');
    }

    // Initial report
    reportHeight();

    // Music Toggle Logic
    const musicBtn = document.getElementById('music-toggle-btn');
    const bgMusic = document.getElementById('bg-music');
    const playIcon = musicBtn?.querySelector('.play-icon');
    const pauseIcon = musicBtn?.querySelector('.pause-icon');

    if (musicBtn && bgMusic) {
        musicBtn.addEventListener('click', () => {
            if (bgMusic.paused) {
                bgMusic.play().then(() => {
                    musicBtn.classList.add('is-playing');
                    if (playIcon) playIcon.style.display = 'none';
                    if (pauseIcon) pauseIcon.style.display = 'block';
                }).catch(error => {
                    console.error("Music playback failed:", error);
                });
            } else {
                bgMusic.pause();
                musicBtn.classList.remove('is-playing');
                if (playIcon) playIcon.style.display = 'block';
                if (pauseIcon) pauseIcon.style.display = 'none';
            }
        });

        // Try to play immediately on load
        bgMusic.play().then(() => {
            musicBtn.classList.add('is-playing');
            if (playIcon) playIcon.style.display = 'none';
            if (pauseIcon) pauseIcon.style.display = 'block';
        }).catch(() => {
            // Autoplay likely blocked, wait for interaction
            console.log("Autoplay blocked, waiting for interaction...");
        });

        // Try to play on first interaction (browser requirement backup)
        const playOnFirstInteraction = () => {
            bgMusic.play().then(() => {
                musicBtn.classList.add('is-playing');
                if (playIcon) playIcon.style.display = 'none';
                if (pauseIcon) pauseIcon.style.display = 'block';
                document.removeEventListener('click', playOnFirstInteraction);
                document.removeEventListener('touchstart', playOnFirstInteraction);
            }).catch(() => {
                // Autoplay blocked, wait for button click
            });
        };

        document.addEventListener('click', playOnFirstInteraction);
        document.addEventListener('touchstart', playOnFirstInteraction);
    }

    // Re-report on window resize
    window.addEventListener('resize', reportHeight);

    // Watch for content changes
    const observer = new MutationObserver(reportHeight);
    observer.observe(document.body, { attributes: true, childList: true, subtree: true });
});
