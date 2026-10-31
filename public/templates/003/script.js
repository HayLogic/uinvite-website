/**
 * Simple script for Template 003 to report height to parent iframe.
 */

document.addEventListener('DOMContentLoaded', () => {
    let lastHeight = 0;

    // Report height to parent for "single scroll" behavior
    function reportHeight() {
        const height = document.documentElement.scrollHeight || document.body.scrollHeight;
        if (Math.abs(height - lastHeight) > 2) { // Threshold to avoid micro-adjustments if any
            lastHeight = height;
            window.parent.postMessage({ type: 'SET_HEIGHT', height: height }, '*');
        }
    }

    // Initial report
    reportHeight();

    // Use a small timeout to ensure everything is rendered
    setTimeout(reportHeight, 100);

    // Re-report on window resize
    window.addEventListener('resize', reportHeight);

    // Watch for content changes
    const observer = new MutationObserver(reportHeight);
    observer.observe(document.body, { attributes: true, childList: true, subtree: true });
});
