/**
 * Simple script for Template 002 to report height to parent iframe.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Report height to parent for "single scroll" behavior
    function reportHeight() {
        const height = document.documentElement.scrollHeight || document.body.scrollHeight;
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
