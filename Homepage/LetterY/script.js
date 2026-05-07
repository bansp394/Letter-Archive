/* ── 1. CUSTOM CURSOR ──────────────────────────── */

const cursor = document.getElementById('cursor');
const ring   = document.getElementById('ring');
const glow   = document.getElementById('glow');

let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

document.addEventListener('mousemove', function(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX - 5 + 'px';
  cursor.style.top  = mouseY - 5 + 'px';
  glow.style.left   = mouseX + 'px';
  glow.style.top    = mouseY + 'px';
});

(function lerpRing() {
  ringX += (mouseX - ringX) * 0.11;
  ringY += (mouseY - ringY) * 0.11;
  ring.style.left = ringX - 16 + 'px';
  ring.style.top  = ringY - 16 + 'px';
  requestAnimationFrame(lerpRing);
})();

document.querySelectorAll('a, .image-box').forEach(function(el) {
  el.addEventListener('mouseenter', function() {
    cursor.classList.add('hov');
    ring.classList.add('hov');
  });
  el.addEventListener('mouseleave', function() {
    cursor.classList.remove('hov');
    ring.classList.remove('hov');
  });
});


/* ── 2. TOOLTIP ────────────────────────────────── */

const tip = document.getElementById('tip');

document.querySelectorAll('[data-tooltip]').forEach(function(el) {
  el.addEventListener('mouseenter', function() {
    tip.textContent = el.getAttribute('data-tooltip');
    tip.classList.add('show');
  });
  el.addEventListener('mousemove', function(e) {
    tip.style.left = e.clientX + 50 + 'px';
    tip.style.top  = e.clientY - 8  + 'px';
  });
  el.addEventListener('mouseleave', function() {
    tip.classList.remove('show');
  });
});


/* ── 3. FLOATING LEAVES ────────────────────────── */

const leavesWrap = document.getElementById('leavesWrap');
const leafColors = ['#3d5e30','#2d4a2e','#a8b87a','#6b4c2a','#5a7a3a'];

function createLeaf(container) {
  const svg  = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const size = 10 + Math.random() * 18;
  svg.setAttribute('width',   size);
  svg.setAttribute('height',  size * 1.5);
  svg.setAttribute('viewBox', '0 0 20 30');
  const color = leafColors[Math.floor(Math.random() * leafColors.length)];
  svg.innerHTML = `
    <ellipse cx="10" cy="15" rx="8" ry="13" fill="${color}" opacity="0.58"/>
    <line x1="10" y1="2"  x2="10" y2="28" stroke="${color}" stroke-width="0.8" opacity="0.38"/>
    <line x1="10" y1="11" x2="4"  y2="17" stroke="${color}" stroke-width="0.5" opacity="0.28"/>
    <line x1="10" y1="11" x2="16" y2="17" stroke="${color}" stroke-width="0.5" opacity="0.28"/>
  `;
  const leafEl = document.createElement('div');
  leafEl.className = 'leaf';
  leafEl.style.left              = Math.random() * 100 + 'vw';
  leafEl.style.animationDuration = 9 + Math.random() * 14 + 's';
  leafEl.style.animationDelay    = Math.random() * 18 + 's';
  leafEl.appendChild(svg);
  container.appendChild(leafEl);
}

for (let i = 0; i < 22; i++) {
  createLeaf(leavesWrap);
}




const quoteLines = document.querySelectorAll('.quote-line');
const imageClip  = document.getElementById('imageClip');
const imgCap     = document.getElementById('imgCap');
const clipClasses = ['reveal-33', 'reveal-67', 'reveal-100'];

function revealOnScroll() {
  const scrollY   = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  const p = Math.min(scrollY / maxScroll, 1);

  // Line 1
  document.querySelector('.quote-line[data-line="1"]')
    .classList.toggle('visible', p > 0.01);

  // Line 2
  document.querySelector('.quote-line[data-line="2"]')
    .classList.toggle('visible', p > 0.30);

  // Line 3 + attribution
  document.querySelectorAll('.quote-line[data-line="3"]').forEach(function(el) {
    el.classList.toggle('visible', p > 0.60);
  });

  // Image clip
  clipClasses.forEach(function(cls) {
    imageClip.classList.remove(cls);
  });

  if (p <= 0.01) {
    imgCap.classList.remove('visible');
  } else if (p <= 0.30) {
    imageClip.classList.add('reveal-33');
    imgCap.classList.remove('visible');
  } else if (p <= 0.60) {
    imageClip.classList.add('reveal-67');
    imgCap.classList.remove('visible');
 } else {
    imageClip.classList.add('reveal-100');
    imgCap.classList.add('visible');
    document.querySelector('.letter-title').classList.add('visible');
  }
}

window.addEventListener('scroll', revealOnScroll, { passive: true });
revealOnScroll();