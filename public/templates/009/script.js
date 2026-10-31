/**
 * Script for Template 009 to report height to parent iframe.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Report height to parent for "single scroll" behavior
    function reportHeight() {
        const height = document.documentElement.scrollHeight || document.body.scrollHeight;
        window.parent.postMessage({ type: 'SET_HEIGHT', height: height }, '*');
    }

    // Initial report
    reportHeight();

    // Watch for content changes (for height reporting)
    const observer = new MutationObserver(reportHeight);
    observer.observe(document.body, { attributes: true, childList: true, subtree: true });

    // Also report height after all images are loaded
    window.addEventListener('load', reportHeight);

    // Periodically report height for safety (e.g., if images resize late)
    setInterval(reportHeight, 500);
});
