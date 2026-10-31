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

    // RSVP Form Logic
const rsvpForm = document.getElementById('template-rsvp-form');

if (rsvpForm) {
  rsvpForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(rsvpForm);
    const submitBtn = rsvpForm.querySelector('.rsvp-submit');

    const data = {
      template_code: 'AREN',
    name: formData.get('guest_name'),
    attendance: formData.get('attendance'),
    guests_count: Number(formData.get('guests_count'))
    };

    submitBtn.disabled = true;
    submitBtn.innerText = 'Ուղարկվում է...';

    try {
      const response = await fetch('https://api.uinvite.am/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        rsvpForm.innerHTML = `
          <div style="text-align:center;color:white;font-size:24px;">
            Շնորհակալություն!<br>Ձեր պատասխանը գրանցված է:
          </div>`;
      } else {
        throw new Error();
      }

    } catch (error) {
      alert('Սխալ տեղի ունեցավ');
      submitBtn.disabled = false;
      submitBtn.innerText = 'Ուղարկել';
    }
  });
}
});


/* COUNTDOWN */

const eventDate = new Date("Dec 05, 2026 17:30:00").getTime();

const timer = setInterval(() => {

  const now = new Date().getTime();

  const distance = eventDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerHTML = days;
  document.getElementById("hours").innerHTML = hours;
  document.getElementById("minutes").innerHTML = minutes;
  document.getElementById("seconds").innerHTML = seconds;

  if(distance < 0){

    clearInterval(timer);

  }

},1000);

/* MUSIC */

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

music.volume = 0.4;

musicBtn.addEventListener("click", () => {

  if(music.paused){

    music.play();
    musicBtn.innerHTML = "🎵 Երաժշտությունը Միացված է";

  }else{

    music.pause();
    musicBtn.innerHTML = "🔇 Երաժշտությունը Անջատված է";

  }

});


