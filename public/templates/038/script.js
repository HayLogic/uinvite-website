// ===== MUSIC =====
const audio = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
audio.volume = 0.5;
let userToggled = false;

musicBtn.addEventListener('click', () => {
  userToggled = true;
  if (audio.paused) { audio.play().catch(()=>{}); musicBtn.classList.remove('muted'); }
  else { audio.pause(); musicBtn.classList.add('muted'); }
});

// ===== ENVELOPE OPEN =====
const envelope = document.getElementById('envelope');
const openBtn  = document.getElementById('openBtn');
const invitation = document.getElementById('invitation');
const close = document.getElementById('close');

openBtn.addEventListener('click', () => {
  envelope.classList.add('opening');
  invitation.classList.remove('hidden');
  musicBtn.classList.remove('hidden');
    close.style.display = 'none'; 

  // Try autoplay on open
  audio.play().then(() => musicBtn.classList.remove('muted'))
              .catch(() => musicBtn.classList.add('muted'));
  setTimeout(() => {
    
    document.body.style.overflow = 'auto';
      envelope.classList.add('gone');
  }, 1300);
});

// ===== COUNTDOWN =====
const target = new Date('2026-08-29T14:00:00').getTime();
function tick(){
  const now = Date.now();
  let diff = Math.max(0, target - now);
  const d = Math.floor(diff / 86400000); diff -= d * 86400000;
  const h = Math.floor(diff / 3600000);  diff -= h * 3600000;
  const m = Math.floor(diff / 60000);    diff -= m * 60000;
  const s = Math.floor(diff / 1000);
  const pad = n => String(n).padStart(2,'0');
  document.getElementById('cd-days').textContent  = pad(d);
  document.getElementById('cd-hours').textContent = pad(h);
  document.getElementById('cd-mins').textContent  = pad(m);
  document.getElementById('cd-secs').textContent  = pad(s);
}
tick(); setInterval(tick, 1000);

// ===== CALENDAR (June 2026) =====
const cal = document.getElementById('calendar');
const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
days.forEach(d => {
  const el = document.createElement('div');
  el.className = 'cal-h'; el.textContent = d;
  cal.appendChild(el);
});
const firstDay = new Date(2026,7,1).getDay();
const offset = (firstDay + 6) % 7;
for (let i=0; i<offset; i++){
  const e = document.createElement('div'); e.className='cal-d empty'; cal.appendChild(e);
}
for (let day=1; day<=30; day++){
  const e = document.createElement('div');
  e.className = 'cal-d' + (day===29 ? ' highlight' : '');
  e.innerHTML = `<span>${day}</span>`;
  cal.appendChild(e);
}

// ===== RSVP =====
const rsvpForm = document.getElementById('rsvpForm');
const rsvpThanks = document.getElementById('rsvpThanks');
rsvpForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(rsvpForm).entries());
  console.log('RSVP:', data);
  rsvpForm.querySelectorAll('input, button').forEach(el => el.disabled = true);
  rsvpThanks.classList.remove('hidden');
});
