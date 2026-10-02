// Aurora native interactions — replaces jQuery/Bootstrap/Owl/Isotope/WOW (~3KB vs ~290KB)
(function () {
  // sticky nav
  var nav = document.querySelector('.nav-area');
  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 200) nav.classList.add('sticky_navigation');
    else nav.classList.remove('sticky_navigation');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // mobile toggle
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) toggle.addEventListener('click', () => links.classList.toggle('open'));
  if (links) links.addEventListener('click', (e) => { if (e.target.tagName === 'A') links.classList.remove('open'); });

  // hero fade rotator (3 slides, 3s)
  var slides = Array.from(document.querySelectorAll('.hero-slide'));
  if (slides.length > 1) {
    let i = 0;
    setInterval(() => {
      slides[i].classList.remove('active');
      i = (i + 1) % slides.length;
      slides[i].classList.add('active');
    }, 3000);
  }

  // accordion (Why Choose Us)
  document.querySelectorAll('.acc > button').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const group = item.parentElement;
      group.querySelectorAll('.acc.open').forEach((o) => { if (o !== item) o.classList.remove('open'); });
      item.classList.toggle('open');
    });
  });

  // portfolio filter (replaces Isotope)
  var filters = document.querySelectorAll('.img-filter');
  var items = document.querySelectorAll('.single-port');
  filters.forEach((f) => {
    f.addEventListener('click', () => {
      filters.forEach((x) => x.classList.remove('active'));
      f.classList.add('active');
      const sel = f.getAttribute('data-filter');
      items.forEach((it) => {
        if (sel === '*' || it.classList.contains(sel.replace('.', ''))) it.style.display = '';
        else it.style.display = 'none';
      });
    });
  });

  // testimonial slider (replaces Owl, 1 item, autoplay 8.5s)
  var track = document.querySelector('.testi-track');
  var dotsBox = document.querySelector('.testi-dots');
  if (track) {
    const n = track.children.length;
    let idx = 0;
    if (dotsBox) {
      for (let k = 0; k < n; k++) {
        const d = document.createElement('button');
        d.setAttribute('aria-label', 'slide ' + (k + 1));
        if (k === 0) d.classList.add('active');
        d.addEventListener('click', () => go(k));
        dotsBox.appendChild(d);
      }
    }
    function go(k) {
      idx = (k + n) % n;
      track.style.transform = 'translateX(-' + idx * 100 + '%)';
      if (dotsBox) dotsBox.querySelectorAll('button').forEach((b, bi) => b.classList.toggle('active', bi === idx));
    }
    setInterval(() => go(idx + 1), 8500);
  }

  // counters (replaces counterUp)
  var counters = document.querySelectorAll('.count');
  var io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const el = en.target;
      io.unobserve(el);
      const target = parseInt(el.textContent.replace(/\D/g, ''), 10) || 0;
      const t0 = performance.now();
      const dur = 1500;
      (function tick(t) {
        const p = Math.min(1, (t - t0) / dur);
        el.textContent = Math.round(target * p);
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
    });
  });
  counters.forEach((c) => io.observe(c));

  // reveal on scroll (replaces WOW)
  var rev = document.querySelectorAll('.reveal');
  var io2 = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('visible'); io2.unobserve(en.target); } });
  });
  rev.forEach((r) => io2.observe(r));

  // lightbox (replaces Magnific)
  var dlg = document.getElementById('lightbox');
  var dlgImg = dlg ? dlg.querySelector('img') : null;
  document.querySelectorAll('.zoom1').forEach((a) => {
    a.addEventListener('click', (e) => {
      if (!dlg || !dlgImg) return;
      e.preventDefault();
      dlgImg.src = a.getAttribute('href');
      dlg.showModal();
    });
  });
  if (dlg) dlg.addEventListener('click', () => dlg.close());
})();
