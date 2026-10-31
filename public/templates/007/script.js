/**
 * Script for Template 007 to report height to parent iframe.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Report height to parent for "single scroll" behavior
    function reportHeight() {
        const height = document.documentElement.scrollHeight || document.body.scrollHeight;
        window.parent.postMessage({ type: 'SET_HEIGHT', height: height }, '*');
    }

    // Countdown Logic (Imitation - starts from 43d 14h 28m 08s on every load)
    const staticOffset = (43 * 24 * 60 * 60 * 1000) + (14 * 60 * 60 * 1000) + (28 * 60 * 1000) + (8 * 1000);
    const targetDate = new Date().getTime() + staticOffset;

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = days.toString().padStart(2, '0');
        document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
        document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');
    }

    // Initial countdown call and interval
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Watch for content changes (for height reporting)
    const observer = new MutationObserver(reportHeight);
    observer.observe(document.body, { attributes: true, childList: true, subtree: true });

    // Also report height after all images are loaded
    window.addEventListener('load', reportHeight);

    // Music Toggle Logic
    const toggleBtn = document.getElementById('music-toggle-btn');
    const bgMusic = document.getElementById('bg-music');
    const playIcon = toggleBtn.querySelector('.play-icon');
    const pauseIcon = toggleBtn.querySelector('.pause-icon');

    // Attempt to autoplay on load
    let hasInteracted = false;

    const updatePlayState = () => {
        toggleBtn.classList.add('is-playing');
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
    };

    const updatePauseState = () => {
        toggleBtn.classList.remove('is-playing');
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
    };

    const playAudio = () => {
        bgMusic.play().then(() => {
            hasInteracted = true;
            updatePlayState();
        }).catch(error => {
            updatePauseState();
        });
    };

    // Try playing immediately
    playAudio();

    // Play on first interaction if blocked
    const startMusicOnInteraction = () => {
        if (!hasInteracted && bgMusic.paused) {
            playAudio();
            // Remove listeners once audio starts playing
            if (!bgMusic.paused) {
                document.removeEventListener('click', startMusicOnInteraction);
                document.removeEventListener('scroll', startMusicOnInteraction);
                document.removeEventListener('touchstart', startMusicOnInteraction);
            }
        }
    };

    document.addEventListener('click', startMusicOnInteraction);
    document.addEventListener('scroll', startMusicOnInteraction, { passive: true });
    document.addEventListener('touchstart', startMusicOnInteraction, { passive: true });

    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent global interaction listener from firing concurrently
        hasInteracted = true; // User interacted with button
        if (bgMusic.paused) {
            bgMusic.play();
            updatePlayState();
        } else {
            bgMusic.pause();
            updatePauseState();
        }
    });

});
