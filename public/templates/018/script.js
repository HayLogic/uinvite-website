
/* ─── WATER CANVAS ─── */
const canvas = document.getElementById('waterCanvas');
const ctx = canvas.getContext('2d');
let W, H, t = 0;

function resize() {
    // Determine the hero section (parent of canvas)
    const hero = document.getElementById('hero');
    W = canvas.width = hero.offsetWidth;
    H = canvas.height = hero.offsetHeight;
}
window.addEventListener('resize', resize);
resize();

function drawWater() {
    ctx.clearRect(0, 0, W, H);
    const layers = [
        { amp: 18, freq: 0.012, speed: 0.002, y: H * 0.55, color: 'rgba(168,200,220,0.12)' },
        { amp: 14, freq: 0.018, speed: 0.003, y: H * 0.6, color: 'rgba(106,159,181,0.1)' },
        { amp: 22, freq: 0.009, speed: 0.0012, y: H * 0.5, color: 'rgba(58,122,154,0.08)' },
        { amp: 10, freq: 0.025, speed: 0.0045, y: H * 0.65, color: 'rgba(200,220,240,0.07)' },
    ];

    layers.forEach(layer => {
        ctx.beginPath();
        ctx.moveTo(0, H);
        for (let x = 0; x <= W; x += 4) {
            const y = layer.y + Math.sin(x * layer.freq + t * layer.speed * 100) * layer.amp
                + Math.cos(x * layer.freq * 0.7 + t * layer.speed * 80) * (layer.amp * 0.5);
            ctx.lineTo(x, y);
        }
        ctx.lineTo(W, H);
        ctx.closePath();
        ctx.fillStyle = layer.color;
        ctx.fill();
    });

    // Light reflection shimmer
    for (let i = 0; i < 5; i++) {
        const sx = (W * 0.1 + i * W * 0.18 + Math.sin(t * 0.03 + i) * 30) % W;
        const sy = H * (0.45 + i * 0.04) + Math.cos(t * 0.025 + i) * 20;
        const grad = ctx.createRadialGradient(sx, sy, 0, sx, sy, 60 + i * 15);
        grad.addColorStop(0, 'rgba(255,255,255,0.06)');
        grad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.ellipse(sx, sy, 80 + i * 20, 20, 0, 0, Math.PI * 2);
        ctx.fill();
    }

    t++;
    requestAnimationFrame(drawWater);
}
drawWater();

/* ─── FLOATING PARTICLES ─── */
const particlesContainer = document.getElementById('particles');
for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 8 + 3;
    p.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    left: ${Math.random() * 100}%;
    animation-duration: ${Math.random() * 12 + 8}s;
    animation-delay: ${Math.random() * 10}s;
    opacity: ${Math.random() * 0.5 + 0.1};
  `;
    particlesContainer.appendChild(p);
}

/* ─── SCROLL REVEAL ─── */
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
        }
    });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

/* ─── ATTEND TOGGLE ─── */
let attendChoice = null;
function selectAttend(btn, val) {
    document.querySelectorAll('.attend-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    attendChoice = val;
}

/* ─── FORM SUBMIT ─── */
function handleSubmit() {
    const name = document.getElementById('fullname').value.trim();
    if (!name) { alert('Please enter your name · Խնդրում ենք մուտքագրել անունը'); return; }
    if (!attendChoice) { alert('Please select if you will attend'); return; }

    const title = document.getElementById('successMessageTitle');
    const text = document.getElementById('successMessageText');
    const sub = document.getElementById('successMessageSub');

    if (attendChoice === 'yes') {
        title.innerText = 'Աստված օրհնի ձեզ';
        text.innerText = 'Անհամբեր սպասում ենք Ձեզ հետ տոնելուն։';
        // Confetti only for 'yes'
        launchConfetti();
    } else {
        title.innerText = 'Շնորհակալություն';
        text.innerText = 'Մենք կկարոտենք Ձեզ մեր տոնին:';
    }

    setTimeout(() => {
        document.getElementById('successOverlay').classList.add('visible');
    }, 300);
}

function launchConfetti() {
    const colors = ['#7B1C35', '#C9A84C', '#A8C8DC', '#C4714A', '#1A2C4E', '#E4C875'];
    const container = document.querySelector('.rsvp-card');
    for (let i = 0; i < 60; i++) {
        const conf = document.createElement('div');
        conf.className = 'confetti-piece';
        conf.style.cssText = `
      left: ${Math.random() * 100}%;
      top: -10px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      animation-duration: ${Math.random() * 2 + 1.5}s;
      animation-delay: ${Math.random() * 0.5}s;
      transform: rotate(${Math.random() * 360}deg);
      border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
    `;
        container.appendChild(conf);
        conf.addEventListener('animationend', () => conf.remove());
    }
}



/* ─── HEIGHT REPORTING ─── */
let lastHeight = 0;
function reportHeight() {
    const height = Math.ceil(document.documentElement.scrollHeight || document.body.scrollHeight);
    // Infinite Zoom Guard: Use a 5px threshold to prevent feedback loops in auto-sizing iframes
    if (Math.abs(height - lastHeight) > 5) {
        window.parent.postMessage({ type: 'SET_HEIGHT', height: height }, '*');
        lastHeight = height;
    }
}

// Initial report
reportHeight();

// Re-report on window resize and load
window.addEventListener('resize', reportHeight);
window.addEventListener('load', reportHeight);

// Periodic check for dynamic content changes
setInterval(reportHeight, 1500);

// Watch for content changes
const heightObserver = new MutationObserver(reportHeight);
heightObserver.observe(document.body, { attributes: true, childList: true, subtree: true });
