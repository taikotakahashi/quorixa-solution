document.addEventListener('DOMContentLoaded', () => {
  if (typeof I18N !== 'undefined') I18N.init();
  initHeader();
  initMobileNav();
  initFaq();
  initScrollAnimations();
  initCookieBar();
});

function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  const photoHero = document.querySelector('.hero-photo');
  const hero = document.querySelector('.hero-photo, .page-hero');

  const updateHeader = () => {
    if (!hero) {
      header.classList.add('scrolled');
      header.classList.remove('over-hero', 'over-photo-hero');
      return;
    }

    const pastHero = hero.getBoundingClientRect().bottom <= header.offsetHeight;

    header.classList.toggle('scrolled', pastHero);
    header.classList.toggle('over-hero', !pastHero);
    header.classList.toggle('over-photo-hero', !pastHero && !!photoHero);
  };

  window.addEventListener('scroll', updateHeader, { passive: true });
  window.addEventListener('resize', updateHeader);
  updateHeader();
}

function initMobileNav() {
  const toggle = document.querySelector('.nav__toggle');
  const nav = document.querySelector('.nav');
  if (!toggle || !nav) return;

  const setMenuOpen = (open) => {
    toggle.classList.toggle('active', open);
    nav.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) nav.scrollTop = 0;
  };

  toggle.addEventListener('click', () => {
    setMenuOpen(!nav.classList.contains('open'));
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) setMenuOpen(false);
    });
  });

  window.addEventListener('scroll', () => {
    if (nav.classList.contains('open')) setMenuOpen(false);
  }, { passive: true });
}

function initFaq() {
  document.querySelectorAll('.faq-item__question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const wasActive = item.classList.contains('active');

      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
      if (!wasActive) item.classList.add('active');
    });
  });
}

function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  elements.forEach(el => observer.observe(el));
}

function initCookieBar() {
  const bar = document.querySelector('.cookie-bar');
  const acceptBtn = document.querySelector('.cookie-bar__accept');
  if (!bar) return;

  if (!localStorage.getItem('cookiesAccepted')) {
    setTimeout(() => bar.classList.add('show'), 1500);
  }

  acceptBtn?.addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'true');
    bar.classList.remove('show');
  });
}
