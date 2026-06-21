// Chimes Crane Hire — Mockup v3 shared behaviour

// Header shadow on scroll
const hdr = document.getElementById('hdr');
if (hdr) window.addEventListener('scroll', () => hdr.classList.toggle('scrolled', scrollY > 20));

// Mobile nav toggle
const hbg = document.getElementById('hbg');
if (hbg) hbg.addEventListener('click', () => document.getElementById('nav').classList.toggle('open'));

// Fade-up on scroll
const fus = document.querySelectorAll('.fu');
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      const siblings = [...(e.target.parentElement?.children || [])];
      const idx = siblings.indexOf(e.target);
      setTimeout(() => e.target.classList.add('vis'), Math.max(0, idx) * 90);
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
fus.forEach(el => io.observe(el));

// Count-up for stats
function countUp(el, target, suffix) {
  let v = 0;
  const step = target / 60;
  const t = setInterval(() => {
    v = Math.min(v + step, target);
    el.textContent = Math.floor(v) + suffix;
    if (v >= target) clearInterval(t);
  }, 22);
}
const sio = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const t = parseInt(e.target.dataset.to);
      if (t) countUp(e.target, t, e.target.dataset.suffix || '+');
      sio.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-n[data-to]').forEach(el => sio.observe(el));

// Fleet spec modal
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) { modal.classList.add('open'); document.body.style.overflow = 'hidden'; }
}
function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) { modal.classList.remove('open'); document.body.style.overflow = ''; }
}
document.querySelectorAll('.modal-backdrop').forEach(m => {
  m.addEventListener('click', (e) => { if (e.target === m) closeModal(m.id); });
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') document.querySelectorAll('.modal-backdrop.open').forEach(m => closeModal(m.id));
});

// Quote form demo submit
function handleForm(e) {
  e.preventDefault();
  const btn = document.getElementById('sub-btn');
  if (!btn) return;
  btn.textContent = 'Sending...';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Request Sent!';
    btn.style.background = '#0c3a1a';
    e.target.reset();
    setTimeout(() => {
      btn.textContent = 'Submit Request';
      btn.disabled = false;
      btn.style.background = '';
    }, 3000);
  }, 1200);
}

// Newsletter signup demo
function handleSignup(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  const original = btn.textContent;
  btn.textContent = 'Subscribed!';
  e.target.reset();
  setTimeout(() => { btn.textContent = original; }, 2500);
}
