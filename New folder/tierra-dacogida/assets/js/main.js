document.addEventListener('DOMContentLoaded', () => {
  if (typeof I18N !== 'undefined') I18N.init();
  initHeader();
  initMobileNav();
  initFaq();
  initScrollAnimations();
  initCookieBar();
  initSliders();
  initGalleries();
});

function initSliders() {
  document.querySelectorAll('[data-tda-slider]').forEach((root) => {
    const slides = Array.from(root.querySelectorAll('.tda-slider__slide, .hero-photo__slide'));
    if (slides.length < 2) {
      return;
    }

    let index = Math.max(0, slides.findIndex((s) => s.classList.contains('is-active')));
    const dots = Array.from(root.querySelectorAll('[data-tda-slide]'));
    let timer = null;

    const show = (next) => {
      index = (next + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        slide.classList.toggle('is-active', i === index);
      });
      dots.forEach((dot, i) => {
        dot.classList.toggle('is-active', i === index);
      });
    };

    const start = () => {
      stop();
      timer = window.setInterval(() => show(index + 1), 5500);
    };

    const stop = () => {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    };

    root.querySelectorAll('[data-tda-slider-prev]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        show(index - 1);
        start();
      });
    });

    root.querySelectorAll('[data-tda-slider-next]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        show(index + 1);
        start();
      });
    });

    dots.forEach((dot) => {
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        const i = parseInt(dot.getAttribute('data-tda-slide') || '0', 10);
        show(i);
        start();
      });
    });

    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', start);
    show(index);
    start();
  });
}

function t(key, fallback) {
  if (typeof I18N !== 'undefined' && typeof I18N.t === 'function') {
    const val = I18N.t(key);
    if (val) {
      return val;
    }
  }
  return fallback;
}

function ensureGalleryLightbox() {
  let root = document.getElementById('tda-gallery-lightbox');
  if (root) {
    return root;
  }

  root = document.createElement('div');
  root.id = 'tda-gallery-lightbox';
  root.className = 'tda-lightbox';
  root.hidden = true;
  root.setAttribute('role', 'dialog');
  root.setAttribute('aria-modal', 'true');
  root.setAttribute('aria-label', t('gallery.lightboxLabel', 'Galería'));
  root.innerHTML = [
    '<div class="tda-lightbox__backdrop" data-tda-lightbox-close tabindex="-1"></div>',
    '<div class="tda-lightbox__panel">',
    '  <button type="button" class="tda-lightbox__close" data-tda-lightbox-close aria-label="' + t('gallery.close', 'Cerrar') + '">×</button>',
    '  <button type="button" class="tda-lightbox__nav tda-lightbox__nav--prev" data-tda-lightbox-prev aria-label="' + t('ui.prev', 'Anterior') + '">‹</button>',
    '  <button type="button" class="tda-lightbox__nav tda-lightbox__nav--next" data-tda-lightbox-next aria-label="' + t('ui.next', 'Siguiente') + '">›</button>',
    '  <div class="tda-lightbox__stage">',
    '    <img class="tda-lightbox__img" alt="" decoding="async">',
    '  </div>',
    '  <p class="tda-lightbox__counter" data-tda-lightbox-counter></p>',
    '</div>',
  ].join('');
  document.body.appendChild(root);
  return root;
}

function isGalleryItemVisible(item) {
  if (!item) {
    return false;
  }
  if (item.classList.contains('is-deferred') || item.hasAttribute('hidden')) {
    return false;
  }
  // Inline style wins when present.
  if (item.style.display === 'none') {
    return false;
  }
  return true;
}

function revealGalleryItem(item) {
  if (!item) {
    return;
  }
  const src = item.getAttribute('data-src') || '';
  if (!src) {
    return;
  }
  if (!item.querySelector('img')) {
    const img = document.createElement('img');
    img.src = src;
    img.alt = item.getAttribute('data-alt') || '';
    img.loading = 'lazy';
    img.decoding = 'async';
    item.appendChild(img);
  }
  item.classList.remove('is-deferred');
  item.removeAttribute('hidden');
  item.style.removeProperty('display');
  item.setAttribute('aria-hidden', 'false');
}

function collapseGalleryItem(item) {
  if (!item) {
    return;
  }
  item.classList.add('is-deferred');
  item.setAttribute('hidden', '');
  item.style.display = 'none';
  item.setAttribute('aria-hidden', 'true');
}

function getGalleryItems(grid) {
  return Array.from(grid.querySelectorAll('[data-tda-gallery-item]')).sort((a, b) => {
    const ia = parseInt(a.getAttribute('data-index') || '0', 10);
    const ib = parseInt(b.getAttribute('data-index') || '0', 10);
    return ia - ib;
  });
}

function getGalleryVisibleCount(grid) {
  // Always trust what's actually on screen.
  return getGalleryItems(grid).filter(isGalleryItemVisible).length;
}

function applyGalleryVisibleCount(grid, visibleCount) {
  const items = getGalleryItems(grid);
  const initial = Math.max(1, parseInt(grid.getAttribute('data-initial') || '8', 10));
  const next = Math.max(initial, Math.min(items.length, visibleCount));

  items.forEach((item, index) => {
    if (index < next) {
      revealGalleryItem(item);
    } else {
      collapseGalleryItem(item);
    }
  });

  grid.setAttribute('data-visible', String(next));
  syncGalleryControls(grid);

  // Keep the expanded/collapsed region in view.
  try {
    grid.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  } catch (err) { /* ignore */ }

  return next;
}

function syncGalleryControls(grid) {
  if (!grid) {
    return;
  }
  const wrap = grid.closest('section') || grid.closest('.container') || grid.parentElement;
  if (!wrap) {
    return;
  }
  const controls = wrap.querySelector('[data-tda-gallery-controls]') || wrap.querySelector('.gallery-load-more');
  const moreBtn = wrap.querySelector('[data-tda-gallery-more]');
  const lessBtn = wrap.querySelector('[data-tda-gallery-less]');
  if (!moreBtn && !lessBtn) {
    return;
  }

  const initial = Math.max(1, parseInt(grid.getAttribute('data-initial') || '8', 10));
  const items = getGalleryItems(grid);
  const visibleCount = getGalleryVisibleCount(grid);
  const deferredCount = Math.max(0, items.length - visibleCount);

  if (moreBtn) {
    const showMore = deferredCount > 0;
    moreBtn.hidden = !showMore;
    moreBtn.style.display = showMore ? '' : 'none';
    moreBtn.setAttribute('aria-hidden', showMore ? 'false' : 'true');
  }
  if (lessBtn) {
    const showLess = visibleCount > initial;
    lessBtn.hidden = !showLess;
    lessBtn.style.display = showLess ? '' : 'none';
    lessBtn.setAttribute('aria-hidden', showLess ? 'false' : 'true');
  }
  if (controls) {
    const anyVisible = (moreBtn && !moreBtn.hidden) || (lessBtn && !lessBtn.hidden);
    controls.hidden = !anyVisible;
    controls.style.display = anyVisible ? '' : 'none';
  }
}

function handleGalleryControlClick(control) {
  if (!control) {
    return;
  }
  const isLess = control.hasAttribute('data-tda-gallery-less');
  const isMore = control.hasAttribute('data-tda-gallery-more');
  if (!isLess && !isMore) {
    return;
  }

  const wrap = control.closest('section') || control.closest('.container') || control.parentElement;
  const grid = wrap ? wrap.querySelector('[data-tda-gallery]') : null;
  if (!grid) {
    return;
  }

  const step = Math.max(1, parseInt(grid.getAttribute('data-step') || '8', 10));
  const initial = Math.max(1, parseInt(grid.getAttribute('data-initial') || '8', 10));
  const current = getGalleryVisibleCount(grid);

  if (isMore) {
    applyGalleryVisibleCount(grid, current + step);
  } else {
    // Hide exactly the last batch that VIEW MORE revealed.
    applyGalleryVisibleCount(grid, Math.max(initial, current - step));
  }
}

function initGalleries() {
  const lightbox = ensureGalleryLightbox();
  const imgEl = lightbox.querySelector('.tda-lightbox__img');
  const counterEl = lightbox.querySelector('[data-tda-lightbox-counter]');
  const stage = lightbox.querySelector('.tda-lightbox__stage');
  let activeItems = [];
  let activeIndex = 0;
  let lastFocus = null;
  let animating = false;

  const updateCounter = () => {
    if (!counterEl) {
      return;
    }
    counterEl.textContent = activeItems.length
      ? (activeIndex + 1) + ' / ' + activeItems.length
      : '';
  };

  const showLightboxImage = (index, direction) => {
    if (!activeItems.length || !imgEl) {
      return;
    }
    activeIndex = (index + activeItems.length) % activeItems.length;
    const item = activeItems[activeIndex];
    const src = item.getAttribute('data-src') || '';
    const alt = item.getAttribute('data-alt') || '';
    if (!src) {
      return;
    }

    const apply = () => {
      imgEl.src = src;
      imgEl.alt = alt;
      updateCounter();
      if (direction && stage) {
        stage.classList.remove('is-slide-from-left', 'is-slide-from-right');
        void stage.offsetWidth;
        stage.classList.add(direction === 'next' ? 'is-slide-from-right' : 'is-slide-from-left');
      }
    };

    if (src !== imgEl.getAttribute('src')) {
      const pre = new Image();
      pre.src = src;
      if (pre.decode) {
        pre.decode().then(apply).catch(apply);
      } else {
        apply();
      }
    } else {
      apply();
    }
  };

  const closeLightbox = () => {
    lightbox.hidden = true;
    lightbox.classList.remove('is-open');
    document.body.classList.remove('tda-lightbox-open');
    if (lastFocus && typeof lastFocus.focus === 'function') {
      lastFocus.focus();
    }
    lastFocus = null;
    activeItems = [];
  };

  const openLightbox = (items, index, trigger) => {
    activeItems = items.filter((el) => el.getAttribute('data-src'));
    if (!activeItems.length) {
      return;
    }
    lastFocus = trigger || document.activeElement;
    activeIndex = Math.max(0, Math.min(index, activeItems.length - 1));
    lightbox.hidden = false;
    lightbox.classList.add('is-open');
    document.body.classList.add('tda-lightbox-open');
    showLightboxImage(activeIndex, null);
    const closeBtn = lightbox.querySelector('.tda-lightbox__close');
    if (closeBtn) {
      closeBtn.focus();
    }
  };

  const stepLightbox = (delta) => {
    if (animating || !activeItems.length) {
      return;
    }
    animating = true;
    showLightboxImage(activeIndex + delta, delta > 0 ? 'next' : 'prev');
    window.setTimeout(() => {
      animating = false;
    }, 280);
  };

  if (!lightbox.dataset.tdaBound) {
    lightbox.dataset.tdaBound = '1';
    lightbox.querySelectorAll('[data-tda-lightbox-close]').forEach((el) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        closeLightbox();
      });
    });
    lightbox.querySelector('[data-tda-lightbox-prev]')?.addEventListener('click', (e) => {
      e.preventDefault();
      stepLightbox(-1);
    });
    lightbox.querySelector('[data-tda-lightbox-next]')?.addEventListener('click', (e) => {
      e.preventDefault();
      stepLightbox(1);
    });
    document.addEventListener('keydown', (e) => {
      if (lightbox.hidden) {
        return;
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        stepLightbox(-1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        stepLightbox(1);
      }
    });
  }

  // Direct button bindings (more reliable than delegation alone).
  document.querySelectorAll('[data-tda-gallery-more], [data-tda-gallery-less]').forEach((btn) => {
    if (btn.dataset.tdaBound === '1') {
      return;
    }
    btn.dataset.tdaBound = '1';
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      handleGalleryControlClick(btn);
    });
  });

  if (document.documentElement.dataset.tdaGalleryClick !== '4') {
    document.documentElement.dataset.tdaGalleryClick = '4';
    document.addEventListener('click', (e) => {
      // Prefer LESS over MORE if both somehow match.
      const lessBtn = e.target.closest('[data-tda-gallery-less]');
      if (lessBtn) {
        if (lessBtn.dataset.tdaBound === '1') {
          return;
        }
        e.preventDefault();
        e.stopPropagation();
        handleGalleryControlClick(lessBtn);
        return;
      }

      const moreBtn = e.target.closest('[data-tda-gallery-more]');
      if (moreBtn) {
        if (moreBtn.dataset.tdaBound === '1') {
          return;
        }
        e.preventDefault();
        e.stopPropagation();
        handleGalleryControlClick(moreBtn);
        return;
      }

      const item = e.target.closest('[data-tda-gallery-item]');
      if (!item || !isGalleryItemVisible(item)) {
        return;
      }
      const root = item.closest('[data-tda-gallery], [data-tda-gallery-slider]');
      if (!root) {
        return;
      }
      e.preventDefault();
      // Lightbox only includes images currently shown on screen (e.g. 8, not all 32).
      const items = Array.from(root.querySelectorAll('[data-tda-gallery-item][data-src]'))
        .filter(isGalleryItemVisible);
      const index = items.indexOf(item);
      openLightbox(items, index < 0 ? 0 : index, item);
    });
  }

  document.querySelectorAll('[data-tda-gallery]').forEach((grid) => {
    const initial = Math.max(1, parseInt(grid.getAttribute('data-initial') || '8', 10));
    // Normalize DOM to the declared visible count on load.
    applyGalleryVisibleCount(grid, initial);
  });
}

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

  // Soft enhancement only — CSS no longer hides unseen elements.
  document.documentElement.classList.add('tda-animations');
  elements.forEach((el) => el.classList.add('visible'));
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
