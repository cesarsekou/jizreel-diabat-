/* ===================================================
   JIZREEL DIABATÉ — Portfolio JavaScript
   Scattered gallery, animations, lightbox, parallax
   =================================================== */

'use strict';

// ===================================================
// CONFIG — À personnaliser avec les vrais numéros
// ===================================================
const PAY_CONFIG = {
  wave:   { phone: '+225 07 00 00 00 00', whatsapp: '22507000000' },  // ← Remplacer
  orange: { phone: '+225 07 00 00 00 00', whatsapp: '22507000000' },  // ← Remplacer
  whatsapp: '22507000000'  // ← Numéro WhatsApp de Jizreel (sans +)
};

// ---- All painting images ----
const ALL_IMAGES = [
  "628375120_3306988932789078_4526678782831250961_n.jpg",
  "629504258_3306988796122425_299705714343054663_n.jpg",
  "629771549_3306988766122428_4584406141464819458_n.jpg",
  "629806980_3306989066122398_1611412790309748051_n.jpg",
  "631416187_3306988752789096_2612156850630083529_n.jpg",
  "631516435_3306989142789057_2680605026001827377_n.jpg",
  "632128058_3306989099455728_5244515180233007536_n.jpg",
  "632554554_3306988449455793_5836480398357894187_n.jpg",
  "632696973_3310263705794934_2787686598036332835_n.jpg",
  "632815977_3306988829455755_4897834808673674046_n.jpg",
  "632943091_3306989769455661_7728818891146812539_n.jpg",
  "632946001_3308671159287522_8580920135916736470_n.jpg",
  "633800666_3311901232297848_4913680815632571010_n.jpg",
  "634266605_3312606258894012_5000595943645912143_n.jpg",
  "636547802_3317741428380495_6876618603753698530_n.jpg",
  "637175827_3314345985386706_8611780672414893757_n.jpg",
  "637291450_3318013495019955_3319981768393814718_n.jpg",
  "638005876_3313275902160381_5517349894865540200_n.jpg",
  "640121121_3324185184402786_3642457301930939929_n.jpg",
  "643974998_3330748017079836_7100395968865871995_n.jpg",
  "644382880_3325144657640172_3953569327863481503_n.jpg",
  "645226179_3334285226726115_3183014614276923577_n.jpg",
  "645415129_3327975370690434_7089138641289133514_n.jpg",
  "646599510_3332422983579006_7406568290823990700_n.jpg",
  "646720465_3331046840383287_2517871543686977354_n.jpg",
  "647394510_3331046803716624_6570437257298194308_n.jpg",
  "648166553_3335998186554819_2739148432330951643_n.jpg",
  "648797088_3334669386687699_3255939220999393911_n.jpg",
  "650033617_3337359556418682_2542248172031033191_n.jpg",
  "650066593_3339360819551889_7571114352563713048_n.jpg",
  "651213503_3339388552882449_8679896077108304224_n.jpg",
  "651283826_3340920492729255_3168433292775145844_n.jpg",
  "651822757_3344062202415084_698624654949259160_n.jpg",
  "653706283_3347960708691900_7012913551639943438_n.jpg",
  "653797598_4498408683715915_3391784133050799966_n.jpg",
  "654423167_3348277568660214_7995359213904368696_n.jpg",
  "656312169_3347960775358560_2735242576335602894_n.jpg"
];

// ---- Dark Mode Toggle ----
const themeToggle = document.getElementById('themeToggle');
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
  if(themeToggle) themeToggle.textContent = '☀️';
}
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    if (document.body.classList.contains('dark')) {
      localStorage.setItem('theme', 'dark');
      themeToggle.textContent = '☀️';
    } else {
      localStorage.setItem('theme', 'light');
      themeToggle.textContent = '🌙';
    }
  });
}

// ---- Promo Banner dismiss ----
const promoBanner = document.getElementById('promoBanner');
const promoBannerClose = document.getElementById('promoBannerClose');
if (promoBannerClose) {
  promoBannerClose.addEventListener('click', () => {
    promoBanner.classList.add('hidden');
  });
}

// ---- Custom Cursor ----
const cursor = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursorTrail');
let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateCursorTrail() {
  trailX += (mouseX - trailX) * 0.12;
  trailY += (mouseY - trailY) * 0.12;
  cursorTrail.style.left = trailX + 'px';
  cursorTrail.style.top = trailY + 'px';
  requestAnimationFrame(animateCursorTrail);
}
animateCursorTrail();

// ---- Nav scroll behavior ----
const nav = document.getElementById('nav');
const progressBar = document.createElement('div');
progressBar.className = 'progress-bar';
document.body.prepend(progressBar);

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Nav sticky
  if (scrollY > 60) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');

  // Progress bar
  const docH = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = (scrollY / docH * 100) + '%';
});

// ---- Floating images setup ----
function setupFloatingImages() {
  const floats = document.querySelectorAll('.float-img');
  floats.forEach((el, i) => {
    const x = parseFloat(el.dataset.x);
    const y = parseFloat(el.dataset.y);
    const rot = parseFloat(el.dataset.rot);
    const radius = el.dataset.radius;

    el.style.left = x + '%';
    el.style.top = y + '%';
    el.style.borderRadius = radius;
    el.style.setProperty('--rot', rot + 'deg');
    el.style.animationDelay = (i * 0.12 + 0.4) + 's';

    // Gentle bob animation
    const duration = 3.5 + Math.random() * 2;
    const delay = Math.random() * 2;
    el.style.animation = `floatIn 0.9s ${(i * 0.12 + 0.4)}s cubic-bezier(0.22,1,0.36,1) forwards, bob ${duration}s ${delay}s ease-in-out infinite`;

    el.style.cursor = 'pointer';
    el.addEventListener('click', () => {
      const srcRaw = el.querySelector('img').getAttribute('src');
      let idx = ALL_IMAGES.findIndex(imgSrc => srcRaw.includes(imgSrc));
      if (idx !== -1) {
        currentIndex = idx;
        openLightbox(idx);
      } else {
        currentIndex = 0;
        ALL_IMAGES.unshift(srcRaw);
        openLightbox(0);
      }
    });
  });

  // Parallax for floating images on mouse move
  document.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;

    floats.forEach((el, i) => {
      const depth = 0.5 + (i % 3) * 0.3;
      const moveX = dx * 14 * depth;
      const moveY = dy * 10 * depth;
      const rot = parseFloat(el.dataset.rot);
      el.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${rot + dx * 1.5}deg)`;
    });
  });
}

setupFloatingImages();

// ---- Gallery Marquee ----
let currentIndex = 0;

function buildGalleryItem(src, index) {
  const item = document.createElement('div');
  item.className = 'gallery-item';
  item.dataset.index = index;

  const img = document.createElement('img');
  img.src = src;
  img.alt = 'Œuvre de Jizreel Diabaté';
  img.loading = 'lazy';

  const overlay = document.createElement('div');
  overlay.className = 'gallery-item-overlay';
  overlay.innerHTML = `
    <div>
      <span class="gallery-item-zoom">Agrandir</span><br>
      <button class="gallery-item-order" onclick="event.stopPropagation(); window.open('https://forms.gle/x4i6FCyw5F6kn81f6', '_blank')">🛒 Commander</button>
    </div>
  `;

  // Prevent order button from opening lightbox
  overlay.querySelector('.gallery-item-order').addEventListener('click', (e) => {
    e.stopPropagation();
  });

  item.appendChild(img);
  item.appendChild(overlay);

  // Open lightbox on click (img only)
  item.addEventListener('click', (e) => {
    if (e.target.closest('.gallery-item-order')) return;
    currentIndex = index;
    openLightbox(index);
  });

  return item;
}

function initGalleryMarquee() {
  const marquee = document.getElementById('galleryMarquee');
  if(!marquee) return;
  
  // We append all images twice to create the infinite scroll illusion seamlessly
  const renderTrack = () => {
    ALL_IMAGES.forEach((src, i) => {
      marquee.appendChild(buildGalleryItem(src, i));
    });
  };
  
  renderTrack();
  renderTrack();
}

initGalleryMarquee();

// ---- Lightbox ----
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCounter = document.getElementById('lightboxCounter');

const ARTWORK_TITLES = [
  "La Sainte Cène",
  "L'Esprit Saint et la Rédemption",
  "L'Ange dans les Flammes Divines",
  "Moïse dans le Buisson Ardent",
  "L'Aigle Prophétique",
  "Le Lion de Juda",
  "L'Alliance Sacrée",
  "L'Arbre de Vie",
  "La Résurrection Lumineuse",
  "L'Espoir sur les Eaux",
  "L'Annonciation Dorée"
];

function updateLightboxContent(index) {
  const tId = index % ARTWORK_TITLES.length;
  const title = ARTWORK_TITLES[tId];
  const story = `Cette œuvre, intitulée "${title}", est une véritable prophétie par l'image. Inspirée de puissantes visions bibliques, elle agit comme un vecteur de guérison spirituelle. À travers l'esthétique africaine contemporaine, chaque nuance de couleur révèle la beauté de la foi, apportant lumière et apaisement à l'âme du spectateur.`;
  
  const titleEl = document.querySelector('.lightbox-title');
  const storyEl = document.querySelector('.lightbox-story');
  if (titleEl) titleEl.textContent = title;
  if (storyEl) storyEl.textContent = story;
}

function openLightbox(index) {
  currentIndex = index;
  lightboxImg.style.opacity = '0';
  lightbox.classList.add('active');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  updateLightboxContent(index);

  lightboxImg.src = ALL_IMAGES[index];
  lightboxImg.onload = () => {
    lightboxImg.style.opacity = '1';
  };

  updateCounter();
}

function closeLightbox() {
  lightbox.classList.remove('active');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  setTimeout(() => {
    lightboxImg.src = '';
  }, 400);
}

function navigateLightbox(dir) {
  currentIndex = (currentIndex + dir + ALL_IMAGES.length) % ALL_IMAGES.length;
  lightboxImg.style.opacity = '0';
  setTimeout(() => {
    updateLightboxContent(currentIndex);
    lightboxImg.src = ALL_IMAGES[currentIndex];
    lightboxImg.onload = () => {
      lightboxImg.style.opacity = '1';
    };
    updateCounter();
  }, 200);
}

function updateCounter() {
  lightboxCounter.textContent = `${currentIndex + 1} / ${ALL_IMAGES.length}`;
}

document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
document.getElementById('lightboxPrev').addEventListener('click', () => navigateLightbox(-1));
document.getElementById('lightboxNext').addEventListener('click', () => navigateLightbox(1));

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') navigateLightbox(-1);
  if (e.key === 'ArrowRight') navigateLightbox(1);
});

// ---- Touch swipe for lightbox ----
let touchStartX = 0;
lightbox.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; });
lightbox.addEventListener('touchend', (e) => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 50) navigateLightbox(dx < 0 ? 1 : -1);
});

// ---- Smooth scroll for nav links ----
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ---- Reveal sections on scroll ----
const sectionEls = document.querySelectorAll('.about-section, .contact-section, .gallery-section');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      sectionObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

sectionEls.forEach(el => sectionObserver.observe(el));

// ---- Parallax on hero title text ----
window.addEventListener('scroll', () => {
  const heroCenter = document.querySelector('.hero-center');
  if (!heroCenter) return;
  const scrolled = window.scrollY;
  heroCenter.style.transform = `translateY(${scrolled * 0.25}px)`;
  heroCenter.style.opacity = Math.max(0, 1 - scrolled / 400);
});

// ============================================================
// PAYMENT MODAL — Tunnel Wave / Orange Money
// ============================================================

// State
let payState = {
  step: 1,
  format: null,
  price: 0,
  qty: 1,
  name: '',
  phone: '',
  city: '',
  method: null,
  ref: ''
};

function genRef() {
  return 'JD-' + Date.now().toString(36).toUpperCase().slice(-6);
}

function formatPrice(n) {
  return n.toLocaleString('fr-FR') + ' FCFA';
}

// ---- Open / Close modal ----
function openPayModal() {
  const modal = document.getElementById('payModal');
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  // Reset to step 1
  goToStep(1);
  resetState();
}

function closePayModal() {
  const modal = document.getElementById('payModal');
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function resetState() {
  payState = { step: 1, format: null, price: 0, qty: 1, name: '', phone: '', city: '', method: null, ref: genRef() };
  // Deselect format cards
  document.querySelectorAll('.pay-format-card').forEach(c => c.classList.remove('selected'));
  // Deselect methods
  document.querySelectorAll('.pay-method').forEach(m => m.classList.remove('selected-wave', 'selected-orange'));
  // Reset qty
  document.getElementById('qtyInput').value = 1;
  // Clear inputs
  ['customerName','customerPhone','deliveryCity'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  // Hidden summary
  const s = document.getElementById('step1Summary');
  if (s) s.classList.remove('show');
  // Disable next
  const n = document.getElementById('step1Next');
  if (n) n.disabled = true;
  const n3 = document.getElementById('step3Next');
  if (n3) n3.disabled = true;
}

// ---- Step navigation ----
function goToStep(n) {
  payState.step = n;
  // Show/hide panels
  [1,2,3,4].forEach(i => {
    const panel = document.getElementById('step' + i);
    if (panel) panel.hidden = (i !== n);
  });
  // Update step indicators
  document.querySelectorAll('.pay-step').forEach(el => {
    const s = parseInt(el.dataset.step);
    el.classList.remove('active', 'done');
    if (s === n) el.classList.add('active');
    else if (s < n) el.classList.add('done');
  });
}

// ---- Step 1 — Format selection ----
document.querySelectorAll('.pay-format-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.pay-format-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    payState.format = card.dataset.format;
    payState.price = parseInt(card.dataset.price);
    updateStep1Summary();
    document.getElementById('step1Next').disabled = false;
  });
});

document.getElementById('qtyMinus').addEventListener('click', () => {
  const input = document.getElementById('qtyInput');
  if (payState.qty > 1) {
    payState.qty--;
    input.value = payState.qty;
    updateStep1Summary();
  }
});

document.getElementById('qtyPlus').addEventListener('click', () => {
  const input = document.getElementById('qtyInput');
  if (payState.qty < 10) {
    payState.qty++;
    input.value = payState.qty;
    updateStep1Summary();
  }
});

function updateStep1Summary() {
  if (!payState.format) return;
  const total = payState.price * payState.qty;
  const s = document.getElementById('step1Summary');
  s.classList.add('show');
  s.innerHTML = `Format <strong>${payState.format}</strong> × ${payState.qty} = <strong>${formatPrice(total)}</strong>`;
}

document.getElementById('step1Next').addEventListener('click', () => goToStep(2));

// ---- Step 2 — Coordonnées ----
document.getElementById('step2Next').addEventListener('click', () => {
  const name = document.getElementById('customerName').value.trim();
  const phone = document.getElementById('customerPhone').value.trim();
  const city = document.getElementById('deliveryCity').value.trim();
  if (!name || !phone || !city) {
    // Shake empty fields
    [['customerName', name], ['customerPhone', phone], ['deliveryCity', city]].forEach(([id, val]) => {
      if (!val) {
        const el = document.getElementById(id);
        el.style.borderColor = '#e55';
        setTimeout(() => el.style.borderColor = '', 2000);
      }
    });
    return;
  }
  payState.name = name;
  payState.phone = document.getElementById('countryCode').value + ' ' + phone;
  payState.city = city;
  updateRecap();
  goToStep(3);
});

document.getElementById('step2Back').addEventListener('click', () => goToStep(1));

function updateRecap() {
  const total = payState.price * payState.qty;
  document.getElementById('orderRecap').innerHTML =
    `📦 Format <strong>${payState.format}</strong> × ${payState.qty} — <strong>${formatPrice(total)}</strong><br>
     👤 ${payState.name} · ${payState.phone}<br>
     📍 ${payState.city}`;
}

// ---- Step 3 — Payment method ----
document.getElementById('payWave').addEventListener('click', () => {
  document.querySelectorAll('.pay-method').forEach(m => m.classList.remove('selected-wave', 'selected-orange'));
  document.getElementById('payWave').classList.add('selected-wave');
  payState.method = 'wave';
  document.getElementById('step3Next').disabled = false;
});

document.getElementById('payOrange').addEventListener('click', () => {
  document.querySelectorAll('.pay-method').forEach(m => m.classList.remove('selected-wave', 'selected-orange'));
  document.getElementById('payOrange').classList.add('selected-orange');
  payState.method = 'orange';
  document.getElementById('step3Next').disabled = false;
});

document.getElementById('step3Back').addEventListener('click', () => goToStep(2));

document.getElementById('step3Next').addEventListener('click', () => {
  buildStep4();
  goToStep(4);
});

// ---- Step 4 — Instructions ----
function buildStep4() {
  const total = payState.price * payState.qty;
  const isWave = payState.method === 'wave';
  const config = isWave ? PAY_CONFIG.wave : PAY_CONFIG.orange;

  // Show correct instructions block
  document.getElementById('waveInstructions').hidden = !isWave;
  document.getElementById('orangeInstructions').hidden = isWave;

  // Fill amounts & reference
  const amountStr = formatPrice(total);
  if (isWave) {
    document.getElementById('wavePhoneDisplay').textContent = config.phone;
    document.getElementById('waveAmountDisplay').textContent = amountStr;
    document.getElementById('waveRefDisplay').textContent = payState.ref;
  } else {
    document.getElementById('orangePhoneDisplay').textContent = config.phone;
    document.getElementById('orangeAmountDisplay').textContent = amountStr;
    document.getElementById('orangeRefDisplay').textContent = payState.ref;
  }

  // Update step 4 icon & title
  const icon = isWave ? '🌊' : '🟠';
  document.getElementById('paySuccessIcon').textContent = icon;
  document.getElementById('step4Title').textContent = isWave ? 'Payer par Wave' : 'Payer par Orange Money';
  document.getElementById('step4Sub').textContent = `Référence commande : ${payState.ref}`;

  // Build WhatsApp message
  const msg = encodeURIComponent(
    `Bonjour Jizreel ! 🎨\n\nJe viens d'effectuer mon paiement pour la commande suivante :\n\n` +
    `• Format : ${payState.format}\n` +
    `• Quantité : ${payState.qty}\n` +
    `• Montant : ${amountStr}\n` +
    `• Méthode : ${isWave ? 'Wave' : 'Orange Money'}\n` +
    `• Référence : ${payState.ref}\n` +
    `• Livraison : ${payState.city}\n\n` +
    `Ci-joint mon reçu de paiement. Merci ! 🙏`
  );
  document.getElementById('whatsappBtn').href = `https://wa.me/${PAY_CONFIG.whatsapp}?text=${msg}`;
}

// ---- Copy buttons ----
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.pay-copy-btn');
  if (!btn) return;
  const targetId = btn.dataset.copy;
  const el = document.getElementById(targetId);
  if (!el) return;
  navigator.clipboard.writeText(el.textContent.trim()).then(() => {
    const orig = btn.textContent;
    btn.textContent = '✅';
    btn.classList.add('copied');
    setTimeout(() => { btn.textContent = orig; btn.classList.remove('copied'); }, 1800);
  }).catch(() => {
    // fallback
    const range = document.createRange();
    range.selectNode(el);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
  });
});

// ---- Boutique card buttons → modal ----
document.querySelectorAll('.format-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    openPayModal();
  });
});

// ---- Close modal ----
document.getElementById('payModalClose').addEventListener('click', closePayModal);
document.getElementById('payModalBackdrop').addEventListener('click', closePayModal);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && document.getElementById('payModal').classList.contains('active')) {
    closePayModal();
  }
});
