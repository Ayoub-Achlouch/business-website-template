/* ============================================================
   APEXPRO — script.js
   Features:
   - Sticky navbar
   - Mobile menu
   - Scroll animations (IntersectionObserver)
   - Animated counters
   - Testimonial slider (auto + manual + dots)
   - Gallery filter
   - Contact form handler
   - Delay-staggered reveals
   ============================================================ */

(function () {
  'use strict';

  /* ──────────────────────────────────────────────
     NAVBAR: sticky + scroll behavior
  ────────────────────────────────────────────── */
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ──────────────────────────────────────────────
     MOBILE MENU
  ────────────────────────────────────────────── */
  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('active');
    navLinks.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  // Close on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (navLinks.classList.contains('open') &&
        !navLinks.contains(e.target) &&
        !hamburger.contains(e.target)) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  /* ──────────────────────────────────────────────
     SCROLL REVEAL (IntersectionObserver)
  ────────────────────────────────────────────── */
  const revealEls = document.querySelectorAll(
    '.reveal-up, .reveal-left, .reveal-right'
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = el.dataset.delay ? parseInt(el.dataset.delay) : 0;
          setTimeout(() => el.classList.add('visible'), delay);
          revealObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );

  revealEls.forEach(el => revealObserver.observe(el));

  /* ──────────────────────────────────────────────
     ANIMATED COUNTERS
  ────────────────────────────────────────────── */
  const counters = document.querySelectorAll('.stat-number[data-target]');
  let countersStarted = false;

  function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const duration = 2000;
    const start = performance.now();

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(ease * target).toLocaleString();
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString();
    }
    requestAnimationFrame(step);
  }

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    const statsObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !countersStarted) {
          countersStarted = true;
          counters.forEach(c => animateCounter(c));
          statsObserver.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    statsObserver.observe(statsSection);
  }

  /* ──────────────────────────────────────────────
     TESTIMONIAL SLIDER
  ────────────────────────────────────────────── */
  const track     = document.getElementById('testiTrack');
  const prevBtn   = document.getElementById('testiPrev');
  const nextBtn   = document.getElementById('testiNext');
  const dotsWrap  = document.getElementById('testiDots');

  if (track) {
    const slides = track.querySelectorAll('.testi-slide');
    let current  = 0;
    let autoPlay;

    // Build dots
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'testi-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });

    function goTo(index) {
      slides[current].classList.remove('active');
      dotsWrap.children[current].classList.remove('active');
      current = (index + slides.length) % slides.length;
      track.style.transform = `translateX(-${current * 100}%)`;
      dotsWrap.children[current].classList.add('active');
    }

    prevBtn.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
    nextBtn.addEventListener('click', () => { goTo(current + 1); resetAuto(); });

    function startAuto() {
      autoPlay = setInterval(() => goTo(current + 1), 5000);
    }
    function resetAuto() {
      clearInterval(autoPlay);
      startAuto();
    }

    // Swipe/touch support
    let touchStartX = 0;
    track.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) { diff > 0 ? goTo(current + 1) : goTo(current - 1); resetAuto(); }
    }, { passive: true });

    startAuto();
  }

  /* ──────────────────────────────────────────────
     GALLERY FILTER
  ────────────────────────────────────────────── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      galleryItems.forEach(item => {
        const show = filter === 'all' || item.dataset.cat === filter;
        item.style.display = show ? '' : 'none';
        if (show) {
          item.style.animation = 'fadeIn 0.4s ease forwards';
        }
      });
    });
  });

  // Inject fadeIn keyframe
  const style = document.createElement('style');
  style.textContent = `@keyframes fadeIn { from { opacity:0; transform:scale(0.96); } to { opacity:1; transform:scale(1); } }`;
  document.head.appendChild(style);

  /* ──────────────────────────────────────────────
     CONTACT FORM
  ────────────────────────────────────────────── */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  const formBtnText = document.getElementById('formBtnText');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Simple validation
      const required = contactForm.querySelectorAll('[required]');
      let valid = true;
      required.forEach(field => {
        if (!field.value.trim()) {
          valid = false;
          field.style.borderColor = 'rgba(255,80,80,0.6)';
          field.addEventListener('input', () => { field.style.borderColor = ''; }, { once: true });
        }
      });
      if (!valid) return;

      // Simulate submission
      formBtnText.textContent = 'Sending…';
      const submitBtn = contactForm.querySelector('[type="submit"]');
      submitBtn.disabled = true;

      await new Promise(r => setTimeout(r, 1400));

      contactForm.style.display = 'none';
      formSuccess.classList.add('visible');

      /* ── TO ACTUALLY SUBMIT: Replace the setTimeout above with:
         const data = new FormData(contactForm);
         await fetch('YOUR_ENDPOINT', { method: 'POST', body: data });
      ── */
    });
  }

  /* ──────────────────────────────────────────────
     HERO PARALLAX (subtle)
  ────────────────────────────────────────────── */
  const heroShapes = document.querySelectorAll('.hero-shape');
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    heroShapes.forEach((shape, i) => {
      const speed = 0.04 + i * 0.02;
      shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
  }, { passive: true });

  /* ──────────────────────────────────────────────
     SMOOTH ANCHOR SCROLL (polyfill for older browsers)
  ────────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = navbar.offsetHeight + 16;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ──────────────────────────────────────────────
     BUSINESS HOURS: Auto show/hide "Open Now"
  ────────────────────────────────────────────── */
  const hoursBadge = document.querySelector('.hours-badge');
  if (hoursBadge) {
    const now  = new Date();
    const day  = now.getDay(); // 0=Sun, 6=Sat
    const hour = now.getHours();

    // CHANGE: Update these to match your actual business hours
    let isOpen = false;
    if (day >= 1 && day <= 5 && hour >= 7 && hour < 18) isOpen = true; // Mon-Fri 7-6
    if (day === 6 && hour >= 8 && hour < 16) isOpen = true;             // Sat 8-4

    if (!isOpen) {
      hoursBadge.querySelector('.open-dot').style.background = '#e05c5c';
      hoursBadge.querySelector('.open-dot').style.boxShadow = '0 0 8px rgba(224,92,92,0.6)';
      hoursBadge.lastChild.textContent = ' Currently closed — leave a message!';
    }
  }

  console.log(
    '%cApexPro Template Ready ✓',
    'color:#c9a84c; font-size:14px; font-weight:bold; padding:4px 0;'
  );

})();
