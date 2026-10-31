// ===== MUSIC =====

const audio = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');

audio.volume = 0.5;

let userToggled = false;

musicBtn.addEventListener('click', () => {

  userToggled = true;

  if (audio.paused) {

    audio.play().catch(() => {});
    musicBtn.classList.remove('muted');

  } else {

    audio.pause();
    musicBtn.classList.add('muted');

  }

});

// ===== ENVELOPE OPEN =====

const envelope = document.getElementById('envelope');
const openBtn = document.getElementById('openBtn');
const invitation = document.getElementById('invitation');

openBtn.addEventListener('click', () => {

  envelope.classList.add('opening');

  invitation.classList.remove('hidden');

  musicBtn.classList.remove('hidden');

  audio.play()
    .then(() => {
      musicBtn.classList.remove('muted');
    })
    .catch(() => {
      musicBtn.classList.add('muted');
    });

  setTimeout(() => {

    envelope.classList.add('gone');

    document.body.style.overflow = 'auto';

  }, 1300);

});

// ===== COUNTDOWN =====

const target = new Date('2026-09-26T13:30:00').getTime();

function tick() {

  const now = Date.now();

  let diff = Math.max(0, target - now);

  const d = Math.floor(diff / 86400000);
  diff -= d * 86400000;

  const h = Math.floor(diff / 3600000);
  diff -= h * 3600000;

  const m = Math.floor(diff / 60000);
  diff -= m * 60000;

  const s = Math.floor(diff / 1000);

  const pad = n => String(n).padStart(2, '0');

  document.getElementById('cd-days').textContent = pad(d);
  document.getElementById('cd-hours').textContent = pad(h);
  document.getElementById('cd-mins').textContent = pad(m);
  document.getElementById('cd-secs').textContent = pad(s);

}

tick();

setInterval(tick, 1000);

// ===== CALENDAR =====

const cal = document.getElementById('calendar');

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

days.forEach(d => {

  const el = document.createElement('div');

  el.className = 'cal-h';

  el.textContent = d;

  cal.appendChild(el);

});

const firstDay = new Date(2026, 8, 1).getDay();

const offset = (firstDay + 6) % 7;

for (let i = 0; i < offset; i++) {

  const e = document.createElement('div');

  e.className = 'cal-d empty';

  cal.appendChild(e);

}

for (let day = 1; day <= 30; day++) {

  const e = document.createElement('div');

  e.className = 'cal-d' + (day === 26 ? ' highlight' : '');

  e.innerHTML = `<span>${day}</span>`;

  cal.appendChild(e);

}

 // RSVP Form Logic

const rsvpForm = document.getElementById('rsvpForm');
const formSuccess = document.getElementById('rsvpThanks');

if (rsvpForm) {

    rsvpForm.addEventListener('submit', async (e) => {

        e.preventDefault();

        const formData = new FormData(rsvpForm);

        const submitBtn =
            rsvpForm.querySelector('.rsvp-submit');

        const data = {

            template_code: 'EDGAR_ANNA',

            name:
                formData.get('name'),

            attendance:
                formData.get('attendance'),

            guest_count:
                formData.get('guest_count'),

            side:
                formData.get('side')

        };

        // disable button

        if (submitBtn) {

            submitBtn.disabled = true;

            submitBtn.innerText =
                'Ուղարկվում է...';

        }

        try {

            const response = await fetch(
                API_BASE_URL + '/api/rsvp',
                {

                    method: 'POST',

                    headers: {
                        'Content-Type': 'application/json',
                    },

                    body: JSON.stringify(data),

                }
            );

            const result = await response.json();

            if (result.success) {

                // hide form fields
                rsvpForm.reset();

                // show success message
                formSuccess.classList.remove('hidden');

                formSuccess.style.display = 'block';

                // optional
                submitBtn.style.display = 'none';

            } else {

                alert(
                    'Սխալ տեղի ունեցավ։'
                );

                submitBtn.disabled = false;

                submitBtn.innerText =
                    'ՈՒՂԱՐԿԵԼ';

            }

        } catch (error) {

            console.error(error);

            alert(
                'Կապի սխալ'
            );

            submitBtn.disabled = false;

            submitBtn.innerText =
                'ՈՒՂԱՐԿԵԼ';

        }

    });

}