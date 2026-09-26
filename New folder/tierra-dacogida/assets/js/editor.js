/**
 * Block editor — match front-end preview and keep all content visible.
 */
(function () {
  var initialized = false;
  var refreshTimer = null;
  var iframeObserver = null;

  var editorFixCss = [
    '.fade-in,.fade-in.visible{opacity:1!important;transform:none!important;visibility:visible!important}',
    'html,body,.editor-styles-wrapper{color-scheme:dark}',
  ].join('');

  function getEditorIframe() {
    return document.querySelector('iframe[name="editor-canvas"]');
  }

  function getEditorDoc() {
    var iframe = getEditorIframe();
    if (!iframe) {
      return document;
    }

    try {
      return iframe.contentDocument || document;
    } catch (error) {
      return document;
    }
  }

  function getEditorRoot(doc) {
    if (!doc) {
      return null;
    }

    return doc.documentElement || doc.body || null;
  }

  function injectEditorFixes(doc) {
    doc = doc || getEditorDoc();
    if (!doc || !doc.head || doc.getElementById('tda-editor-fixes')) {
      return;
    }

    var style = doc.createElement('style');
    style.id = 'tda-editor-fixes';
    style.textContent = editorFixCss;
    doc.head.appendChild(style);
  }

  function applyEditorTheme(doc) {
    doc = doc || getEditorDoc();
    var root = getEditorRoot(doc);
    if (!root || typeof root.setAttribute !== 'function') {
      return;
    }

    root.setAttribute('data-theme', 'dark');

    var wrapper = doc.querySelector('.editor-styles-wrapper');
    if (wrapper && typeof wrapper.setAttribute === 'function') {
      wrapper.setAttribute('data-theme', 'dark');
    }
  }

  function revealEditorContent(doc) {
    doc = doc || getEditorDoc();
    if (!doc || typeof doc.querySelectorAll !== 'function') {
      return;
    }

    doc.querySelectorAll('.fade-in').forEach(function (el) {
      el.classList.add('visible');
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.style.visibility = 'visible';
    });
  }

  function syncEditorChrome(doc) {
    doc = doc || getEditorDoc();
    var hasHero = !!(doc && (
      doc.querySelector('.page-hero') ||
      doc.querySelector('.hero-photo')
    ));

    document.body.classList.toggle('tda-editor-hide-title', hasHero);

    var titleWrap = document.querySelector('.edit-post-visual-editor__post-title-wrapper');
    if (titleWrap) {
      titleWrap.style.display = hasHero ? 'none' : '';
    }
  }

  function watchIframeContent(doc) {
    if (!doc || !doc.body || typeof MutationObserver === 'undefined') {
      return;
    }

    if (iframeObserver) {
      iframeObserver.disconnect();
    }

    iframeObserver = new MutationObserver(scheduleRefresh);
    iframeObserver.observe(doc.body, {
      childList: true,
      subtree: true,
    });
  }

  function refreshEditorPreview() {
    var doc = getEditorDoc();
    if (!doc) {
      return;
    }

    injectEditorFixes(doc);
    applyEditorTheme(doc);
    revealEditorContent(doc);
    syncEditorChrome(doc);
    watchIframeContent(doc);
  }

  function scheduleRefresh() {
    if (refreshTimer) {
      window.clearTimeout(refreshTimer);
    }

    refreshTimer = window.setTimeout(refreshEditorPreview, 80);
  }

  function initEditorPreview() {
    if (initialized) {
      scheduleRefresh();
      return;
    }

    initialized = true;
    refreshEditorPreview();

    var iframe = getEditorIframe();
    if (iframe) {
      iframe.addEventListener('load', scheduleRefresh);
    }

    if (typeof MutationObserver !== 'undefined') {
      var observer = new MutationObserver(scheduleRefresh);
      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }

    if (window.wp && window.wp.data && typeof window.wp.data.subscribe === 'function') {
      window.wp.data.subscribe(scheduleRefresh);
    }
  }

  if (window.wp && window.wp.domReady) {
    window.wp.domReady(initEditorPreview);
  } else {
    document.addEventListener('DOMContentLoaded', initEditorPreview);
  }
})();
